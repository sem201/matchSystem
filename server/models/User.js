import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// User 모델 정의
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // 기본 키 설정
    autoIncrement: true, // 자동 증가 설정
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  passwordCheck: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  discordUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, // createdAt, updatedAt 자동 생성
});

export default User;
