import Dashboard from "../components/Dashboard";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../sessionConfig";
import type { UserSession } from "./api/login";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const session = req.session as UserSession;

    if (!session.user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        }
      }
    }


    return {
      props: {
        user: session.user,
      },
    };
  },
  ironOptions,
);

function App() { 
  return <Dashboard />;
}

export default App;
