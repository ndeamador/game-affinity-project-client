/** @jsxImportSource @emotion/react */

import { Droppable } from 'react-beautiful-dnd';

// 'provided.innerRef' is used to supply the DOM node of the component to beautiful-dnd
// 'provided.placeholder' is a React element used to increase the available space during a drag. Needs to be a child of the component designated as droppable.

const DragDropDeleteBox = () => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        // minHeight: '130px',
        height: '65px',
        minHeight: '65px',
        backgroundColor: 'lightcoral',
        padding: '5px',
        borderRadius: '5px',
        flex: '1 0 0',
        // border: 'solid 1px black',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Droppable droppableId='deleteBox'>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            css={{
              display: 'flex',
              flexDirection: 'row',
              maxWidth: '800px',
              flex: '1 0 0', // grow 1 (~ height: 100%) is important so that draggables can be dropped along the entire droppable box height.
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            {/* <h3>Delete</h3> */}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DragDropDeleteBox;
