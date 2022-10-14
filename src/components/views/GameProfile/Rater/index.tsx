/** @jsxImportSource @emotion/react */

import { FaStar, FaHeart } from 'react-icons/fa';
import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io';
import findGameInLibrary from '../../../../utils/findGameInLibrary';
import { ChangeEvent, useContext } from 'react';
import { ErrorMessage } from '../../../shared/styledComponentsLibrary';
import { Rating, User } from '../../../../types';
import useAddToLibrary from '../../../../hooks/useAddToLibrary';
import useUpdateRating from '../../../../hooks/useUpdateRating';
import { BoardStateContext } from '../../Library/DragDropBoard';
import styles from './styles';

const iconColors = ['DarkSlateBlue', 'green', 'gold', 'red'];
const iconLevels = [
  <IoIosThumbsDown
    key='thumbs-down'
    css={{ ':hover': { color: iconColors[0] } }}
    className='rating-icon thumbs-down-icon'
  />,
  <IoIosThumbsUp
    key='thumbs-up'
    css={{ ':hover': { color: iconColors[1] } }}
    className='rating-icon thumbs-up-icon'
  />,
  <FaStar
    key='great'
    css={{ ':hover': { color: iconColors[2] } }}
    className='rating-icon great-icon'
  />,
  <FaHeart
    key='legendary'
    css={{ ':hover': { color: iconColors[3] } }}
    className='rating-icon legendary-icon'
  />,
];

const Rater = ({
  gameId,
  currentUser,
}: {
  gameId: number;
  currentUser: User;
}) => {
  const [updateRating, { data: updateRatingResult, error: updateRatingError }] =
    useUpdateRating();

  const [
    addGameToLibrary,
    { data: addToLibraryResult, loading: addingToLibrary, error: addGameError },
  ] = useAddToLibrary();

  // const { updateBoardStateWithId } = useBoardState(currentUser);
  const boardContext = useContext(BoardStateContext);

  // console.log(
  //   '::In rater:: user: ',
  //   currentUser?.email,
  //   currentUser ? Object.keys(currentUser?.gamesInLibrary).length : undefined
  // );

  // console.log('currentuser:', addingToLibrary, currentUser);

  const handleRatingChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const gameInUserLibrary = findGameInLibrary({
      gameId: gameId,
      user: currentUser,
    });

    const newRating = parseInt(event.target.value) as Rating;

    if (!gameInUserLibrary) {
      /* const newGame = */
      await addGameToLibrary({
        variables: { gameId: gameId, rating: newRating },
        optimisticResponse: {
          isOptimistic: true,
          addGameToLibrary: {
            __typename: 'GameInUserLibrary',
            id: '-1',
            igdb_game_id: gameId,
            rating: newRating,
            subrating: null,
          },
        },
      });

      ratingValue = newRating as Rating;
      // console.log(
      //   '============================================================='
      // );
      // console.log('addedtolibrary: ', newGame);
      // console.log('updated gameInUserLibrary', gameInUserLibrary);
      // console.log(' user after:', currentUser);
      // console.log(
      //   '============================================================='
      // );
    } else {
      if (boardContext)
        boardContext.updateBoardStateWithId(gameId, newRating, currentUser);

      updateRating({
        variables: {
          igdb_game_id: gameId,
          rating: newRating,
        },
        optimisticResponse: {
          isOptimistic: true,
          updateRating: gameInUserLibrary
            ? {
                ...gameInUserLibrary,
                rating: newRating,
              }
            : {
                id: '-1', // dummy value (will be updated with the server generated id)
                rating: newRating,
                subrating: null,
                igdb_game_id: gameId,
                __typename: 'GameInUserLibrary',
              },
        },
      });
    }
  };

  // Extract game rating from me query.
  let ratingValue = currentUser
    ? findGameInLibrary({ gameId, user: currentUser })?.rating
    : undefined;

  const elementClassName = `rating-${gameId}`;

  const radioInputs = iconLevels.map((icon, i) => {
    const inputId = `rating-input-${String(icon.key)}`;
    const indexFrom1 = i + 1;

    return (
      <div key={icon.key}>
        <input
          aria-label={inputId}
          name={elementClassName}
          type='radio'
          value={indexFrom1}
          checked={indexFrom1 === ratingValue}
          onChange={handleRatingChange}
          id={inputId}
          css={styles.radioInput(i, elementClassName, iconColors)}
        />
        <label htmlFor={inputId} css={styles.label}>
          {icon}
        </label>
      </div>
    );
  });

  return (
    <div className={elementClassName} css={styles.mainContainer}>
      <span css={styles.iconsContainer}>{radioInputs}</span>
      {
        /* getUserError  ||*/ (updateRatingError || addGameError) && (
          <ErrorMessage variant='stacked'>
            {
              /* getUserError?.message || */
              updateRatingError?.message ||
                addGameError?.message ||
                'Something went wrong.'
            }
          </ErrorMessage>
        )
      }
    </div>
  );
};

export default Rater;
