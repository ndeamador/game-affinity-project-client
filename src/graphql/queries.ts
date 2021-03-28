import { gql } from "@apollo/client"
import { GAME_DETAILS, USER_DETAILS } from './fragments';

export const FIND_GAMES = gql`
  query findGames(
    $name: String
    $id: Float
  ) {
    findGames(
      name: $name
      id: $id
    ) {
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`

export const CURRENT_USER = gql`
  query isLoggedIn{
    me {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`