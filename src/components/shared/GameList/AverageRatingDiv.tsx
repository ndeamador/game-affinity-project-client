/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from '@emotion/react';
import styles from './AverageRatingDiv.styles';

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
  const rating100Scale = Math.round(((rating - 1) * 100) / (4 - 1)); // both -1 are to adapt the average to the new 1-4 scale;
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
      css={[
        styles.container,
        backgroundColor[getBackgroundColor(rating100Scale)],
      ]}
    >
      {rating100Scale}
    </div>
  );
};

export default AverageRatingDiv;
