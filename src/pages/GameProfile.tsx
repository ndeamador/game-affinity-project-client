/** @jsxImportSource @emotion/react */
import { useParams, useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { FIND_GAMES, GET_LIBRARY } from '../graphql/queries';
import loadingTravolta from '../assets/notFound-264x374.gif';
import TooltipButton from '../components/TooltipButton';
import { FaPlusCircle, FaBook } from 'react-icons/fa';
import { Spinner } from '../components/styledComponentsLibrary';
import { ADD_TO_LIBRARY } from '../graphql/mutations';
import { Game, GameInUserLibrary } from '../types';
import FullPageSpinner from '../components/FullPageSpinner';

const GameProfile = () => {
  const history = useHistory();
  const { gameId } = useParams<{ gameId: string }>();

  const { loading, data, error } = useQuery(FIND_GAMES, {
    variables: { id: parseInt(gameId) },
    fetchPolicy: 'cache-first',
  });

  const [
    addGameToLibrary,
    { loading: addingToLibrary, error: libraryError },
  ] = useMutation(ADD_TO_LIBRARY, {
    variables: { gameId: parseInt(gameId) },
    refetchQueries: [{ query: GET_LIBRARY }],
  });

  const { data: library } = useQuery(GET_LIBRARY);
  const isGameInLibrary: boolean = library?.getLibrary.find(
    (game: GameInUserLibrary) => game.igdb_game_id === parseInt(gameId)
  )
    ? true
    : false;
  console.log('inlib: ', isGameInLibrary);
  console.log(
    'findresult: ',
    library?.getLibrary.find(
      (game: GameInUserLibrary): boolean =>
        game.igdb_game_id === parseInt(gameId)
    )
  );

  if (loading) return <FullPageSpinner />;

  if (error) return <h3>Game not found</h3>;

  const game = data?.findGames[0];

  // console.log(game);
  console.log('liberror: ', typeof libraryError, libraryError?.message);
  console.log(
    'gameid params: ',
    gameId,
    typeof gameId,
    ' - gameId response: ',
    game.id,
    typeof game.id
  );

  // Setting image resolution from url: https://api-docs.igdb.com/#images
  const imageSize = 'cover_big';
  const imageLink = game.cover?.id
    ? `//images.igdb.com/igdb/image/upload/t_${imageSize}/${game.cover?.image_id}.jpg`
    : loadingTravolta;

  return (
    <div
      css={{
        display: 'flex',
      }}
    >
      <div
        css={{
          width: '264px',
          maxWidth: '264px',
          flexShrink: 0,
        }}
      >
        <img
          src={imageLink}
          css={{
            width: '100%',
          }}
        ></img>
      </div>

      <div>
        <h3>{game.name}</h3>
        <p>{game.summary}</p>
      </div>

      <div>
        {isGameInLibrary ? (
          <TooltipButton
            label='In library'
            onClick={() => history.push('/library')}
            icon={<FaBook />}
            isLoading={false}
            // isError={libraryError ? true : false}
            // errorMessage={libraryError?.message}
          />
        ) : (
          <TooltipButton
            label='Add to library'
            onClick={addGameToLibrary}
            icon={<FaPlusCircle />}
            isLoading={addingToLibrary}
            isError={libraryError ? true : false}
            errorMessage={libraryError?.message}
          />
        )}
      </div>
    </div>
  );
};

export default GameProfile;
