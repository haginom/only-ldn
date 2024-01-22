import * as React from "react";
import Layout from "../components/Layout";
import { RxCross1 } from "react-icons/rx";
import { Link } from "gatsby";

const ContactPage = () => {
  return (
    <>
      <div className="contact-page">
        <Link className="video-back black" to="/">
          <RxCross1 size={26} />
        </Link>
        <div className="contact-page__info">
          <h1>Video editor based in London</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.{" "}
          </p>
          <a className="get-in-touch" href="email">
            Get in touch for any enquiry
          </a>
          <p className="title">Email</p>
          <p>info@onlyldn.com</p>
          <p className="title">Social Media</p>
          <p>info@onlyldn.com</p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
