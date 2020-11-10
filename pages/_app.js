import "../styles/globals.css";
import Header from "../components/Header";

import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Header user={pageProps.user} />
      <div
        className={
          router.asPath.includes("/meetings/")
            ? "meetingsContainer"
            : "container"
        }
      >
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
