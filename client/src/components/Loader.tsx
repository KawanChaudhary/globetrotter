import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import loaderAnimation from "../assets/loader.json";

interface LoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loader = ({ isLoading, children }: LoaderProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Player
          autoplay
          loop
          src={loaderAnimation}
          style={{ height: "100px", width: "100px", paddingTop:30 }}
        />
      </div>
    );
  }
  return children;
};

export default Loader;
