import React, { useState } from "react";
import styled from "styled-components";
import "../styles/layout.css";
import { CategoryNode } from "../pages";
import { IoLogoVimeo } from "react-icons/io";
import { Link } from "gatsby";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { cubicBezier } from "framer-motion";

interface SiderbarProps {
  Categories: CategoryNode[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory?: string | null;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<any>>;
  location?: any;
}

const Sidebar: React.FC<SiderbarProps> = ({
  Categories,
  isOpen,
  setOpen,
  selectedCategory,
  setSelectedCategory,
  location,
}) => {
  const handleCategoryClick = (category: string | null) => {
    if (setSelectedCategory) {
      setSelectedCategory(category);
      setOpen(false);
    }
  };

  const linkElements = Categories.map((item, index) => {
    return item.node.released ? (
      <li
        key={uuidv4()}
        className={selectedCategory === item.node.category ? "selected" : ""}
      >
        <Link
          state={{ selectedCategory: item.node.category }}
          onClick={() => handleCategoryClick(item.node.category)}
          to={location.pathname === "/" ? "#" : "/"}
        >
          {item.node.category}
        </Link>
      </li>
    ) : null;
  });

  linkElements.unshift(
    <li key={0} onClick={() => handleCategoryClick(null)}>
      <Link to="/">Home</Link>
    </li>
  );
  linkElements.push(
    <li key={linkElements.length} onClick={() => handleCategoryClick(null)}>
      <Link to="/contact">Contact</Link>
    </li>
  );

  const easing = cubicBezier(0.075, 0.82, 0.165, 1);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="sidebar"
          initial={{ x: "-100%" }}
          animate={{
            x: "0rem",
            transition: { duration: 0.65, ease: easing },
          }}
          exit={{ x: "-100%", transition: { duration: 0.65, ease: easing } }}
          className="nav--main"
        >
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
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Sidebar;
