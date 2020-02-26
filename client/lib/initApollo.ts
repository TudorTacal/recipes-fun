import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from "apollo-boost";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import Cookies from 'js-cookie';
import { isBrowser } from "./isBrowser";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface Options {
  getToken: () => string;
}

function create(initialState: any, { getToken }: Options) {
  // use this only in the browser not on the server
  let accessToken;
  let hasLoggedInUser;
  let getCurrentUser;

  if (isBrowser) {
    hasLoggedInUser = require('./stitchAuthentication').hasLoggedInUser;
    const { loginAnonymous } = require('./stitchAuthentication');
    getCurrentUser = require('./stitchAuthentication').getCurrentUser;

    if (!hasLoggedInUser()) {
      loginAnonymous();
    }
  }

  if (hasLoggedInUser && hasLoggedInUser()) {
    accessToken = hasLoggedInUser() ? getCurrentUser().auth.activeUserAuthInfo.accessToken : '';
    Cookies.set('accessToken', accessToken);
    // refresh the page after this load or show a page with login anonymously
    // on button click then refresh the page
  }

  const httpLink = createHttpLink({
    uri: "https://stitch.mongodb.com/api/client/v2.0/app/recipesapp-tfmxd/graphql",
    credentials: "include"
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${getToken()}`,
      }
    };
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: false, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState: any, options: Options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't  shared between connections (which would be bad)
  if (!isBrowser) {
    apolloClient = create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}