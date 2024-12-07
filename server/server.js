require("dotenv").config();
const express = require("express");
const session = require("express-session"); // express-session 추가
const app = express();
const authRoutes = require("./routes/authRoutes");
const path = require("path");

const sequelize = require("./config/db");
const PORT = process.env.PORT || 8000;

// 세션 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET, // 세션 암호화 키
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 10 * 60 * 1000, // 세션만료 10분
    }, // 개발 중에는 false로 설정 (HTTPS에서만 true)
  })
);

// EJS 템플릿 엔진 설정
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/static", express.static(__dirname + "static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// 정적 파일 제공
app.use("/static", express.static(path.join(__dirname, "static")));

// 미들웨어 설정
app.use(express.json());

// 라우터 연결
app.use("/", authRoutes);

app.get("*", (req, res) => {
  res.render("404");
});

// DB 연결 후 서버 시작
sequelize
  .authenticate()
  .then(() => {
    console.log("DB 연결 성공");
    // DB 모델과 동기화
    return sequelize.sync({ force: false }); // 테이블 자동 생성, force: false는 기존 테이블을 유지하면서 동기화
  })
  .then(() => {
    // 서버 실행
    app.listen(PORT, () => {
      console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
    });
  })
  .catch((err) => {
    console.error("DB 연결 실패:", err);
  });
