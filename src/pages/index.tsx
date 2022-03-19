import Dashboard from "../components/Dashboard";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions, User } from "../sessionConfig";
import { UserDB } from "../structure/DB";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {

    if (!req.session.user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        }
      }
    }

    const db = new UserDB();
    const user = db.getByUsername(req.session.user.username);

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        }
      }
    }

    return {
      props: { user },
    };
  },
  ironOptions,
);

function App({ user }: { user: User }) { 
  return <Dashboard user={user} />;
}

export default App;
