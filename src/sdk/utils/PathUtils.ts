import { Position, Board } from '../types';

// 路径检查工具类
export class PathUtils {
  // 检查直线路径上棋子的数量
  static countPiecesInPath(from: Position, to: Position, board: Board): number {
    let count = 0;
    
    // 横向路径
    if (from.y === to.y) {
      const minX = Math.min(from.x, to.x);
      const maxX = Math.max(from.x, to.x);
      
      for (let x = minX + 1; x < maxX; x++) {
        if (board.getPieceAt({ x, y: from.y })) {
          count++;
        }
      }
    } 
    // 纵向路径
    else if (from.x === to.x) {
      const minY = Math.min(from.y, to.y);
      const maxY = Math.max(from.y, to.y);
      
      for (let y = minY + 1; y < maxY; y++) {
        if (board.getPieceAt({ x: from.x, y })) {
          count++;
        }
      }
    }
    
    return count;
  }
  
  // 判断是否是直线移动
  static isStraightMove(from: Position, to: Position): boolean {
    return from.x === to.x || from.y === to.y;
  }
  
  // 判断是否是斜线移动
  static isDiagonalMove(from: Position, to: Position): boolean {
    return Math.abs(to.x - from.x) === Math.abs(to.y - from.y);
  }
} 