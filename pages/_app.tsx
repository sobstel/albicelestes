import React from "react";
import App from "next/app";
import NextNprogress from "nextjs-progressbar";
import Layout from "../components/Layout";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <NextNprogress
          color="#000"
          startPosition="0.3"
          stopDelayMs="200"
          height="3"
        />

        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
