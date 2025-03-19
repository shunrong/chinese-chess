import { BasePiece } from './BasePiece';
import { PieceType, PieceColor, Position, Board, Piece } from '../types';

export class Chariot extends BasePiece {
  constructor(color: PieceColor, position: Position) {
    super(PieceType.CHARIOT, color, position);
  }

  protected isValidMove(position: Position, board: Board, _targetPiece: Piece | null): boolean {
    // 车只能横向或纵向移动
    if (position.x !== this.position.x && position.y !== this.position.y) {
      return false;
    }
    
    // 检查路径上是否有其他棋子
    return !this.hasObstacleInPath(this.position, position, board);
  }
  
  // 辅助方法 - 检查直线路径上是否有障碍物
  private hasObstacleInPath(from: Position, to: Position, board: Board): boolean {
    // 横向移动
    if (from.y === to.y) {
      const minX = Math.min(from.x, to.x);
      const maxX = Math.max(from.x, to.x);
      
      for (let x = minX + 1; x < maxX; x++) {
        if (board.getPieceAt({ x, y: from.y })) {
          return true; // 路径上有障碍物
        }
      }
    } 
    // 纵向移动
    else if (from.x === to.x) {
      const minY = Math.min(from.y, to.y);
      const maxY = Math.max(from.y, to.y);
      
      for (let y = minY + 1; y < maxY; y++) {
        if (board.getPieceAt({ x: from.x, y })) {
          return true; // 路径上有障碍物
        }
      }
    }
    
    return false; // 路径上没有障碍物
  }
} 