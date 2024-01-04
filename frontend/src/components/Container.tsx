import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="flex-2 mx-4 lg:mx-auto lg:max-w-[1280px]">{children}</div>
  );
};

export default Container;
