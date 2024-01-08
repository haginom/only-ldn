import React, { useState } from "react";
import styled from "styled-components";
import "../styles/layout.css";
import { CategoryNode } from "../pages";
import { IoLogoVimeo } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";

interface SiderbarProps {
  Categories: CategoryNode[];
  isOpen: boolean;
  selectedCategory?: string | null;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<any>>;
}

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  left: ${({ isOpen }) => (isOpen ? "0px" : "-18.75rem")};

  @media screen and (max-width: 628px) {
    left: ${({ isOpen }) => (isOpen ? "0px" : "-100%")};
    transition-duration: 1.65s;
  }
`;
const Sidebar: React.FC<SiderbarProps> = ({
  Categories,
  isOpen,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleCategoryClick = (category: string) => {
    if (setSelectedCategory) {
      setSelectedCategory(category);
    }
  };

  const linkElements = Categories.map((item, index) =>
    item.node.released ? (
      <li key={index}>
        <a onClick={() => handleCategoryClick(item.node.category)} href="#">
          {item.node.category}
        </a>
      </li>
    ) : null
  );

  linkElements.unshift(
    <li key="home">
      <a href="/">Home</a>
    </li>
  );

  return (
    <SidebarContainer isOpen={isOpen} className="nav--main">
      <nav className="nav--head">
        <ul className="nav-list nav-list--head">{linkElements}</ul>
      </nav>
      <nav className="nav--foot">
        <ul className="nav-list nav-list--foot">
          <li>
            <a href="https://vimeo.com/onlyldn">
              <IoLogoVimeo size={25} />
            </a>
          </li>
          <li className="hamburger-contact">
            <a href="mailto:david@onlyldn.com">
              <MdOutlineMail size={26} />
            </a>
          </li>
        </ul>
      </nav>
    </SidebarContainer>
  );
};
export default Sidebar;
