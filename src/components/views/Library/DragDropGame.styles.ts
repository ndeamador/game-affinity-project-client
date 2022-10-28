import { css } from '@emotion/react';

const styles = {
  draggable: css({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '4rem',
    padding: '5px',
    border: 'solid 1px var(--color-gray20)',
    borderRadius: 'var(--border-radius)',
    backgroundColor: 'var(--dd-game-background-color)',
    marginBottom: '5px',
    transition: 'background-color 0.18s',
    '&:hover': {
      transition: 'none',
      backgroundColor: 'var(--color-gray10)',
    },
  }),
  isDragging: css({
    boxShadow: '4px 4px 15px 1px rgba(0, 0, 0, 0.2)', // h-offset, v-offset, blur, spread, color
  }),
  textDiv: css({
    display: 'flex',
    alignItems: 'flex-start',
    wordWrap: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  }),
  text: css({
    margin: '0 5px',
    textOverflow: 'ellipsis',
  }),
}

export default styles;