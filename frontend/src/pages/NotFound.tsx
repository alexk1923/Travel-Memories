import React from "react";
import bgImg from "../img/404bg.svg";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-center font-bold lg:text-xl">
        This page doesn&apost exist, try again
      </h1>
      <img alt="not-found" src={bgImg} className="w-full lg:w-3/4 xl:w-1/2" />
    </div>
  );
}
