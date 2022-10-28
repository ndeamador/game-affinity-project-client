import { gql } from "@apollo/client"
import { GAME_DETAILS, GAME_IN_LIBRARY_DETAILS, USER_DETAILS } from './fragments';

export const FIND_GAMES = gql`
  query findGames(
    $name: String
    $id: [Int!]
    $maxResults: Int
  ) {
    findGames(
      name: $name
      id: $id
      maxResults: $maxResults
    ) {
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`

export const CURRENT_USER = gql`
  query getCurrentUser{
    me {
      ...UserDetails
      gamesInLibrary {
        ...GameInLibraryDetails
    }
    }
  }
  ${USER_DETAILS},
  ${GAME_IN_LIBRARY_DETAILS}
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

export const GET_RANKING = gql`
  query getRankedGames {
    getRankedGames {
      average_rating,
      number_of_ratings,
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`