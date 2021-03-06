import { gql } from "@apollo/client"
import { USER_DETAILS } from './fragments';

export const REGISTER_NEW_USER = gql`
  mutation registerNewUser(
  $email: String!
  $password: String!
) {
registerNewUser(
  email: $email
  password: $password

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
  email: $email
  password: $password

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

export const ADD_TO_LIBRARY = gql`
mutation addGameToLibrary($gameId: Int!) {
  addGameToLibrary(gameId: $gameId) {
    id
    igdb_game_id
  }
}
`

// returns a boolean.
export const REMOVE_FROM_LIBRARY = gql`
mutation removeGameFromLibrary($igdb_game_id: Int!) {
  removeGameFromLibrary(igdb_game_id: $igdb_game_id)
}
`


// returns a boolean.
export const UPDATE_RATING = gql`
mutation updateRating($gameId: Int!, $rating: Int!) {
  updateRating(gameId: $gameId, rating:$rating)
}
`