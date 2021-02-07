import React, { useState, useEffect } from "react";
import Router from "next/router";

export default function Spinner() {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setVisible(true));
    Router.events.on("routeChangeComplete", () => setVisible(false));
    Router.events.on("routeChangeError", () => setVisible(false));
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="spinner" role="spinner">
        <div className="spinner__icon"></div>
      </div>
      <style jsx>{`
        .spinner {
          display: block;
          position: fixed;
          z-index: 666;
          top: 1rem;
          right: 1rem;
        }

        .spinner__icon {
          width: 1rem;
          height: 1rem;

          border: solid 2px transparent;
          border-top-color: #000;
          border-left-color: #000;
          border-radius: 50%;

          -webkit-animation: pinner 400ms linear infinite;
          animation: spinner 400ms linear infinite;
        }

        @-webkit-keyframes spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
