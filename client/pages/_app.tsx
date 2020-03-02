import App from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../lib/withApollo';

// wraps all components in Pages
class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
