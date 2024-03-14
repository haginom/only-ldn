// FirstLoadContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface FirstLoadContextType {
  firstLoad: boolean;
  setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>;
  animationComplete: boolean;
  setAnimationComplete: React.Dispatch<React.SetStateAction<boolean>>;
  animationStart: boolean;
  setAnimationStart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FirstLoadContext = createContext<FirstLoadContextType>({
  firstLoad: false,
  setFirstLoad: () => {},
  animationComplete: false,
  setAnimationComplete: () => {},
  animationStart: false,
  setAnimationStart: () => {},
});

interface FirstLoadProviderProps {
  children: ReactNode;
}

export const FirstLoadProvider = ({ children }: FirstLoadProviderProps) => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [animationStart, setAnimationStart] = useState<boolean>(false);

  const [animationComplete, setAnimationComplete] = useState<boolean>(false);

  return (
    <FirstLoadContext.Provider
      value={{
        firstLoad,
        setFirstLoad,
        animationComplete,
        setAnimationComplete,
        animationStart,
        setAnimationStart,
      }}
    >
      {children}
    </FirstLoadContext.Provider>
  );
};
