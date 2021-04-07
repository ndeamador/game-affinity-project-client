import { gql } from "@apollo/client"
import { GAME_DETAILS, USER_DETAILS } from './fragments';

export const FIND_GAMES = gql`
  query findGames(
    $name: String
    $id: [Int!]
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
      gamesInLibrary {
        id
        igdb_game_id
    }
    }
  }
  ${USER_DETAILS}
`


export const GET_LIBRARY_IDS = gql`
  query getLibraryIds{
    getLibraryIds {
      igdb_game_id
    }
  }
`

export const GET_LIBRARY = gql`
  query getLibrary{
    getLibrary {
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`