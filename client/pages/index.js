import axios from "axios";
import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return <> {currentUser ? <h1>You are sign in</h1> : <h1>No user</h1>}</>;
};

LandingPage.getInitialProps = async (context) => {
  console.log("Landing page");
  //const client = buildClient(context);
  const { data } = await axios.get(
    "http://www.kavindugihan.site/api/users/currentuser",
    {
      headers: context.req.headers,
    }
  );

  return data;
};

export default LandingPage;
