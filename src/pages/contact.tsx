import * as React from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";

export interface QueryData {
  logo: {
    childImageSharp: {
      gatsbyImageData: any;
    };
  };
}
export const query = graphql`
  query {
    logo: file(relativePath: { eq: "ONLY_LOGO_White.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;

const ContactPage = ({ data }: { data: QueryData }) => {
  return (
    <>
      <div className="contact-page">
        <Link className="video-back black" to="/">
          <RxCross1 size={26} />
        </Link>
        <div className="contact-page__info">
          <h1>
            <GatsbyImage
              style={{ width: "75%", margin: "0 auto" }}
              alt="only london logo"
              image={data?.logo.childImageSharp.gatsbyImageData}
            />
          </h1>
          <p>
            David Graham is a multi award winning London based editor with over
            15 years experience in TV, documentary, music videos, commercials,
            fashion films and branded content.
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
