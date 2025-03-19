import { BasePiece } from './BasePiece';
import { PieceType, PieceColor, Position, Board, Piece } from '../types';

export class Advisor extends BasePiece {
  constructor(color: PieceColor, position: Position) {
    super(PieceType.ADVISOR, color, position);
  }

  // 这是遵循模板方法模式的正确实现
  protected isValidMove(position: Position, _board: Board, _targetPiece: Piece | null): boolean {
    // 士/仕只能斜线移动一格
    const dx = Math.abs(position.x - this.position.x);
    const dy = Math.abs(position.y - this.position.y);
    
    // 必须是对角线移动，且只能一格
    return dx === 1 && dy === 1;
  }

  protected isWithinBoundary(position: Position): boolean {
    // 基本边界检查
    if (!super.isWithinBoundary(position)) return false;
    
    // 宫内检查：x坐标在3-5之间
    if (position.x < 3 || position.x > 5) return false;
    
    // 红方士在底部(7-9)，黑方仕在顶部(0-2)
    if (this.color === PieceColor.RED) {
      return position.y >= 7 && position.y <= 9;
    } else {
      return position.y >= 0 && position.y <= 2;
    }
  }
} 