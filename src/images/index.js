/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import avatar0Url from './Avatar0.png';
import avatar1Url from './Avatar1.png';
import avatar2Url from './Avatar2.png';
import avatar3Url from './Avatar3.png';
import avatar4Url from './Avatar4.png';
import avatar5Url from './Avatar5.png';

import CardBack01 from './CardBack01.svg';
import CardBack02 from './CardBack02.svg';
import CardBack03 from './CardBack03.svg';
import CardBack04 from './CardBack04.svg';
import CardBack05 from './CardBack05.svg';
import CardBack06 from './CardBack06.svg';
import CardBack07 from './CardBack07.svg';
import Chip005 from './Chip005.svg';
import Chip010 from './Chip010.svg';
import Chip025 from './Chip025.svg';
import Chip100 from './Chip100.svg';
import ChipDealer from './ChipDealer.svg';
import MarkerAllIn from './MarkerAllIn.svg';
import MarkerBigBlind from './MarkerBigBlind.svg';
import MarkerSmallBlind from './MarkerSmallBlind.svg';

import Card2C from './cards/2C.svg';
import Card2D from './cards/2D.svg';
import Card2H from './cards/2H.svg';
import Card2S from './cards/2S.svg';
import Card3C from './cards/3C.svg';
import Card3D from './cards/3D.svg';
import Card3H from './cards/3H.svg';
import Card3S from './cards/3S.svg';
import Card4C from './cards/4C.svg';
import Card4D from './cards/4D.svg';
import Card4H from './cards/4H.svg';
import Card4S from './cards/4S.svg';
import Card5C from './cards/5C.svg';
import Card5D from './cards/5D.svg';
import Card5H from './cards/5H.svg';
import Card5S from './cards/5S.svg';
import Card6C from './cards/6C.svg';
import Card6D from './cards/6D.svg';
import Card6H from './cards/6H.svg';
import Card6S from './cards/6S.svg';
import Card7C from './cards/7C.svg';
import Card7D from './cards/7D.svg';
import Card7H from './cards/7H.svg';
import Card7S from './cards/7S.svg';
import Card8C from './cards/8C.svg';
import Card8D from './cards/8D.svg';
import Card8H from './cards/8H.svg';
import Card8S from './cards/8S.svg';
import Card9C from './cards/9C.svg';
import Card9D from './cards/9D.svg';
import Card9H from './cards/9H.svg';
import Card9S from './cards/9S.svg';
import Card0C from './cards/0C.svg';
import Card0D from './cards/0D.svg';
import Card0H from './cards/0H.svg';
import Card0S from './cards/0S.svg';
import CardJC from './cards/JC.svg';
import CardJD from './cards/JD.svg';
import CardJH from './cards/JH.svg';
import CardJS from './cards/JS.svg';
import CardQC from './cards/QC.svg';
import CardQD from './cards/QD.svg';
import CardQH from './cards/QH.svg';
import CardQS from './cards/QS.svg';
import CardKC from './cards/KC.svg';
import CardKD from './cards/KD.svg';
import CardKH from './cards/KH.svg';
import CardKS from './cards/KS.svg';
import CardAC from './cards/AC.svg';
import CardAD from './cards/AD.svg';
import CardAH from './cards/AH.svg';
import CardAS from './cards/AS.svg';

const Avatar0 = ({className}) =>
  <img className={className || ''}
       src={avatar0Url} />;

const Avatar1 = ({className}) =>
  <img className={className || ''}
       src={avatar1Url} />;

const Avatar2 = ({className}) =>
  <img className={className || ''}
       src={avatar2Url} />;

const Avatar3 = ({className}) =>
  <img className={className || ''}
       src={avatar3Url} />;

const Avatar4 = ({className}) =>
  <img className={className || ''}
       src={avatar4Url} />;

const Avatar5 = ({className}) =>
  <img className={className || ''}
       src={avatar5Url} />;

export {
  Avatar0,
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,

  CardBack01,
  CardBack02,
  CardBack03,
  CardBack04,
  CardBack05,
  CardBack06,
  CardBack07,
  Chip005,
  Chip010,
  Chip025,
  Chip100,
  ChipDealer,
  MarkerAllIn,
  MarkerBigBlind,
  MarkerSmallBlind,

  Card2C,
  Card2D,
  Card2H,
  Card2S,
  Card3C,
  Card3D,
  Card3H,
  Card3S,
  Card4C,
  Card4D,
  Card4H,
  Card4S,
  Card5C,
  Card5D,
  Card5H,
  Card5S,
  Card6C,
  Card6D,
  Card6H,
  Card6S,
  Card7C,
  Card7D,
  Card7H,
  Card7S,
  Card8C,
  Card8D,
  Card8H,
  Card8S,
  Card9C,
  Card9D,
  Card9H,
  Card9S,
  Card0C,
  Card0D,
  Card0H,
  Card0S,
  CardJC,
  CardJD,
  CardJH,
  CardJS,
  CardQC,
  CardQD,
  CardQH,
  CardQS,
  CardKC,
  CardKD,
  CardKH,
  CardKS,
  CardAC,
  CardAD,
  CardAH,
  CardAS
};

