import getPlayers from './getPlayers';

it('should return players with names', async () => {
  const players = await getPlayers();
  expect(Array.isArray(players)).toBeTruthy();
  expect(players.length).toBeGreaterThan(0);
  expect(players[0].playerName).not.toBeUndefined();
});
