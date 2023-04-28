import { Analytics } from "@vercel/analytics/react";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import React, { useEffect } from "react";
import {
  Links,
  LinksFunction,
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

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: nProgressStyles },
    { rel: "icon", href: "/favicon.png", type: "image/png" },
  ];
};

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
        <Analytics />
      </body>
    </html>
  );
}

export default function AppRoot() {
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
        <Page>
          <Outlet />
        </Page>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
