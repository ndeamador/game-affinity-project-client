import { gql } from "@apollo/client"

export const GAME_DETAILS = gql`
  fragment GameDetails on Game {
    id
    name
    summary
    first_release_date
    cover {
      id
      image_id
    }
  }
`

export const USER_DETAILS = gql`
fragment UserDetails on User {
  id
  email
}
`