# Poker Tutorial

This is a tutorial for learning JavaScript, React, and Redux by building out a half completed Poker application.

# Application Requirements

Parts of the application are already implemented and as part of the tutorial you'll fill in the missing pieces. The overall requirements for the application are as follows.

1. Provide data tracking for a poker game with any number of players
2. The game will implement XXXX style poker only
3. Each player will accordingly have 2 cards in their hand and up can utilize 3 out of 5 cards on the XXXX
4. Cards will be drawn to the XXXX in rounds with one round of betting between each draw
5. The game will implement multiple player inputs to facilitate gameplay--human, AI, and network
6. The poker display will show the human player's hand (if any human player) or the first AI player's hand if no human players, and the remaining players will be shown with hands face down only
7. The XXXX cards will be displayed as they are drawn
8. The application must accept bets from each player in succession for each turn
9. The data available to the AI at each betting round must be only what is naturally available in a game of poker--the cards on the XX, the bets from each player, but also the entire betting history of each player
10. At each hand, a player is nominally apointed dealer and bets start at that player's "left"
11. At each bet players choose to call???, raise, or bust
12. At the end of each hand, the computer must identify who is the winner and allocate the pot to that user (or split amongst users as appropriate)
13. Gameplay with AI users shall have configurable delays between bets and actions to allow someone to watch the game in real time and follow along

# Implementation Guidelines

1. The application is a React/Redux application with a Node back end
2. Appropriate JavaScript libraries are already included and learners should not add additional libraries
3. Redux stores keep track of data generated during gameplay, user input, and data received from the server (if connected)
4. Selectors must be used when needed to combine data from various stores
5. React views will be pure views with no business or hardly any display logic--all logic off loaded to selectors
6. User input will be handled directly through Redux actions--no third party libraries for input or form management
7. User input must be appropriately validated wherever appropriate
8. The application will be implemented with EcmaScript 2016 and run on Node 8 and latest Chrome/Firefox only
9. Based on these environment restrictions no transpilation will be needed
10. Learners should follow directed best practices and use latest ES6/7/8 paradigms when available and appropriate

# Tutorial progression

The structure and important parts of the application are already implemented. The tutorial will guide learners through filling in specific parts in order to learn highlights JavaScript, React, and Redux in that order.

This tutorial is designed for experienced developers that have a strong understanding of programming concepts and some other programming language, and are learning JavaScript, React, and Redux.

# Git flow

1. Learners should fork the repository to their personal GitHub accounts
2. Each learner should checkout the `start` branch
3. Each learner should make changes and commit and push to their fork as they go

# Application structure and initial status


