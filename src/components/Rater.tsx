/** @jsxImportSource @emotion/react */

import { FaStar, FaHeart } from 'react-icons/fa';
import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io';
import findGameInLibrary from '../utils/findGameInLibrary';
import { useMutation } from '@apollo/client';
import { ADD_TO_LIBRARY, UPDATE_RATING } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
import { ChangeEvent, useEffect } from 'react';
import useLazyCurrentUser from '../hooks/useLazyCurrentUser';
import { Spinner } from './styledComponentsLibrary';
import { MeResponse, GameInUserLibrary, Rating, User } from '../types';
import useAddToLibrary from '../hooks/useAddToLibrary';
import useUpdateRating from '../hooks/useUpdateRating';

// const Rater = ({ gameId }: { gameId: number }) => {
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

  // const {
  //   getCurrentUser,
  //   currentUser,
  //   loading: userLoading,
  //   error: getUserError,
  // } = useLazyCurrentUser();

  // useEffect(() => {
  //   getCurrentUser();
  //   // (async () => await getCurrentUser())();
  //   // }, [getCurrentUser]);
  // }, [updateRatingResult, addToLibraryResult]);

  console.log(
    '::In rater:: user: ',
    currentUser?.email,
    currentUser ? Object.keys(currentUser?.gamesInLibrary).length : undefined
  );

  // console.log('currentuser:', addingToLibrary, currentUser);

  const handleRatingChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const gameInUserLibrary = findGameInLibrary({
      gameId: gameId,
      user: currentUser,
    });

    const newRating = parseInt(event.target.value);

    console.log(
      '---------- Handling Change => gameInUserLibrary',
      gameInUserLibrary
    );

    if (!gameInUserLibrary) {
      console.log('parsedint:', newRating);
      // const newGame = await addGameToLibrary({
      const newGame = await addGameToLibrary({
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

      // gameInUserLibrary = findGameInLibrary({
      //   gameId: gameId,
      //   user: currentUser,
      // });

      ratingValue = newRating as Rating;

      console.log(
        '============================================================='
      );
      console.log('addedtolibrary: ', newGame);
      console.log('updated gameInUserLibrary', gameInUserLibrary);
      console.log(' user after:', currentUser);
      console.log(
        '============================================================='
      );
    } else {
      console.log('else');
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

  // let ratingValue = findGameInLibrary({ gameId, user: currentUser })?.rating;
  console.log('is rating undefined?', ratingValue);
  // // Extract game rating from me query.
  // const ratingValue = currentUser
  //   ? findGameInLibrary({ gameId, user: currentUser })?.rating
  //   : undefined;

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

  const elementClassName = `rating-${gameId}`;

  const icons = Array.from({ length: 4 }).map((_x, i) => {
    const inputId = `rating-input-${String(iconLevels[i].key)}`;

    return (
      <div key={iconLevels[i].key}>
        <input
          aria-label={inputId}
          name={elementClassName}
          type='radio'
          value={i}
          checked={i === ratingValue}
          onChange={handleRatingChange}
          id={inputId}
          css={[
            {
              // These are to hide the radio inputs.
              // https://www.w3schools.com/cssref/pr_pos_clip.asp
              clip: 'rect(0 0 0 0)',
              overflow: 'hidden',
              position: 'absolute',
              // the following values are just to make the hidden input not interfere
              height: '1px',
              margin: '0px',
              width: '1px',
            },
            {
              // & is Emotions nesting operator, :checked and + are vanilla css: https://www.w3schools.com/cssref/css_selectors.asp
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
                  animation: `.3s linear ${
                    i > 1 ? 'bump' : i > 0 ? 'up' : 'down'
                  }`,
                  transform: 'scale(1.5)',
                  strokeWidth: '25',
                  stroke: 'whitesmoke',
                },
              },
            },
          ]}
        />
        <label
          htmlFor={inputId}
          css={{
            cursor: 'pointer',
            color: 'lightgrey',
          }}
        >
          {iconLevels[i]}
        </label>
      </div>
    );
  });

  return (
    <div
      className={elementClassName}
      css={{
        display: 'flex',
        // alignItems: 'center',
        // alignItems: 'flex-start',
        marginTop: '20px',
        paddingBottom: '0px',
        justifySelf: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <span
        css={{
          display: 'inline-flex',
          background: 'whitesmoke',
          padding: '10px 10px 10px 8px',
          borderRadius: '8px',
          width: '25%',
          minWidth: '150px',
          // flexGrow: 0.25,
          // flex: '0 0 100%',
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
        }}
      >
        {/* {userLoading ? <Spinner /> : icons} */}
        {icons}
      </span>
      {
        /* getUserError  ||*/ (updateRatingError || addGameError) && (
          <div css={{ padding: '10px', color: 'red' }}>
            {
              /* getUserError?.message || */
              updateRatingError?.message ||
                addGameError?.message ||
                'Something went wrong.'
            }
          </div>
        )
      }
    </div>
  );
};

export default Rater;
