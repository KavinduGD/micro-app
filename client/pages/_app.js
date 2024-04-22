import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../component/header";
import axios from "axios";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  let headers = {};

  // Only include headers if this is running on the server
  if (appContext.ctx.req) {
    // Check if the req object exists
    headers = appContext.ctx.req.headers; // Safe to use headers here
  }

  const { data } = await axios.get(
    "http://www.kavindugihan.site/api/users/currentuser",
    { headers } // Pass headers only if they exist
  );

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    currentUser: data.currentUser,
  };
};

export default AppComponent;
