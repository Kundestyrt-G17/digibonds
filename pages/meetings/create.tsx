import React from "react";
import CreateMeeting from "../../components/Meeting/CreateMeeting";
import { withIronSession } from "next-iron-session";

const CreateMeetingPage = ({ user }) => {
  return <CreateMeeting />;
};

export default CreateMeetingPage;

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
