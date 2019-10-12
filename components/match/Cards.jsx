export default ({ match }) => {
  if (!match.cards || match.cards.length === 0) {
    return null;
  }

  return (
    <div className="match__cards">
      <h2>Cards</h2>
      <p>
        {match.cards.map((event, index) => (
          <span key={index}>
            {event.name} {event.min}&apos; ({event.code})
          </span>
        ))}
      </p>
    </div>
  );
};
