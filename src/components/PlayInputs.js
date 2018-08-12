import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import newDeck from '../utils/newDeck';
import * as actions from '../redux/actions';
import asyncForEach from '../utils/asyncForEach';
import { 
  BIG_BLIND_AMOUNT,
  PLAY_LAG_MILLISECONDS,
  SMALL_BLIND_AMOUNT
} from '../utils/constants';
import filterAvailablePlayers from '../utils/filterAvailablePlayers';
import nextPlayerIndex from '../utils/nextPlayerIndex';
import timeout from '../utils/timeout';

export class PlayInputs extends Component {

  constructor() {
    super();
    this.state = {
      raiseAmount: BIG_BLIND_AMOUNT
    }
  };

  startNewGame = () => {
    const {
      actions: {
        communityCardsUpdate,
        dealerPlayerIndexUpdate,
        deckUpdate,
        inTurnPlayerIndexUpdate,
        playerAdd,
        playersClear,
        potUpdate
      }
    } = this.props;
    
    communityCardsUpdate([]);
    dealerPlayerIndexUpdate(null);
    deckUpdate(newDeck());
    inTurnPlayerIndexUpdate(0);
    playersClear();
    ["Sam", "Charlotte", "Caitlin", "Cole", "Caden", "Claire"].forEach(
      (playerName, playerIndex) =>
        playerAdd(
          {
            playerIndex,
            playerName,            
            playerBank: 1000,
            playerBet: 0,
            holeCards: [],
            playerBusted: false
          })
    );
    potUpdate(0);
  }

  startNewDeal = async () => {
    const {
      actions: {
        betsClear,
        cardDealToPlayer,
        communityCardsUpdate,
        dealerPlayerIndexUpdate,
        deckUpdate,
        inTurnPlayerIndexUpdate,
        playerAdd,
        playersClear
      },
      dealerPlayerIndex,
      inTurnPlayerIndex,
      players
    } = this.props;

    await this.clearDeal();
    await timeout(PLAY_LAG_MILLISECONDS);
    await this.rotateDealer();
    await timeout(PLAY_LAG_MILLISECONDS);
    await this.dealCards();
    await timeout(PLAY_LAG_MILLISECONDS);
    await this.runBlind(SMALL_BLIND_AMOUNT);
    await timeout(PLAY_LAG_MILLISECONDS);
    await this.runBlind(BIG_BLIND_AMOUNT);
    await timeout(PLAY_LAG_MILLISECONDS);
    this.startThisDeal();
  }

  clearDeal = async () => {
    const {
      actions: {
        betsClear,
        communityCardsUpdate,
        deckUpdate,
      }
    } = this.props;

    betsClear();
    communityCardsUpdate([]);
    deckUpdate(newDeck());
  }

  rotateDealer = async () => {
    const {
      actions: {
        dealerPlayerIndexUpdate,
        inTurnPlayerIndexUpdate,
      },
      dealerPlayerIndex,
      players
    } = this.props;

    const newDealerIndex = nextPlayerIndex(dealerPlayerIndex, players);
    dealerPlayerIndexUpdate(newDealerIndex);
    inTurnPlayerIndexUpdate(newDealerIndex);
  }

  dealCards = async () => {
    const {
      actions: {
        cardDealToCommunity,
        cardDealToPlayer
      },
      dealerPlayerIndex,
      players
    } = this.props;

    const availablePlayers = filterAvailablePlayers(players);
    const playersLeftOfDealer = availablePlayers.filter(player => player.playerIndex > dealerPlayerIndex);
    const playersRightOfDealer = availablePlayers.filter(player => player.playerIndex <= dealerPlayerIndex);
    const dealOrderPlayers = [].concat(
      playersLeftOfDealer,
      playersRightOfDealer,
      playersLeftOfDealer,
      playersRightOfDealer
    );

    await asyncForEach(
      dealOrderPlayers,
      async player => {
        // cannot destructure outside lambda since we're in async
        const { deck } = this.props;
        cardDealToPlayer(player, deck[0]);
        await timeout(PLAY_LAG_MILLISECONDS)
      }
    );

    await timeout(PLAY_LAG_MILLISECONDS)
    cardDealToCommunity(this.props.deck[0]);
    await timeout(PLAY_LAG_MILLISECONDS)
    cardDealToCommunity(this.props.deck[0]);
  }

