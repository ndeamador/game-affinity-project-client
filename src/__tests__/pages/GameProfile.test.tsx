import '@testing-library/jest-dom/extend-expect';
// import {
//   render,
//   cleanup,
//   findByTestId,
//   findByText,
// } from '@testing-library/react';
// import { MockedProvider } from '@apollo/client/testing';
// import GameProfile from '../../pages/GameProfile';
// import { FIND_GAMES } from 'graphql/queries';
// import { MemoryRouter, Route } from 'react-router-dom';
// import { resultKeyNameFromField } from '@apollo/client/utilities';
// import { createContext } from 'react';

// const mocks = [
//   {
//     request: {
//       query: FIND_GAMES,
//       variables: {
//         variables: { id: 132 },
//       },
//     },
//     result: {
//       data: {
//         findGames: [
//           {
//             id: '132',
//             name: 'Warcraft III: Reign of Chaos',
//             summary:
//               'Warcraft 3: Reign of Chaos is an RTS made by Blizzard Entertainment. Take control of either the Humans, the Orcs, the Night Elves or the Undead, all with different unit types and heroes with unique abilities.Play the story driven single player campaign, go online to play default- or custom maps against people around the world or create your own maps with the map creation tool.',
//             first_release_date: 1025654400,
//             total_rating_count: 917,
//             cover: {
//               id: 90530,
//               image_id: 'co1xuq',
//             },
//             platforms: [
//               {
//                 id: 6,
//                 name: 'PC (Microsoft Windows)',
//                 platform_family: null,
//                 category: 4,
//               },
//               {
//                 id: 14,
//                 name: 'Mac',
//                 platform_family: null,
//                 category: 4,
//               },
//             ],
//             genres: [
//               {
//                 id: 11,
//                 name: 'Real Time Strategy (RTS)',
//               },
//               {
//                 id: 15,
//                 name: 'Strategy',
//               },
//             ],
//             involved_companies: [
//               {
//                 id: 8012,
//                 developer: true,
//                 company: {
//                   id: 51,
//                   name: 'Blizzard Entertainment',
//                 },
//               },
//               {
//                 id: 19472,
//                 developer: false,
//                 company: {
//                   id: 24,
//                   name: 'Sierra Entertainment',
//                 },
//               },
//               {
//                 id: 19473,
//                 developer: false,
//                 company: {
//                   id: 37,
//                   name: 'Capcom',
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     },
//   },
// ];

// const currentUser = {
//   email: 'test@test.com',
//   gamesInLibrary: [
//     {
//       id: '164',
//       igdb_game_id: 25076,
//       rating: null,
//     },
//     {
//       id: '166',
//       igdb_game_id: 132,
//       rating: null,
//     },
//     {
//       id: '196',
//       igdb_game_id: 853,
//       rating: null,
//     },
//     {
//       id: '183',
//       igdb_game_id: 133,
//       rating: null,
//     },
//   ],
// };

describe(`GameProfile`, () => {
  // test(`renders`, () => {
  //   const AuthContext = createContext(currentUser);

  //   const GameProfilePage = ({ gameId }: { gameId: number }) => {
  //     render(
  //       <MemoryRouter initialEntries={[`/games/${gameId}`]}>
  //         {/* https://reactrouter.com/web/api/MemoryRouter */}
  //         <Route path='/games/:gameId'>
  //           <MockedProvider mocks={mocks}>
  //             <AuthContext.Provider value={currentUser}>
  //               <GameProfile />
  //             </AuthContext.Provider>
  //           </MockedProvider>
  //         </Route>
  //       </MemoryRouter>
  //     );
  //   };

  //   expect(GameProfilePage({ gameId: 132 })).toHaveTextContent(
  //     'Warcraft III: Reign of Chaos'
  //   );
  // });

  test(`delete this test`, () => {
    expect(1 + 1).toBe(2);
  });
});
