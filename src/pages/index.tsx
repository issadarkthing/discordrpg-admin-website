import Dashboard from "../components/Dashboard";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions, User } from "../sessionConfig";

{/* export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {

    if (!req.session.user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        }
      }
    }

    return {
      props: { user: req.session.user },
    };
  },
  ironOptions,
); */}

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    }
  }
}

function App({ user }: { user: User }) { 
  return <Dashboard user={user} />;
}

export default App;
