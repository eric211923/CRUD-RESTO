import React from "react";
import Home from "./Home";

const Error = () => {
  const errorDetails = {
    title: "404 - Not found",
    content: "The page you are looking for cannot be found",
    destination: "/",
    label: "Back home",
  };

  return (
    <div>
      <h1>{errorDetails.title}</h1>
      <Home />
    </div>
  );
};

export default Error;
