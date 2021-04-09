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
    platforms {
      id
      name
      platform_family
      category
    }
    genres {
      id
      name
    }
    involved_companies {
      id
      developer
      company {
        id
        name
      }
    }
  }
`

export const USER_DETAILS = gql`
fragment UserDetails on User {
  id
  email
}
`