import { GameInUserLibrary, User } from 'types';

const findGameInLibrary = ({ gameId, user }: { gameId: number, user: User }):GameInUserLibrary | undefined => {

  const game = user.gamesInLibrary.find(game => game.igdb_game_id === gameId);
  return game;
}

export default findGameInLibrary;