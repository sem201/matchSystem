import { ReactNode } from "react";

// 컴포넌트 하위에 새로운 컴포넌트 작성시 타입으로 사용
export interface Props {
  children?: ReactNode;
}

// user 정보 저장
export interface User {
  line?: string;
  id: string; // 유저 고유 식별자
  nickname: string; // 유저 닉네임
  winRate: number; // 승률
  tier: string; //티어
}
