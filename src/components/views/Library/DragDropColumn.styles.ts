import { css } from '@emotion/react';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '130px',
    height: '100%',
    backgroundColor: 'var(--inner-content-background-color)',
    padding: '5px',
    borderRadius: 'var(--border-radius)',
    flex: '1 0 0',
  }),
  droppableGameColumnContainer: css({
    display: 'flex',
    // gap: '5px', // causes glitch with react-beautiful-dnd, replaced with margin-bottom on droppable.
    maxWidth: '800px',
    flex: '1 0 0', // grow 1 (~ height: 100%) is important so that draggables can be dropped along the entire droppable box height.
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }),
  title: css({
    padding: '0 0 5px 5px',
  }),
};

export default styles;