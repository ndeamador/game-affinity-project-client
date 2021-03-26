import { gql } from "@apollo/client"

 export const GAME_DETAILS = gql`
  fragment GameDetails on Game {
    id
    name
    summary
    firstReleaseDate
  }
`