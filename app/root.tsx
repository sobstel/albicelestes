import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import React, { useEffect } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useTransition,
} from "remix";

import { Header, Page } from "~/components/layout";

import styles from "./styles/app.css";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: nProgressStyles },
  ];
}

export function CatchBoundary() {
  const { status, statusText } = useCatch();
  return (
    <html>
      <head>
        <title>Error</title>
        <Links />
      </head>
      <body>
        <Page>
          <Header top text={`ERROR #${status}: ${statusText} `} />
        </Page>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const transition = useTransition();
  useEffect(() => {
    if (transition.state === "idle") {
      NProgress.done();
    } else {
      NProgress.start();
    }
  }, [transition.state]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
