/** @jsxImportSource @emotion/react */
import { Game } from '../types';
import { convertMilisecondsToDate } from '../utils/misc';

const ReleaseDeveloperRow = ({ game }: { game: Game }) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        '> *': {
          margin: '0',
        },
      }}
    >
      {game.first_release_date && (
        <p css={{ margin: 0 }}>
          {convertMilisecondsToDate(game.first_release_date).year}
        </p>
      )}

      {game.first_release_date && game.involved_companies && (
        <p css={{ padding: '0 5px' }}>-</p>
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
