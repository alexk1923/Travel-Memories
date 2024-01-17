import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { NAVBAR_VARIANT } from "../constants";

interface SocialWrapperProps {
  WrappedComponent: React.ComponentType<any>;
}

export default function SocialWrapper(props: SocialWrapperProps) {
  return (
    <div className="flex flex-col">
      <Navbar variant={NAVBAR_VARIANT.SOLID} />
      <div className="min-h-screen w-full bg-[url(./img/waves-bg.png)] bg-cover bg-center">
        <props.WrappedComponent></props.WrappedComponent>
      </div>
      <Footer />
    </div>
  );
}
