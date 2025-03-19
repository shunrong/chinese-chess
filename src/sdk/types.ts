/**
 * 棋子颜色/阵营
 */
export enum PieceColor {
  RED = 'red',    // 红方
  BLACK = 'black' // 黑方
}

/**
 * 棋子类型
 */
export enum PieceType {
  KING = 'king',       // 将/帅
  ADVISOR = 'advisor', // 士/仕
  ELEPHANT = 'elephant', // 象/相
  HORSE = 'horse',     // 马
  CHARIOT = 'chariot', // 车
  CANNON = 'cannon',   // 炮
  PAWN = 'pawn'        // 兵/卒
}

/**
 * 坐标接口
 */
export interface Position {
  x: number; // 列（0-8）
  y: number; // 行（0-9）
}

/**
 * 移动接口
 */
export interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  capturedPiece?: Piece; // 被吃掉的棋子
}

/**
 * 棋子接口
 */
export interface Piece {
  id: string;
  type: PieceType;
  color: PieceColor;
  position: Position;
  name: string;
  canMoveTo(position: Position, board: Board): boolean;
}

/**
 * 棋盘接口
 */
export interface Board {
  pieces: Piece[];
  getPieceAt(position: Position): Piece | null;
  isValidMove(from: Position, to: Position): boolean;
  movePiece(from: Position, to: Position): Move | null;
  isCheck(color: PieceColor): boolean;
  isCheckmate(color: PieceColor): boolean;
}

/**
 * 游戏接口
 */
export interface Game {
  board: Board;
  currentPlayer: PieceColor;
  status: GameStatus;
  moves: Move[];
  makeMove(from: Position, to: Position): boolean;
  reset(): void;
  undo(): boolean;
}

/**
 * 游戏状态
 */
export enum GameStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  RED_WIN = 'red_win',
  BLACK_WIN = 'black_win',
  DRAW = 'draw'
} 