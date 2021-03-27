import { gql } from "@apollo/client"

 export const GAME_DETAILS = gql`
  fragment GameDetails on Game {
    id
    name
    summary
    firstReleaseDate
  }
`

export const USER_DETAILS = gql`
fragment UserDetails on User {
  id
  email
}
`