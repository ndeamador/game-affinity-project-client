import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import ReactDOM from 'react-dom';

// backdrop-filter causes draggable items to offset out of place, this is a workaround for the bug.
// https://github.com/atlassian/react-beautiful-dnd/issues/499#issuecomment-867282432

const DraggablePortalHandler = ({
  children,
  snapshot,
}: {
  children: JSX.Element;
  snapshot: DraggableStateSnapshot;
}) => {
  if (snapshot.isDragging)
    return ReactDOM.createPortal(children, document.body);
  return children;
};

export default DraggablePortalHandler;
