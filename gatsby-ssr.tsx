import * as React from "react";
import RootElement from "./src/components/RootElement";

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <RootElement>{element}</RootElement>
);
