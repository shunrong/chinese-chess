import { BasePiece } from './BasePiece';
import { PieceType, PieceColor, Position } from '../types';

export class Pawn extends BasePiece {
  constructor(color: PieceColor, position: Position) {
    super(PieceType.PAWN, color, position);
  }

  // 添加抽象方法实现
  protected isValidMove(position: Position): boolean {
    // 兵/卒移动规则
    const dx = Math.abs(position.x - this.position.x);
    const dy = position.y - this.position.y;
    
    // 红方向上移动(dy<0)，黑方向下移动(dy>0)
    const direction = this.color === PieceColor.RED ? -1 : 1;
    
    // 过河前只能向前移动一步
    if (!this.hasCrossedRiver()) {
      return dx === 0 && dy === direction;
    }
    
    // 过河后可以向前或向左右移动一步
    if (dx > 1 || Math.abs(dy) > 1) return false;
    
    // 不能后退
    if (dy * direction < 0) return false;
    
    // 不能同时横向和纵向移动
    return dx + Math.abs(dy) === 1;
  }

  private hasCrossedRiver(): boolean {
    if (this.color === PieceColor.RED) {
      // 红方兵过河：y < 5
      return this.position.y < 5;
    } else {
      // 黑方卒过河：y > 4
      return this.position.y > 4;
    }
  }
} 