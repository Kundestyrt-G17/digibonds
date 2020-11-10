import React from "react";
import Meeting from "../../components/Meeting/Meeting";
import { withIronSession } from "next-iron-session";

const ViewMeetingsPage = ({ user }) => {
  return <Meeting />;
};

export default ViewMeetingsPage;

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");

    if (!user) {
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  {
    cookieName: "AUTH_COOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: process.env.APPLICATION_SECRET,
  }
);
