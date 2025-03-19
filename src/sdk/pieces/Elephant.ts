import { BasePiece } from './BasePiece';
import { PieceType, PieceColor, Position, Board, Piece } from '../types';

export class Elephant extends BasePiece {
  constructor(color: PieceColor, position: Position) {
    super(PieceType.ELEPHANT, color, position);
  }

  protected isValidMove(position: Position, board: Board, _targetPiece: Piece | null): boolean {
    // 象/相走田字，即横竖各走两格
    const dx = Math.abs(position.x - this.position.x);
    const dy = Math.abs(position.y - this.position.y);
    
    // 必须是对角线移动两格
    if (dx !== 2 || dy !== 2) {
      return false;
    }
    
    // 象/相不能蹩腿（检查田字中心点是否有棋子）
    const centerX = (position.x + this.position.x) / 2;
    const centerY = (position.y + this.position.y) / 2;
    
    return !board.getPieceAt({ x: centerX, y: centerY });
  }

  protected isWithinBoundary(position: Position): boolean {
    // 基本边界检查
    if (!super.isWithinBoundary(position)) return false;
    
    // 象/相不能过河
    if (this.color === PieceColor.RED) {
      // 红方在下半部分: y >= 5
      return position.y >= 5;
    } else {
      // 黑方在上半部分: y <= 4
      return position.y <= 4;
    }
  }
} 