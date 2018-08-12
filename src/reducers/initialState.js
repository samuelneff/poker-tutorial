/**
 * @constant
 * @type {InitialState}
 */
const initialState = {
  players: ["Sam", "Charlotte", "Caitlin", "Cole", "Caden", "Claire"].map(
    (playerName, playerIndex) => ({
      playerIndex,
      playerName,
      holdCards: []
    })
  )
};

export default initialState;
