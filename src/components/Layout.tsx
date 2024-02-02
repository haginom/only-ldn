// src/components/Layout.tsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Hamburger from "hamburger-react";
import "../styles/layout.css";
import styled from "styled-components";
import { CategoryNode } from "../pages";
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
  Categories: CategoryNode[];
  selectedCategory?: string | null;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string | null>>;
  location?: any;
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
  left: ${(props: any) => (props.$isOpen ? "17rem" : "1rem")};
  z-index: 1500;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  margin-top: 0.5rem;

  @media screen and (max-width: 628px) {
    right: ${(props: any) => (props.$isOpen ? "1rem" : "initial")};
    left: ${(props: any) => (props.$isOpen ? "initial" : "1rem")};
    transition-duration: 1.5s;
  }
`;

const Layout: React.FC<LayoutProps> = ({
  Categories,
  children,
  selectedCategory,
  setSelectedCategory,
  location,
}) => {
  const [isOpen, setOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "ONLY_LOGO_White.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `);

  const handleLogoClick = () => {
    if (setSelectedCategory) {
      setSelectedCategory(null);
    }
    setOpen(false);
  };

  return (
    <main>
      <NavContainer>
        <section className="head" role="banner">
          <h1>
            <Link
              className="head-title"
              to="#"
              onClick={() => {
                handleLogoClick();
              }}
            >
              <GatsbyImage
                loading="eager"
                image={data?.logo.childImageSharp.gatsbyImageData}
                imgStyle={{ objectFit: "contain" }}
                alt="Logo"
              />
            </Link>
          </h1>
        </section>
        <HamburgerContainer $isOpen={isOpen}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </HamburgerContainer>
        <Sidebar
          location={location}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          Categories={Categories}
          isOpen={isOpen}
          setOpen={setOpen}
        />
      </NavContainer>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        transition={{
          type: "spring",

          mass: 0.35,

          stiffness: 75,

          duration: 0.2,
        }}
      >
        {children}
      </motion.div>
    </main>
  );
};

export default Layout;
