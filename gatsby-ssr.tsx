import * as React from "react";
import RootElement from "./src/components/RootElement";

export const wrapRootElement = ({ element }) => (
  <RootElement>{element}</RootElement>
);
