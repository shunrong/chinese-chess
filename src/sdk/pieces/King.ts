import { BasePiece } from './BasePiece';
import { PieceType, PieceColor, Position, Board, Piece } from '../types';

export class King extends BasePiece {
  constructor(color: PieceColor, position: Position) {
    super(PieceType.KING, color, position);
  }

  // 修改 isValidMove 实现以处理特殊情况
  protected isValidMove(position: Position, board: Board, targetPiece: Piece | null): boolean {
    // 将/帅只能横向或纵向移动一格
    const dx = Math.abs(position.x - this.position.x);
    const dy = Math.abs(position.y - this.position.y);
    
    // 基本移动规则
    if (!((dx === 1 && dy === 0) || (dx === 0 && dy === 1))) {
      return false;
    }
    
    // 特殊规则：将军与对方的将相遇（隔山打牛）
    if (targetPiece && targetPiece.type === PieceType.KING) {
      // 只有在同一列才可能
      if (position.x === this.position.x) {
        // 检查两个将/帅之间是否有其他棋子
        let minY = Math.min(this.position.y, position.y);
        let maxY = Math.max(this.position.y, position.y);
        
        for (let y = minY + 1; y < maxY; y++) {
          if (board.getPieceAt({ x: position.x, y })) {
            return false; // 路径有阻挡，不能相遇
          }
        }
        return true; // 可以相遇（隔山打牛）
      }
    }
    
    return true; // 普通移动合法
  }

  protected isWithinBoundary(position: Position): boolean {
    // 基本边界检查
    if (!super.isWithinBoundary(position)) return false;
    
    // 宫内检查：x坐标在3-5之间
    if (position.x < 3 || position.x > 5) return false;
    
    // 红方将在底部(7-9)，黑方帅在顶部(0-2)
    if (this.color === PieceColor.RED) {
      return position.y >= 7 && position.y <= 9;
    } else {
      return position.y >= 0 && position.y <= 2;
    }
  }
} 