/*
import cardBack01Url from './CardBack01.svg';
import cardBack02Url from './CardBack02.svg';
import cardBack03Url from './CardBack03.svg';
import cardBack04Url from './CardBack04.svg';
import cardBack05Url from './CardBack05.svg';
import cardBack06Url from './CardBack06.svg';
import cardBack07Url from './CardBack07.svg';
import chip005Url from './Chip005.svg';
import chip010Url from './Chip010.svg';
import chip025Url from './Chip025.svg';
import chip100Url from './Chip100.svg';
import chipDealerUrl from './ChipDealer.svg';
import markerAllInUrl from './MarkerAllIn.svg';
import markerBigBlindUrl from './MarkerBigBlind.svg';
import markerSmallBlindUrl from './MarkerSmallBlind.svg';

import card2CUrl from './cards/2C.svg';
import card2DUrl from './cards/2D.svg';
import card2HUrl from './cards/2H.svg';
import card2SUrl from './cards/2S.svg';
import card3CUrl from './cards/3C.svg';
import card3DUrl from './cards/3D.svg';
import card3HUrl from './cards/3H.svg';
import card3SUrl from './cards/3S.svg';
import card4CUrl from './cards/4C.svg';
import card4DUrl from './cards/4D.svg';
import card4HUrl from './cards/4H.svg';
import card4SUrl from './cards/4S.svg';
import card5CUrl from './cards/5C.svg';
import card5DUrl from './cards/5D.svg';
import card5HUrl from './cards/5H.svg';
import card5SUrl from './cards/5S.svg';
import card6CUrl from './cards/6C.svg';
import card6DUrl from './cards/6D.svg';
import card6HUrl from './cards/6H.svg';
import card6SUrl from './cards/6S.svg';
import card7CUrl from './cards/7C.svg';
import card7DUrl from './cards/7D.svg';
import card7HUrl from './cards/7H.svg';
import card7SUrl from './cards/7S.svg';
import card8CUrl from './cards/8C.svg';
import card8DUrl from './cards/8D.svg';
import card8HUrl from './cards/8H.svg';
import card8SUrl from './cards/8S.svg';
import card9CUrl from './cards/9C.svg';
import card9DUrl from './cards/9D.svg';
import card9HUrl from './cards/9H.svg';
import card9SUrl from './cards/9S.svg';
import card0CUrl from './cards/0C.svg';
import card0DUrl from './cards/0D.svg';
import card0HUrl from './cards/0H.svg';
import card0SUrl from './cards/0S.svg';
import cardJCUrl from './cards/JC.svg';
import cardJDUrl from './cards/JD.svg';
import cardJHUrl from './cards/JH.svg';
import cardJSUrl from './cards/JS.svg';
import cardQCUrl from './cards/QC.svg';
import cardQDUrl from './cards/QD.svg';
import cardQHUrl from './cards/QH.svg';
import cardQSUrl from './cards/QS.svg';
import cardKCUrl from './cards/KC.svg';
import cardKDUrl from './cards/KD.svg';
import cardKHUrl from './cards/KH.svg';
import cardKSUrl from './cards/KS.svg';
import cardACUrl from './cards/AC.svg';
import cardADUrl from './cards/AD.svg';
import cardAHUrl from './cards/AH.svg';
import cardASUrl from './cards/AS.svg';

export const CardBack01 = ({className}) =>
  <img className={className || ''}
       src={cardBack01Url} />;

export const CardBack02 = ({className}) =>
  <img className={className || ''}
       src={cardBack02Url} />;

export const CardBack03 = ({className}) =>
  <img className={className || ''}
       src={cardBack03Url} />;

export const CardBack04 = ({className}) =>
  <img className={className || ''}
       src={cardBack04Url} />;

export const CardBack05 = ({className}) =>
  <img className={className || ''}
       src={cardBack05Url} />;

export const CardBack06 = ({className}) =>
  <img className={className || ''}
       src={cardBack06Url} />;

export const CardBack07 = ({className}) =>
  <img className={className || ''}
       src={cardBack07Url} />;

export const Chip005 = ({className}) =>
  <img className={className || ''}
       src={chip005Url} />;

export const Chip010 = ({className}) =>
  <img className={className || ''}
       src={chip010Url} />;

export const Chip025 = ({className}) =>
  <img className={className || ''}
       src={chip025Url} />;

export const Chip100 = ({className}) =>
  <img className={className || ''}
       src={chip100Url} />;

export const ChipDealer = ({className}) =>
  <img className={className || ''}
       src={chipDealerUrl} />;

export const MarkerAllIn = ({className}) =>
  <img className={className || ''}
       src={markerAllInUrl} />;

export const MarkerBigBlind = ({className}) =>
  <img className={className || ''}
       src={markerBigBlindUrl} />;

export const MarkerSmallBlind = ({className}) =>
  <img className={className || ''}
       src={markerSmallBlindUrl} />;

export const Card2C = ({className}) =>
  <img className={className || ''}
       src={card2CUrl} />;

export const Card2D = ({className}) =>
  <img className={className || ''}
       src={card2DUrl} />;

export const Card2H = ({className}) =>
  <img className={className || ''}
       src={card2HUrl} />;

export const Card2S = ({className}) =>
  <img className={className || ''}
       src={card2SUrl} />;

export const Card3C = ({className}) =>
  <img className={className || ''}
       src={card3CUrl} />;

export const Card3D = ({className}) =>
  <img className={className || ''}
       src={card3DUrl} />;

export const Card3H = ({className}) =>
  <img className={className || ''}
       src={card3HUrl} />;

export const Card3S = ({className}) =>
  <img className={className || ''}
       src={card3SUrl} />;

export const Card4C = ({className}) =>
  <img className={className || ''}
       src={card4CUrl} />;

export const Card4D = ({className}) =>
  <img className={className || ''}
       src={card4DUrl} />;

export const Card4H = ({className}) =>
  <img className={className || ''}
       src={card4HUrl} />;

export const Card4S = ({className}) =>
  <img className={className || ''}
       src={card4SUrl} />;

export const Card5C = ({className}) =>
  <img className={className || ''}
       src={card5CUrl} />;

export const Card5D = ({className}) =>
  <img className={className || ''}
       src={card5DUrl} />;

export const Card5H = ({className}) =>
  <img className={className || ''}
       src={card5HUrl} />;

export const Card5S = ({className}) =>
  <img className={className || ''}
       src={card5SUrl} />;

export const Card6C = ({className}) =>
  <img className={className || ''}
       src={card6CUrl} />;

export const Card6D = ({className}) =>
  <img className={className || ''}
       src={card6DUrl} />;

export const Card6H = ({className}) =>
  <img className={className || ''}
       src={card6HUrl} />;

export const Card6S = ({className}) =>
  <img className={className || ''}
       src={card6SUrl} />;

export const Card7C = ({className}) =>
  <img className={className || ''}
       src={card7CUrl} />;

export const Card7D = ({className}) =>
  <img className={className || ''}
       src={card7DUrl} />;

export const Card7H = ({className}) =>
  <img className={className || ''}
       src={card7HUrl} />;

export const Card7S = ({className}) =>
  <img className={className || ''}
       src={card7SUrl} />;

export const Card8C = ({className}) =>
  <img className={className || ''}
       src={card8CUrl} />;

export const Card8D = ({className}) =>
  <img className={className || ''}
       src={card8DUrl} />;

export const Card8H = ({className}) =>
  <img className={className || ''}
       src={card8HUrl} />;

export const Card8S = ({className}) =>
  <img className={className || ''}
       src={card8SUrl} />;

export const Card9C = ({className}) =>
  <img className={className || ''}
       src={card9CUrl} />;

export const Card9D = ({className}) =>
  <img className={className || ''}
       src={card9DUrl} />;

export const Card9H = ({className}) =>
  <img className={className || ''}
       src={card9HUrl} />;

export const Card9S = ({className}) =>
  <img className={className || ''}
       src={card9SUrl} />;

export const Card0C = ({className}) =>
  <img className={className || ''}
       src={card0CUrl} />;

export const Card0D = ({className}) =>
  <img className={className || ''}
       src={card0DUrl} />;

export const Card0H = ({className}) =>
  <img className={className || ''}
       src={card0HUrl} />;

export const Card0S = ({className}) =>
  <img className={className || ''}
       src={card0SUrl} />;

export const CardJC = ({className}) =>
  <img className={className || ''}
       src={cardJCUrl} />;

export const CardJD = ({className}) =>
  <img className={className || ''}
       src={cardJDUrl} />;

export const CardJH = ({className}) =>
  <img className={className || ''}
       src={cardJHUrl} />;

export const CardJS = ({className}) =>
  <img className={className || ''}
       src={cardJSUrl} />;

export const CardQC = ({className}) =>
  <img className={className || ''}
       src={cardQCUrl} />;

export const CardQD = ({className}) =>
  <img className={className || ''}
       src={cardQDUrl} />;

export const CardQH = ({className}) =>
  <img className={className || ''}
       src={cardQHUrl} />;

export const CardQS = ({className}) =>
  <img className={className || ''}
       src={cardQSUrl} />;

export const CardKC = ({className}) =>
  <img className={className || ''}
       src={cardKCUrl} />;

export const CardKD = ({className}) =>
  <img className={className || ''}
       src={cardKDUrl} />;

export const CardKH = ({className}) =>
  <img className={className || ''}
       src={cardKHUrl} />;

export const CardKS = ({className}) =>
  <img className={className || ''}
       src={cardKSUrl} />;

export const CardAC = ({className}) =>
  <img className={className || ''}
       src={cardACUrl} />;

export const CardAD = ({className}) =>
  <img className={className || ''}
       src={cardADUrl} />;

export const CardAH = ({className}) =>
  <img className={className || ''}
       src={cardAHUrl} />;

export const CardAS = ({className}) =>
  <img className={className || ''}
       src={cardASUrl} />;
*/
