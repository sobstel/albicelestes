interface Props {
  match: any;
}

const Match = ({ match }: Props) => {
  return (
    <>
      <h3 className="mb-4 font-semibold">
        {match.competition_name} ({match.area_name}): {match.home_name} v{" "}
        {match.away_name} {match.ft.join("-")}
      </h3>
      <div className="mb-4">
        {match.players.map((player: any) => (
          <p key={player.id}>
            {player.name}
            {player.events.map((event: any) => (
              <span className="ml-2">
                {event.code} {event.min}'
              </span>
            ))}
          </p>
        ))}
      </div>
    </>
  );
};

export default Match;
