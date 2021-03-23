import { gql } from "@apollo/client"

const GAME_DETAILS = gql`
  fragment GameDetails on Game {
    id
    name
    summary
    firstReleaseDate
  }
`

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