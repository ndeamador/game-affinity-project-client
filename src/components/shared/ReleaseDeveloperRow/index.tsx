/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Game } from '../../../types';
import { convertMilisecondsToDate } from '../../../utils/misc';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    lineHeight: 1.2,
    marginBottom: '6px',
    '> *': {
      margin: '0',
    },
  }),
  separator: css({ padding: '0 5px' }),
};

const ReleaseDeveloperRow = ({ game }: { game: Game }) => {
  return (
    <div css={styles.container}>
      {game.first_release_date && (
        <p css={{ margin: 0 }}>
          {convertMilisecondsToDate(game.first_release_date).year}
        </p>
      )}

      {game.first_release_date && game.involved_companies && (
        <p css={styles.separator}>-</p>
      )}

      {game.involved_companies &&
        game.involved_companies.map((involvedCompany) => {
          if (involvedCompany.developer)
            return (
              <p key={involvedCompany.id}>{involvedCompany.company.name}</p>
            );
        })}
    </div>
  );
};

export default ReleaseDeveloperRow;
