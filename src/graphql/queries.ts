import { gql } from "@apollo/client"
import { GAME_DETAILS } from './fragments';

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