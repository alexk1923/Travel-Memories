// About.tsx
import React from "react";
import TravelImage from "../img/about1.png"; // Replace with the path to your image
import { FaGlobe, FaMapMarked, FaUsers, FaQuoteLeft } from "react-icons/fa";
import SocialWrapper from "./SocialWrapper";

const About: React.FC = () => {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${TravelImage})` }}
    >
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
        <div className="mb-8 text-center">
          <h1 className="text-gray-800 mb-4 text-4xl font-extrabold">
            Explore the World with Our Travel App
          </h1>
          <p className="text-gray-700 text-lg">
            Your journey begins here. Join our community and start creating
            memories that last a lifetime.
          </p>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Feature
            icon={<FaMapMarked />}
            title="Track Your Visited Places"
            description="Easily add and manage the places you have visited on your journeys."
          />
          <Feature
            icon={<FaGlobe />}
            title="Discover New Destinations"
            description="Explore a diverse range of places shared by other users, including hidden gems and popular landmarks."
          />
          <Feature
            icon={<FaUsers />}
            title="Connect with Travel Enthusiasts"
            description="Interact with like-minded individuals, share your experiences, and get recommendations from the community."
          />
        </div>
        <Testimonials />
        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-4 text-lg">
            Ready to embark on your next adventure?
          </p>
          <button className="rounded-full bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 focus:outline-none">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-100 flex flex-col items-center rounded-lg p-6">
      <div className="mb-4 rounded-full bg-blue-500 p-3 text-white">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-700 text-center">{description}</p>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-gray-800 mb-4 text-2xl font-bold">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Testimonial
          author="Anna, Adventure Enthusiast"
          text="The app has transformed the way I document my travels. It's easy to use, and I love connecting with fellow adventurers."
        />
        <Testimonial
          author="John, World Explorer"
          text="Discovering new places and sharing my experiences with the community has never been more enjoyable. Highly recommended!"
        />
      </div>
    </div>
  );
};

interface TestimonialProps {
  author: string;
  text: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ author, text }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center">
        <FaQuoteLeft className="mr-2 text-2xl text-blue-500" />
        <p className="text-gray-700">{text}</p>
      </div>
      <p className="text-gray-800 font-semibold">{author}</p>
    </div>
  );
};

const AboutPage = () => SocialWrapper({ WrappedComponent: About });

export default AboutPage;
