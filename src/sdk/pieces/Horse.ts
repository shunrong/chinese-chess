import { BasePiece } from './BasePiece';
import { PieceType, PieceColor, Position, Board } from '../types';

export class Horse extends BasePiece {
  constructor(color: PieceColor, position: Position) {
    super(PieceType.HORSE, color, position);
  }

  // 添加抽象方法实现
  protected isValidMove(position: Position, board: Board): boolean {
    // 马走"日"字，横走一步再斜走一步或纵走一步再斜走一步
    const dx = Math.abs(position.x - this.position.x);
    const dy = Math.abs(position.y - this.position.y);
    
    // 检查是否符合马走"日"字的规则
    if (!((dx === 1 && dy === 2) || (dx === 2 && dy === 1))) {
      return false;
    }
    
    // 检查马脚是否被绊住
    return !this.isHobbled(position, board);
  }

  // 需要添加这个辅助方法
  private isHobbled(position: Position, board: Board): boolean {
    // 检查马脚（蹩腿）
    // 水平方向移动
    const dx = Math.abs(position.x - this.position.x);
    if (dx === 2) {
      const footX = this.position.x > position.x ? this.position.x - 1 : this.position.x + 1;
      return !!board.getPieceAt({ x: footX, y: this.position.y });
    } 
    // 垂直方向移动
    else {
      const footY = this.position.y > position.y ? this.position.y - 1 : this.position.y + 1;
      return !!board.getPieceAt({ x: this.position.x, y: footY });
    }
  }
} 