import React, { useState, useEffect } from "react";
// import Router from "next/router";

export default function Spinner() {
  const [isVisible, setVisible] = useState(false);

  // useEffect(() => {
  //   Router.events.on("routeChangeStart", () => setVisible(true));
  //   Router.events.on("routeChangeComplete", () => setVisible(false));
  //   Router.events.on("routeChangeError", () => setVisible(false));
  // }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="_spinner" role="spinner">
      <div className="_spinner__icon"></div>
    </div>
  );
}
