/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from '@emotion/react';

const style = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  color: 'white',
  // backgroundColor: backgroundColor(rating100Scale),
  width: 'calc(var(--cover-width) - 25px)',
  borderRadius: 'var(--border-radius)',
  marginRight: '10px',
});

const backgroundColor: { [key: string]: SerializedStyles } = {
  green: css({
    backgroundColor: 'var(--color-green)',
  }),
  yellowgreen: css({
    backgroundColor: 'var(--color-yellowgreen)',
  }),
  gold: css({
    backgroundColor: 'var(--color-gold)',
  }),
  orange: css({
    backgroundColor: 'var(--color-orange)',
  }),
  red: css({
    backgroundColor: 'var(--color-danger)',
  }),
};

const AverageRatingDiv = ({ rating }: { rating: number }) => {
  const rating100Scale = Math.round((rating * 100) / 3);
  const getBackgroundColor = (rating: number): string => {
    if (rating >= 85) return 'green';
    else if (rating >= 70) return 'yellowgreen';
    else if (rating >= 50) return 'gold';
    else if (rating >= 30) return 'orange';
    else return 'red';
  };

  return (
    <div
      className='AvgRatingDiv'
      css={[style, backgroundColor[getBackgroundColor(rating100Scale)]]}
    >
      {rating100Scale}
    </div>
  );
};

export default AverageRatingDiv;
