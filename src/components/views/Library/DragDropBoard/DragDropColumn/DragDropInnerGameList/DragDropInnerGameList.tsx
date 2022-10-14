import { Game } from '../../../../../../types';
import DragDropGame from './DragDropGame/DragDropGame';
import React from 'react';

// This component is meant to improve drag/drop performance by avoiding unnecessary renders.
// https://egghead.io/lessons/react-optimize-performance-in-react-beautiful-dnd-with-shouldcomponentupdate-and-purecomponent
// a Pure Component renders the same output for the same state and props. It can only be used with class components. I use React.memo() instead (edit, moved memo to children)
// https://blog.logrocket.com/react-pure-components-functional/#functionalcomponentsvsclasscomponents

const DragDropInnerGameList = ({ games }: { games: Game[] }) => {
  return (
    <>
      {games.map((game, index) => (
        <DragDropGame key={game.id} game={game} index={index} />
      ))}
    </>
  );
};

export default React.memo(DragDropInnerGameList);
// export default DragDropInnerGameList;


// class DragDropInnerGameList extends React.PureComponent<{ games: Game[] }> {
//   render() {
//     const { games }: { games: Game[] } = this.props;
//     return (
//       <>
//         {games.map((game, index) => (
//           <DragDropGame key={game.id} game={game} index={index} />
//         ))}
//       </>
//     );
//   }
// }

// export default DragDropInnerGameList;
