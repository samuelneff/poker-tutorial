/**
 * Given the array of players, returns the players that are still active.
 *
 * @param {Player[]} players 
 */
export default function filterAvailablePlayers(players) {
  return players.filter(p => !p.playerBusted && !p.playerFolded);
}
