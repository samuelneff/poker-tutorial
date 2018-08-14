import handSorter from './handSorter';
/**
 * Given a list of players, finds which of them are the winners. Since there can be a tie more than one player
 * can be returned in the winners array.
 * @param {Player[]} players
 * @returns {Player[]}
 */
export default function findWinners(players) {
  const winners = [];

  players.forEach(evaluateIfWinner);

  return winners;

  function evaluateIfWinner(player) {
    if (winners.length === 0) {
      winners.push(player);
      return;
    }

    const compared = handSorter(winners[0].playerHand, player.playerHand);
    if (compared < 0) {
      return;
    }

    if (compared === 0) {
      winners.push(player);
    }

    winners.length = 0;
    winners.push(player);
  }
}
