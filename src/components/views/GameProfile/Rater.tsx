/** @jsxImportSource @emotion/react */

import { FaStar, FaHeart } from 'react-icons/fa';
import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io';
import { ChangeEvent, useContext } from 'react';
import styles from './Rater.styles';
import { Rating, User } from 'types';
import useUpdateRating from 'hooks/useUpdateRating';
import useAddToLibrary from 'hooks/useAddToLibrary';
import { BoardStateContext } from '../Library/DragDropBoard';
import findGameInLibrary from 'utils/findGameInLibrary';
import { ErrorMessage } from 'components/shared/styledComponentsLibrary';

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
  const [updateRating, { error: updateRatingError }] = useUpdateRating();
  const [addGameToLibrary, { error: addGameError }] = useAddToLibrary();
  const boardContext = useContext(BoardStateContext);

  const handleRatingChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const gameInUserLibrary = findGameInLibrary({
      gameId: gameId,
      user: currentUser,
    });

    const newRating = parseInt(event.target.value) as Rating;

    if (!gameInUserLibrary) {
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
      {(updateRatingError || addGameError) && (
        <ErrorMessage variant='stacked'>
          {updateRatingError?.message ||
            addGameError?.message ||
            'Something went wrong.'}
        </ErrorMessage>
      )}
    </div>
  );
};

export default Rater;
