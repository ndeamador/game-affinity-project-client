/** @jsxImportSource @emotion/react */

import { FaStar, FaHeart } from 'react-icons/fa';
import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io';
import findGameInLibrary from '../../../../utils/findGameInLibrary';
import { useMutation } from '@apollo/client';
import { ADD_TO_LIBRARY, UPDATE_RATING } from '../../../../graphql/mutations';
import { CURRENT_USER } from '../../../../graphql/queries';
import { ChangeEvent, useContext, useEffect } from 'react';
import useLazyCurrentUser from '../../../../hooks/useLazyCurrentUser';
import { ErrorMessage, Spinner } from '../../../shared/styledComponentsLibrary';
import { MeResponse, GameInUserLibrary, Rating, User } from '../../../../types';
import useAddToLibrary from '../../../../hooks/useAddToLibrary';
import useUpdateRating from '../../../../hooks/useUpdateRating';
import { css } from '@emotion/react';
import useBoardState from '../../../../hooks/useBoardState';
import { BoardStateContext } from '../../Library/DragDropBoard';

const styles = {
  mainContainer: css({
    display: 'flex',
    paddingBottom: '0px',
    justifySelf: 'flex-end',
    flexDirection: 'column',
  }),
  iconsContainer: css({
    display: 'inline-flex',
    backgroundColor: 'var(--inner-content-background-color)',
    padding: '10px 10px 10px 8px',
    borderRadius: 'var(--border-radius)',
    width: '25%',
    minWidth: '150px',
    alignSelf: 'flex-start',
    justifyContent: 'space-around',
    '.rating-icon': {
      padding: '0',
      height: '20px',
      width: '20px',
      stroke: 'grey',
      strokeWidth: '30',
      transition: 'all .2s ease-in-out',
      ':hover': {
        transform: 'scale(1.35)',
        transition: 'all .1s ease-in-out',
        strokeWidth: '25',
        stroke: 'whitesmoke',
      },
    },
  }),
  label: css({
    cursor: 'pointer',
    color: 'lightgrey',
  }),
  radioInput: (i: number, elementClassName: string, iconColors: string[]) => {
    return css({
      // These are to hide the radio inputs.
      // https://www.w3schools.com/cssref/pr_pos_clip.asp
      clip: 'rect(0 0 0 0)',
      overflow: 'hidden',
      position: 'absolute',
      // the following values are just to make the hidden input not interfere
      height: '1px',
      margin: '0px',
      width: '1px',
      // & css nesting operator.
      // + css adyacent sibling selector.
      // [] are needed here to use template literals.
      [`.${elementClassName} &:checked + label`]: {
        color: iconColors[i],
        '.rating-icon': {
          '@keyframes bump': {
            '0%': {
              transform: 'scale(1)',
            },
            '30%': {
              transform: 'scale(1.7)',
            },
            '70%': {
              transform: 'scale(1.35)',
            },
            '100%': {
              transform: 'scale(1.5)',
            },
          },
          '@keyframes up': {
            '0%': {
              transform: 'translate(0, 0)',
            },
            '30%': {
              transform: `translate(0, -5px)`,
            },
            '100%': {
              transform: 'translate(0, 0), scale(1.4)',
            },
          },
          '@keyframes down': {
            '0%': {
              transform: 'translate(0, 0)',
            },
            '30%': {
              transform: `translate(0, 5px)`,
            },
            '100%': {
              transform: 'translate(0, 0), scale(1.4)',
            },
          },
          animation: `.3s linear ${i > 1 ? 'bump' : i > 0 ? 'up' : 'down'}`,
          transform: 'scale(1.5)',
          strokeWidth: '25',
          stroke: 'whitesmoke',
        },
      },
    });
  },
};

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
