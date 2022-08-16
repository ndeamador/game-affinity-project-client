import { Rating } from './types';

// export const RATINGS: { [id: string]: Rating } = {
//   unranked: 0,
//   thumbsDown: 1,
//   thumbsUp: 2,
//   great: 3,
//   legendary: 4
// }


export const RATINGS: { [id: string]: { value: Rating, title: string } } = {
  unranked: {
    value: 0,
    title: 'Unranked'
  },
  thumbsDown: {
    value: 1,
    title: 'Thumbs Down'
  },
  thumbsUp: {
    value: 2,
    title: 'Thumbs Up'
  },
  great: {
    value: 3,
    title: 'Great'
  },
  legendary: {
    value: 4,
    title: 'Legendary'
  }
}