import React from "react";
import Home from "./Home";

export default function Error() {
  const data = {
    title: "404 - Not found",
    content: "The page you are looking for cannot be found",
    destination: "/",
    label: "Back home",
  };

  return <Home data={data} />;
}
