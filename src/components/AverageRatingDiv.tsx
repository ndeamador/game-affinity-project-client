/** @jsxImportSource @emotion/react */

const AverageRatingDiv = ({ rating }: { rating: number }) => {
  const rating100Scale = Math.round((rating * 100) / 3);
  const backgroundColor = (rating: number): string => {
    if (rating >= 85) return 'green';
    else if (rating >= 70) return 'yellowgreen';
    else if (rating >= 50) return 'gold';
    else if (rating >= 30) return 'orange';
    else return 'red';
  };

  return (
    <div
      className='AvgRatingDiv'
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        font: '20px sans-serif',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: backgroundColor(rating100Scale),
        width: '90px',
        height: '90px',
        // height: '100%',
        maxwidth: '90px',
        borderRadius: '8px',
        marginRight: '10px',
      }}
    >
      {rating100Scale}
    </div>
  );
};

export default AverageRatingDiv;
