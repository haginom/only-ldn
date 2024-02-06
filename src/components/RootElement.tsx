import React from "react";
import { FirstLoadProvider } from "../context/firstLoadContext";

const RootElement = ({ children }: { children: React.ReactNode }) => (
  <FirstLoadProvider>{children}</FirstLoadProvider>
);

export default RootElement;
