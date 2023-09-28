import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      jwt
      user {
        _id
        companyName
        companyPosition
        email
        firstName
        lastName
        status
        type
        username
      }
    }
  }
`;
