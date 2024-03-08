import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "../components/Navbar";
import Place from "../components/PlaceCard";
import Divider from "../components/CustomDivider";
import Form from "../components/Form";
import Footer from "../components/Footer";
import {
  FormType,
  InputValuesContact,
  InputValuesLogin,
  InputValuesRegister,
  NAVBAR_VARIANT,
  PlaceType,
} from "../constants";
import { Box, Button, Stack, Typography } from "@mui/material";
import Description from "../components/Description";

export default function LandingPage() {
  const [demoPlaces, setDemoPlaces] = useState<PlaceType[]>([] as PlaceType[]);
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

  const [inputValues, setInputValues] = useState<InputValuesContact>({
    nameInput: "",
    emailInput: "",
    textAreaInput: "",
  });

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(inputs);
  };

  const itemsRef = useRef<{ [key: string]: HTMLElement } | null>({});

  const handleMenuSelect = (page: string) => {
    console.log("page is: " + page);

    if (itemsRef && itemsRef.current) {
      console.log(itemsRef.current);
      itemsRef.current[page].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-screen w-full">
      <div
        className="flex h-[50%] w-full flex-col justify-stretch bg-[url('./img/landing-bg.png')] bg-cover
		bg-center text-white md:h-screen"
      >
        <Navbar
          itemsRef={itemsRef}
          handleMenuSelect={handleMenuSelect}
          variant={NAVBAR_VARIANT.TRANSPARENT}
        />

        <div className="mx-auto my-auto flex flex-col items-center justify-center gap-4 text-center md:max-w-[50%]">
          <Typography component="h1" variant="h4">
            MOST EXCITING PLACES TO VISIT
          </Typography>
          <Typography component="h3" variant="h6">
            Get new travel ideas and connect with people all over the world to
            take a look at their journey
          </Typography>
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            onClick={handleExplore}
          >
            EXPLORE
          </Button>
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
        <div className="flex max-w-full flex-nowrap gap-4 overflow-auto text-black">
          {demoPlaces.map((place) => (
            <Place key={place._id} {...place} />
          ))}
        </div>
        <Button variant="contained" onClick={undefined}>
          DISCOVER MORE
        </Button>
      </div>

      <Divider />

      <Box
        component="section"
        ref={(el: HTMLElement) => {
          itemsRef.current = { ...itemsRef.current, about: el };
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          maxWidth="1280px"
          component="section"
          marginX="auto"
        >
          <Description />
        </Stack>
      </Box>

      <Divider />

      <section
        className="flex flex-col items-center gap-4 bg-waves-bg bg-cover bg-center lg:h-screen lg:flex-row lg:px-[20%]"
        ref={(el: HTMLElement) => {
          itemsRef.current = { ...itemsRef.current, contact: el };
        }}
      >
        <div className="ms-8">
          <h3 className="mt-4 font-bold text-primary lg:mt-0">GET IN TOUCH</h3>
          <Typography variant="body1">
            Still have questions? Send us a message and our response will come
            as quickly as possible
          </Typography>
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
      </section>

      <Footer />
    </div>
  );
}
