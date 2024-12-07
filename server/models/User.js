const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// User 모델 정의
const User = sequelize.define('User', {
  kakaoId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, // createdAt, updatedAt 자동 생성
});

module.exports = User;
