import { PieceType, PieceColor, Position, Piece } from '../types';
import { King } from './King';
import { Advisor } from './Advisor';
import { Elephant } from './Elephant';
import { Horse } from './Horse';
import { Chariot } from './Chariot';
import { Cannon } from './Cannon';
import { Pawn } from './Pawn';

/**
 * 创建指定类型和颜色的棋子
 */
export function createPiece(type: PieceType, color: PieceColor, position: Position): Piece {
  switch (type) {
    case PieceType.KING:
      return new King(color, position);
    case PieceType.ADVISOR:
      return new Advisor(color, position);
    case PieceType.ELEPHANT:
      return new Elephant(color, position);
    case PieceType.HORSE:
      return new Horse(color, position);
    case PieceType.CHARIOT:
      return new Chariot(color, position);
    case PieceType.CANNON:
      return new Cannon(color, position);
    case PieceType.PAWN:
      return new Pawn(color, position);
    default:
      throw new Error(`未知的棋子类型: ${type}`);
  }
} 