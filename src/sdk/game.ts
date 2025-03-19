import { Game, GameStatus, PieceColor, Position, Move, PieceType, Piece } from './types';
import { ChessBoard } from './board';

export class ChessGame implements Game {
  board: ChessBoard;
  currentPlayer: PieceColor;
  status: GameStatus;
  moves: Move[] = [];
  capturedPieces: Piece[] = [];

  constructor() {
    this.board = new ChessBoard();
    this.currentPlayer = PieceColor.RED; // 红方先行
    this.status = GameStatus.NOT_STARTED;
  }

  start(): void {
    this.reset();
    this.status = GameStatus.IN_PROGRESS;
  }

  reset(): void {
    this.board.reset();
    this.currentPlayer = PieceColor.RED;
    this.moves = [];
    this.capturedPieces = [];
    this.status = GameStatus.NOT_STARTED;
  }

  makeMove(from: Position, to: Position): boolean {
    // 检查游戏是否进行中
    if (this.status !== GameStatus.IN_PROGRESS) {
      return false;
    }

    // 检查是否轮到该玩家行动
    const piece = this.board.getPieceAt(from);
    if (!piece || piece.color !== this.currentPlayer) {
      return false;
    }

    // 检查目标位置是否有对方的将/帅
    const targetPiece = this.board.getPieceAt(to);
    const willCaptureKing = targetPiece && targetPiece.type === PieceType.KING;

    // 尝试移动棋子
    const move = this.board.movePiece(from, to);
    if (!move) {
      return false;
    }

    // 记录移动
    this.moves.push(move);

    // 记录被吃掉的棋子
    if (move.capturedPiece) {
      this.capturedPieces.unshift(move.capturedPiece); // 最新的在前面
    }

    // 如果吃掉了对方的将/帅，游戏结束
    if (willCaptureKing) {
      this.status = this.currentPlayer === PieceColor.RED ? GameStatus.RED_WIN : GameStatus.BLACK_WIN;
      return true;
    }

    // 切换玩家
    this.currentPlayer = this.currentPlayer === PieceColor.RED ? PieceColor.BLACK : PieceColor.RED;

    // 检查游戏状态
    if (this.board.isCheck(this.currentPlayer)) {
      if (this.board.isCheckmate(this.currentPlayer)) {
        this.status = this.currentPlayer === PieceColor.RED ? GameStatus.BLACK_WIN : GameStatus.RED_WIN;
      }
    }

    return true;
  }

  undo(): boolean {
    if (this.moves.length === 0) {
      return false;
    }

    // 待实现：悔棋逻辑
    // 暂不实现复杂的悔棋逻辑
    return false;
  }

  getCapturedPieces(): Piece[] {
    return [...this.capturedPieces]; // 返回副本防止外部修改
  }

  getCapturedPiecesByColor(color: PieceColor): Piece[] {
    return this.capturedPieces.filter(p => p.color === color);
  }
} 