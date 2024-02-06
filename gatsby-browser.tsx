import React from "react";
import { AnimatePresence } from "framer-motion";
import "./src/styles/global.css";
import "./src/styles/global.css";
import "@fontsource-variable/playfair-display";
import RootElement from "./src/components/RootElement";

export const wrapPageElement = ({ element }: { element: React.ReactNode }) => (
  <AnimatePresence mode="wait">{element}</AnimatePresence>
);

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  // transition duration from `layout.js` * 1000 to get time in ms
  const TRANSITION_DELAY = 0.2 * 1000 * 2;

  // if it's a "normal" route
  if (location.action === "PUSH") {
    window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY);
  }

  // if we used the browser's forwards or back button
  else {
    const savedPosition = getSavedScrollPosition(location) || [0, 0];

    window.setTimeout(
      () => window.scrollTo(...savedPosition),
      TRANSITION_DELAY
    );
  }

  return false;
};
