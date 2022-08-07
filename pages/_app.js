import { createContext, useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar.js";
import "../styles/globals.css";

const client = new ApolloClient({
  uri: "https://api.zora.co/graphql",
  cache: new InMemoryCache()
});

export const WalletContext = createContext();

const VaporApp = ({ Component, pageProps }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  return (
    <ApolloProvider client={client}>
      <WalletContext.Provider value={{ currentAccount, setCurrentAccount }}>
        <NavBar />
        <Component {...pageProps} />
      </WalletContext.Provider>
      <Toaster position="bottom-center" />
    </ApolloProvider>);
}

export default VaporApp;
