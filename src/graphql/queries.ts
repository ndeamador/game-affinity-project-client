import { gql } from "@apollo/client"
import { GAME_DETAILS, USER_DETAILS } from './fragments';

export const FIND_GAMES = gql`
  query findGames(
    $name: String
    $id: Int
    # $maxResults: Int
  ) {
    findGames(
      name: $name
      id: $id
      # maxResults: $maxResults
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

export const GET_LIBRARY = gql`
  query getLibrary{
    getLibrary {
      igdb_game_id
    }
  }
`