import React from "react";

export default function LoginCard() {
  return (
    <div className="relative hidden h-full lg:block lg:rounded-lg lg:bg-[url('img/mountain.jpg')] lg:bg-cover lg:bg-center lg:bg-no-repeat">
      <div className="absolute left-[10%] top-1/2 hidden aspect-square w-[80%] -translate-y-1/2 transform flex-col justify-center border-2 text-center font-bold text-white backdrop-blur-sm md:text-lg lg:flex">
        <h1 className="md:3xl xlg:text-5xl  p-3 drop-shadow-xl lg:text-5xl">
          Join the community.
        </h1>
        <h2 className="md:text-md text-slate-50 drop-shadow-2xl lg:text-xl">
          Add new travel places from all around the world
        </h2>
      </div>
    </div>
  );
}
