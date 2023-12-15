// src/components/Layout.tsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Hamburger from "hamburger-react";
import "../styles/layout.css";
import styled from "styled-components";
import { CategoryNode } from "../pages";
import { MdOutlineMail } from "react-icons/md";
import { StaticImage } from "gatsby-plugin-image";

interface LayoutProps {
  children: React.ReactNode;
  Categories: CategoryNode[];
  selectedCategory?: string | null;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string | null>>;
}

interface StyledHamburgerContainerProps {
  $isOpen: boolean;
}

const NavContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const HamburgerContainer = styled.div<StyledHamburgerContainerProps>`
  position: fixed;
  left: ${(props) => (props.$isOpen ? "15rem" : "1rem")};
  z-index: 1500;
  transition-duration: 0.65s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  margin-top: 0.5rem;

  @media screen and (max-width: 628px) {
    right: ${(props) => (props.$isOpen ? "1rem" : "initial")};
    left: ${(props) => (props.$isOpen ? "initial" : "1rem")};
    transition-duration: 1.65s;
  }
`;

const Layout: React.FC<LayoutProps> = ({
  Categories,
  children,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <main>
      <NavContainer>
        <section className="head" role="banner">
          <h1 className="head-title">
            <a href="/">
              <StaticImage
                src="../images/ONLY_LOGO_white.png"
                imgStyle={{ objectFit: "contain" }}
                alt="Logo"
              />
            </a>
          </h1>
        </section>
        <HamburgerContainer $isOpen={isOpen}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </HamburgerContainer>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          Categories={Categories}
          isOpen={isOpen}
        />
        <section className="contact">
          <a href="mailto:david@onlyldn.com">
            <MdOutlineMail size={26} />
          </a>
        </section>
      </NavContainer>
      {children}
    </main>
  );
};

export default Layout;
