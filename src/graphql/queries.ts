import { gql } from "@apollo/client"
import { GAME_DETAILS } from './fragments';

export const FIND_GAMES = gql`
  query findGamesByName(
    $name: String!
  ) {
    findGames(
      name: $name
    ) {
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`