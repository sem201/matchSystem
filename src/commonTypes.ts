import { ReactNode } from "react";

// 컴포넌트 하위에 새로운 컴포넌트 작성시 타입으로 사용
export interface Props {
  children?: ReactNode;
}
