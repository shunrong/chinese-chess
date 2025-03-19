import { Piece, PieceType, PieceColor, Position, Board } from '../types';
import { PIECE_NAMES } from '../constants';
import { IdGenerator } from '../utils/IdGenerator';

export abstract class BasePiece implements Piece {
  id: string;
  type: PieceType;
  color: PieceColor;
  position: Position;
  name: string;

  constructor(type: PieceType, color: PieceColor, position: Position) {
    this.id = IdGenerator.getInstance().generate('piece');
    this.type = type;
    this.color = color;
    this.position = { ...position };
    this.name = PIECE_NAMES[color][type];
  }

  // 模板方法，包含通用逻辑
  canMoveTo(position: Position, board: Board): boolean {
    // 1. 基础通用检查
    if (this.position.x === position.x && this.position.y === position.y) {
      return false; // 不能移动到自己的位置
    }
    
    // 2. 目标位置是否已有己方棋子
    const targetPiece = board.getPieceAt(position);
    if (targetPiece && targetPiece.color === this.color) {
      return false; // 不能吃自己的棋子
    }
    
    // 3. 边界检查
    if (!this.isWithinBoundary(position)) {
      return false; // 超出该棋子活动范围
    }
    
    // 4. 调用子类实现的特定移动规则
    return this.isValidMove(position, board);
  }
  
  // 子类必须实现的方法 - 特定棋子的移动规则
  protected abstract isValidMove(position: Position, board: Board): boolean;
  
  // 边界检查 - 可被子类覆盖
  protected isWithinBoundary(position: Position): boolean {
    // 默认只检查是否在棋盘范围内
    return position.x >= 0 && position.x < 9 && position.y >= 0 && position.y < 10;
  }
} 