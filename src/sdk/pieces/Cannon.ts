import { BasePiece } from './BasePiece';
import { PieceType, PieceColor, Position, Board } from '../types';
import { PathUtils } from '../utils/PathUtils';

export class Cannon extends BasePiece {
  constructor(color: PieceColor, position: Position) {
    super(PieceType.CANNON, color, position);
  }

  protected isValidMove(position: Position, board: Board): boolean {
    // 炮只能直线移动
    if (!PathUtils.isStraightMove(this.position, position)) {
      return false;
    }

    const targetPiece = board.getPieceAt(position);
    
    // 路径上的棋子数量
    const piecesInPath = PathUtils.countPiecesInPath(this.position, position, board);
    
    // 移动时路径上不能有棋子
    if (!targetPiece && piecesInPath === 0) {
      return true;
    }
    
    // 吃子时路径上必须有且仅有一个棋子作为"炮架"
    return targetPiece !== null && piecesInPath === 1;
  }
} 