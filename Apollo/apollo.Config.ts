import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "https://opitdev.foraware.forcit.cloud/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwt");

  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  }

  return headers;
});
function createApolloClient() {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: "include",
  });
}

export function useApollo() {
  const client = useMemo(() => createApolloClient(), []);
  return client;
}
