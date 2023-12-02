import { FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import AOS from "aos";
import "aos/dist/aos.css";
import about1 from "../img/about1.png";
import about2 from "../img/about2.png";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Place, { PlaceType } from "../components/Place";
import { usePlaceContext } from "../contexts/PlaceContext";
import Divider from "../components/Divider";
import Form from "../components/Form";
import Footer from "../components/Footer";
import {
  FormType,
  InputValuesContact,
  InputValuesLogin,
  InputValuesRegister,
  NAVBAR_VARIANT,
} from "../constants";

export default function LandingPage() {
  const { user } = useUserContext();
  const { state } = usePlaceContext();
  const [demoPlaces, setDemoPlaces] = useState<PlaceType[]>([] as PlaceType[]);
  const navigate = useNavigate();
  const trendingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    AOS.init();
  }, []);

  const handleExplore = () => {
    if (trendingRef.current) {
      trendingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8000/api/places/all?limit=5`, {
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log("Am primit cu o limita de 5 urmatoarele locuri:");
        console.log(data);
        setDemoPlaces(data);
      });
  }, []);

  const inputs = [
    {
      key: 1,
      name: "nameInput",
      label: "Name",
      placeholder: "Enter your name",
      type: "text",
      htmlFor: "name",
      errorMessage: "",
    },
    {
      key: 2,
      name: "emailInput",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      errorMessage: "Invalid email",
      htmlFor: "email",
    },
  ];

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(inputs);
  };

  const [inputValues, setInputValues] = useState<InputValuesContact>({
    nameInput: "",
    emailInput: "",
    textAreaInput: "",
  });

  return (
    <div className="h-screen w-full">
      <div
        className="flex h-screen w-full flex-col justify-stretch bg-[url('./img/landing-bg.png')]
		bg-cover bg-center text-white"
      >
        <Navbar variant={NAVBAR_VARIANT.TRANSPARENT} />

        <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4 text-center md:max-w-[50%]">
          <h1 className="font-bold drop-shadow-lg">
            MOST EXCITING PLACES TO VISIT
          </h1>
          <h3 className="font-semibold drop-shadow-lg">
            Get new travel ideas and connect with people all over the world to
            take a look at their journey
          </h3>
          <Button text="EXPLORE" variant="filled" onClick={handleExplore} />
        </div>
      </div>

      {/* Used only for scrolling */}
      <div ref={trendingRef}></div>

      <Divider />

      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-bold drop-shadow-lg">TRENDING PLACES</h2>
        <h3 className=" font-semibold drop-shadow-lg">
          Find the perfect place for your next travel
        </h3>
        <div className="flex max-w-full flex-wrap justify-center gap-5 overflow-hidden text-black md:flex-nowrap">
          {demoPlaces.map((place) => (
            <Place {...place} />
          ))}
        </div>
        <Button text={"DISCOVER MORE"} variant={"filled"} onClick={undefined} />
      </div>

      <Divider />

      <div className="flex flex-col items-center justify-center gap-4 text-center lg:mx-[20%]">
        <h2 className="font-bold drop-shadow-lg">
          Different people, same passion
        </h2>
        <div className="flex items-start justify-between">
          <img src={about1} className="max-w-[50%]" />
          <div className="ps-8 text-start">
            <h3 className="font-bold text-primary ">
              A network meant to connect
            </h3>
            <p className="text-body-1">
              To gether, we'll explore new horizons, learn from one another, and
              build bridges that connect us across the continents. Because no
              matter where you're from, the desire to explore and connect with
              the world is a universal language we all share.
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1 pe-8 ps-2 text-start lg:ps-0">
            <h3 className="font-bold text-primary ">Track your journey</h3>
            <p className="text-body-1">
              Our platform is designed to offer an intuitive and organized way
              for you to easily track the places you've visited. Create a plan
              for your future adventures by exploring and saving desired
              experiences within your personal profile to access them whenever
              you need.{" "}
            </p>
          </div>
          <div className="flex-1">
            <img src={about2} className="h-full object-cover" />
          </div>
        </div>

        <span className="text-body-1 font-semibold italic text-primary">
          Learn more {">"}{" "}
        </span>
      </div>

      <Divider />

      <div className="flex flex-col items-center gap-4 bg-waves-bg bg-cover bg-center lg:h-screen lg:flex-row lg:px-[20%]">
        <div className="ms-8">
          <h3 className="mt-4 font-bold text-primary lg:mt-0">GET IN TOUCH</h3>
          <p className="text-body-1">
            Still have questions? Send us a message and our response will come
            as quickly as possible
          </p>
        </div>
        <Form
          inputs={inputs}
          title="Contact Us"
          submitMessage="Send"
          textArea="Message"
          type={FormType.CONTACT}
          inputValues={inputValues}
          setInputValues={
            setInputValues as React.Dispatch<
              React.SetStateAction<
                InputValuesLogin | InputValuesRegister | InputValuesContact
              >
            >
          }
          handleFormSubmit={handleContactSubmit}
        />
      </div>

      <Footer />
    </div>
  );
}
