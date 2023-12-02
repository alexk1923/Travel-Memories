import React from "react";
import navbarLogo from "../img/logo/default-monochrome-black.svg";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="text-body-2 flex max-w-full flex-col bg-white py-8 md:p-8 ">
      <div className="flex max-w-full flex-col gap-4 lg:mx-[20%]">
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-around lg:gap-8">
          <div className="flex flex-col items-center">
            <img
              src={navbarLogo}
              alt="logo"
              className="mb-4 w-[200px] max-w-[70%] md:max-w-[75%] lg:mb-8 lg:max-w-[100%]"
            />
            <div className="text-body-1 flex gap-1 lg:gap-4">
              <FaFacebook />
              <FaInstagram />
              <FaLinkedin />
              <FaGithub />
            </div>
          </div>

          <div className="mt-4 flex gap-4 lg:mt-0 lg:gap-8">
            <div className="flex flex-col gap-2 lg:gap-0">
              <h4 className="font-bold lg:mb-2">Company</h4>
              <span>About Us</span>
              <span>Contact</span>
            </div>

            <div className="flex flex-col gap-2 lg:gap-0">
              <h4 className="font-bold lg:mb-2">Service</h4>
              <span>FAQ</span>
              <span>Customer Support</span>
              <span>Suggestions</span>
            </div>

            <div className="flex flex-col gap-2 lg:gap-0">
              <h4 className="font-bold lg:mb-2">Legal</h4>
              <span>Privacy Policy</span>
              <span>Terms of use</span>
              <span>Data protection</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="h-px w-[100%] bg-primary"></div>
          <span className="self-start">
            Copyright 2023 © Next Travel. All rights reserved
          </span>
        </div>
      </div>
    </div>
  );
}
