import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Hello = ({ data: {loading, error, hello }}) => {
  if (loading) {
   return <p>Loading ...</p>;
  }
  if (error) {
   return <p>{error.message}</p>;
  }

  return <div>
     <span>{hello}</span>
   </div>;
};

const helloQuery = gql`
  {
    hello 
  }
`;

export default graphql(helloQuery)(Hello);