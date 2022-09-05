import { gql } from "@apollo/client"
import { GAME_IN_LIBRARY_DETAILS, USER_DETAILS } from './fragments';

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
  $guest: Boolean
) {
login(
  email: $email
  password: $password
  guest: $guest
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

// export const ADD_TO_LIBRARY = gql`
// mutation addGameToLibrary($gameId: Int!) {
//   addGameToLibrary(gameId: $gameId) {
//     id
//     igdb_game_id
//   }
// }
// `

export const ADD_TO_LIBRARY = gql`
mutation addGameToLibrary($gameId: Int!, $rating: Int) {
  addGameToLibrary(gameId: $gameId, rating: $rating) {
    ...GameInLibraryDetails
  }
}
${GAME_IN_LIBRARY_DETAILS}
`

// returns a boolean.
// reimplemented to return the deleted game's id or 0.
export const REMOVE_FROM_LIBRARY = gql`
mutation removeGameFromLibrary($igdb_game_id: Int!) {
  removeGameFromLibrary(igdb_game_id: $igdb_game_id)
}
`



// Two versions in server, one returns a boolean, another (current, with added fragment) the updated object.
// removed non-null from $rating: Int! to accomodate unranked games.
export const UPDATE_RATING = gql`
mutation updateRating($igdb_game_id: Int!, $rating: Int, $subrating: Int) {
  updateRating(igdb_game_id: $igdb_game_id, rating:$rating, subrating:$subrating) {
    ...GameInLibraryDetails
  }
}
${GAME_IN_LIBRARY_DETAILS}
`



// CLIENT SIDE MUTATIONS
// ----------------------------------------

// // @client tells Apollo Client to fetch the field data locally (cache or local resolver), instead of sending it to our GraphQL server.
// export const OPEN_MODAL = gql`
// mutation openModal {
//   openModal @client
// }
// `