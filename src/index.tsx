import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import { AuthProvider } from './context/AuthContext';

console.log('ENVIROMENT: ', process.env.API_URL);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_VERCEL_API_URL,
    // uri: 'gap-server.nicodeamador.com/graphql/',
    credentials: 'include', // Required for sessions. Sends our cookie back to the server with every request. // https://www.apollographql.com/docs/react/networking/authentication/
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
