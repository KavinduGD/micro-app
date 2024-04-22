import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../component/header";

//our other component load throgh this app component
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};
//If we add getInitialProps to app component , other component initialProps function won't be excute automatiically
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  try {
    const { data } = await client.get("/api/users/currentuser");
    return {
      pageProps,
      currentUser: data.currentUser,
    };
  } catch (error) {
    console.error(
      "Failed to fetch current user:",
      error.message,
      "URL:",
      client.baseUrl
    );
    throw error; // Ensure the error is visible and affects the flow as expected
  }
};

export default AppComponent;
