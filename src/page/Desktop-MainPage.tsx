import React from "react";
import Team from "../components/Desktop/Team";
import Header from "../components/Desktop/Header";

export default function MainPage() {
  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="container mx-auto my-5">
        <Header />
        <Team />
      </div>
    </div>
  );
}
