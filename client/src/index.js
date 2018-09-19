import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'

var apolloUri = 'http://localhost:3001/graphql'

const client = new ApolloClient({
  link: new HttpLink({ uri: apolloUri, credentials: 'include' }),
  cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Login />
    </ApolloProvider>,
    document.getElementById('root')
);

 