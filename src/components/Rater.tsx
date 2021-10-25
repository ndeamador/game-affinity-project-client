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

const Rater = ({ gameId }: { gameId: number }) => {
  // const { currentUser } = useAuthContext();
  // const {currentUser} = useCurrentUser();
  const {
    getCurrentUser,
    currentUser,
    loading,
    error: getUserError,
  } = useLazyCurrentUser();
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const [updateRating, { error: updateRatingError }] = useMutation(
    UPDATE_RATING,
    {
      refetchQueries: [{ query: CURRENT_USER }],
    }
  );
  const [addGameToLibrary, { error: addGameError }] = useMutation(
    ADD_TO_LIBRARY,
    {
      variables: { gameId: gameId },
      // refetchQueries: [{ query: CURRENT_USER }],
    }
  );

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

  // Extract game rating from me query.
  const ratingValue = currentUser
    ? findGameInLibrary({ gameId, user: currentUser })?.rating
    : undefined;
  console.log('rating: ', ratingValue);

  const elementClassName = `rating-${gameId}`;

  const handleRatingChange = async (event: ChangeEvent<HTMLInputElement>) => {
    findGameInLibrary({ gameId: gameId, user: currentUser }) ??
      (await addGameToLibrary()); // added await to prevent that backend does an update before the game is added.

    updateRating({
      variables: {
        gameId: gameId,
        rating: parseInt(event.target.value),
      },
    });
  };

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
        {loading ? <Spinner /> : icons}
      </span>
      {(getUserError || updateRatingError || addGameError) && (
        <div css={{ padding: '10px', color: 'red' }}>
          {getUserError?.message ||
            updateRatingError?.message ||
            addGameError?.message ||
            'Something went wrong.'}
        </div>
      )}
    </div>
  );
};

export default Rater;
