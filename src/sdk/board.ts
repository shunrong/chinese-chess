import { Board, Position, Piece, PieceColor, Move, PieceType } from './types';
import { INITIAL_SETUP, BOARD_WIDTH, BOARD_HEIGHT } from './constants';
import { createPiece } from './pieces/factory';

export class ChessBoard implements Board {
  pieces: Piece[] = [];

  constructor() {
    this.reset();
  }

  reset(): void {
    this.pieces = INITIAL_SETUP.map(config => 
      createPiece(
        config.type as PieceType, 
        config.color as PieceColor, 
        config.position
      )
    );
  }

  getPieceAt(position: Position): Piece | null {
    return this.pieces.find(
      piece => piece.position.x === position.x && piece.position.y === position.y
    ) || null;
  }

  isValidMove(from: Position, to: Position): boolean {
    const piece = this.getPieceAt(from);
    if (!piece) return false;
    
    return piece.canMoveTo(to, this);
  }

  movePiece(from: Position, to: Position): Move | null {
    const piece = this.getPieceAt(from);
    if (!piece) return null;

    if (!piece.canMoveTo(to, this)) return null;

    // 获取目标位置的棋子（可能被吃掉）
    const capturedPiece = this.getPieceAt(to);

    // 创建棋子移动记录
    const move: Move = {
      piece,
      from,
      to,
      capturedPiece: capturedPiece || undefined // 确保 capturedPiece 是可选的
    };

    // 更新棋子位置
    piece.position = { ...to };

    // 如果目标位置有对方棋子，将其移除
    if (capturedPiece) {
      this.pieces = this.pieces.filter(p => p.id !== capturedPiece.id);
    }

    return move;
  }

  isCheck(color: PieceColor): boolean {
    // 找到将/帅
    const king = this.pieces.find(p => p.type === PieceType.KING && p.color === color);
    if (!king) return false;
    
    // 检查对方所有棋子是否可以吃掉将/帅
    const opponentColor = color === PieceColor.RED ? PieceColor.BLACK : PieceColor.RED;
    return this.pieces
      .filter(p => p.color === opponentColor)
      .some(p => p.canMoveTo(king.position, this));
  }

  isCheckmate(color: PieceColor): boolean {
    // 如果不是将军状态，就不可能是将死
    if (!this.isCheck(color)) return false;
    
    // 获取所有己方棋子
    const ownPieces = this.pieces.filter(p => p.color === color);
    
    // 检查是否有任何一步合法移动可以解除将军
    for (const piece of ownPieces) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        for (let y = 0; y < BOARD_HEIGHT; y++) {
          const targetPos = { x, y };
          
          // 如果这步移动合法
          if (piece.canMoveTo(targetPos, this)) {
            // 尝试移动
            const originalPos = { ...piece.position };
            const capturedPiece = this.getPieceAt(targetPos);
            
            // 临时移动
            if (capturedPiece) {
              this.pieces = this.pieces.filter(p => p.id !== capturedPiece.id);
            }
            piece.position = { ...targetPos };
            
            // 检查是否仍然被将军
            const stillInCheck = this.isCheck(color);
            
            // 恢复棋盘状态
            piece.position = { ...originalPos };
            if (capturedPiece) {
              this.pieces.push(capturedPiece);
            }
            
            // 如果这步移动可以解除将军，则不是将死
            if (!stillInCheck) {
              return false;
            }
          }
        }
      }
    }
    
    // 如果所有移动都无法解除将军，则是将死
    return true;
  }
} 