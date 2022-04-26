import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import resolvers from './resolvers';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

// import { AuthProvider } from './context/AuthContext'; // Refactored authentication to use Apollo's caching instead of a React context provider.

console.log('ENVIROMENT: ', process.env.REACT_APP_VERCEL_API_URL);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_VERCEL_API_URL,
    credentials: 'include', // Required for sessions. Sends our cookie back to the server with every request. // https://www.apollographql.com/docs/react/networking/authentication/
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      {/* <AuthProvider> */}
        <App />
      {/* </AuthProvider> */}
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
