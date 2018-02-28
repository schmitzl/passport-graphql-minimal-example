import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

// Pass your GraphQL endpoint to uri
var apolloUri = 'http://localhost:3001/graphql'; 

const client = new ApolloClient({
  uri: apolloUri 
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <Login />
    </ApolloProvider>,
    document.getElementById('root')
);

 