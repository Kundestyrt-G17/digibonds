import "../styles/globals.css";
import Header from "../components/Header";
import { withIronSession } from "next-iron-session";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header user={pageProps.user} />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;

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
