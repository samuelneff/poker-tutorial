/**
 * Given a current player index and list of players, returns the next player index; zero
 * if current is null or at end of list, and current plus one otherwise. Skips busted players.
 * 
 * @param {number|null} currentIndex
 * @param {Player[]} players
*/
export default function nextPlayerIndex(currentIndex, players) {
  const availablePlayers = players.filter(p => !p.playerBusted);
  if (availablePlayers.length < 2) {
    throw new Error(`Cannot get next player when there ${availablePlayers.length === 0 ? 'are no players' : 'is only one player'} remaining.`);
  }
  const nextPlayer = currentIndex === null
    ? null
    : availablePlayers.find(player => player.playerIndex > currentIndex);
  return (nextPlayer || availablePlayers[0]).playerIndex;
}