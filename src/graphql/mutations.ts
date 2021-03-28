import { gql } from "@apollo/client"
import { USER_DETAILS } from './fragments';

export const REGISTER_NEW_USER = gql`
  mutation registerNewUser(
  $email: String!
  $password: String!
) {
registerNewUser(
loginDetails: {
  email: $email
  password: $password
}
) {
  ...UserDetails
}
}
  ${USER_DETAILS}
`

export const LOGIN = gql`
  mutation login(
  $email: String!
  $password: String!
) {
login(
loginDetails: {
  email: $email
  password: $password
}
) {
  ...UserDetails
}
}
  ${USER_DETAILS}
`

export const LOGOUT = gql`
  mutation logout{
    logout
  }
`