  runBlind = async blindAmount => {
    const {
      actions: {
        betUpdate,
        inTurnPlayerIndexUpdate
      },
      bustPlayer,
      inTurnPlayerIndex,
      players
    } = this.props;
    const blindIndex = nextPlayerIndex(inTurnPlayerIndex, players);
    const blindPlayer = players[blindIndex];
    
    inTurnPlayerIndexUpdate(blindIndex);

    if (blindPlayer.playerBank < blindAmount) {
      bustPlayer(blindPlayer);
      await timeout(PLAY_LAG_MILLISECONDS);
      await this.runBlind(blindAmount);
      return;
    }

    betUpdate(blindPlayer, blindAmount);
  }

  startThisDeal = async () => {
    const {
      actions: {
        inTurnPlayerIndexUpdate
      },
      inTurnPlayerIndex,
      players
    } = this.props;
    const nextIndex = nextPlayerIndex(inTurnPlayerIndex, players);
    inTurnPlayerIndexUpdate(nextIndex);
  }

  betCall = () => {
    const {
      currentBet
    } = this.props;
    this.placeBet(currentBet);
  }

  betFold = () => {
    const {
      actions: {
        inTurnPlayerIndexUpdate
      },
      inTurnPlayerIndex,
      players
    } = this.props;
    inTurnPlayerIndexUpdate(nextPlayerIndex(inTurnPlayerIndex, players));
  }

  betRaise = () => {
    const {
      currentBet
    } = this.props;
    const {
      raiseAmount
    } = this.state;    
    this.placeBet(currentBet + raiseAmount);
  };

  placeBet = amount => {
    const {
      actions: {
        betUpdate,
        inTurnPlayerIndexUpdate
      },
      inTurnPlayerIndex,
      players
    } = this.props;

    const betPlayer = players[inTurnPlayerIndex];

    if (betPlayer.playerBank < amount) {
      return;
    }

    betUpdate(betPlayer, amount);
    inTurnPlayerIndexUpdate(nextPlayerIndex(inTurnPlayerIndex, players));
  }

  setRaiseAmount = raiseAmount => {
    this.setState( { raiseAmount } );
  };

  dealNextCommunityCard = () => {
    const {
      actions: {
        cardDealToCommunity
      },
      deck
    } = this.props;
    cardDealToCommunity(deck[0]);
  };

  render() {
    const {
      currentBet
    } = this.props;
    const {
      raiseAmount
    } = this.state;
    return (
      <div className="player-input">
        <div>PlayInputs</div>
        <div className="interim-data">
          <div>
            <button onClick={this.startNewGame}>New Game</button>
            <button onClick={this.startNewDeal}>New Deal</button>
          </div>
          <div>
            <span>Bet: {currentBet} </span>
            <button onClick={this.betCall}>Call</button>
            <input type="decimal"
                   onChange={event => this.setRaiseAmount(parseInt(event.target.value))}
                   onKeyPress={event => event.code === 'Enter' && this.betRaise()}
                   value={raiseAmount}
                   />
            <button onClick={this.betRaise}>Raise</button>
            <button onClick={this.betFold}>Fold</button>
          </div>
          <div>
            <button onClick={this.dealNextCommunityCard}>Next Card</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {    
    dealerPlayerIndex,
    deck,
    inTurnPlayerIndex,
    currentBet,
    players
  } = state;
  return {
    dealerPlayerIndex,
    deck,
    inTurnPlayerIndex,
    currentBet,
    players
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayInputs)

