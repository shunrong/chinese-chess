import { create } from 'zustand';
import { ChessGame, Position, PieceColor, GameStatus } from '../sdk';

interface GameState {
  // 引用 - 指向游戏实例
  game: ChessGame;
  
  // UI特定状态
  selectedPosition: Position | null;
  
  // 游戏状态镜像 - 用于触发UI更新
  status: GameStatus;
  currentPlayer: PieceColor;
  
  // 动作 - 作为UI和game之间的桥梁
  startGame: () => void;
  resetGame: () => void;
  selectPosition: (position: Position | null) => void;
  moveSelectedPiece: (toPosition: Position) => boolean;
  clearSelection: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // 初始化
  game: new ChessGame(),
  selectedPosition: null,
  status: GameStatus.NOT_STARTED,
  currentPlayer: PieceColor.RED,
  
  // 游戏操作方法
  startGame: () => {
    const { game } = get();
    game.start();
    set({ 
      status: game.status,
      currentPlayer: game.currentPlayer
    });
  },
  
  resetGame: () => {
    const { game } = get();
    game.reset();
    set({ 
      selectedPosition: null,
      status: game.status,
      currentPlayer: game.currentPlayer
    });
  },
  
  selectPosition: (position: Position | null) => {
    // UI特定操作，不影响游戏逻辑
    if (!position) {
      set({ selectedPosition: null });
      return;
    }
    
    const { game } = get();
    const piece = game.board.getPieceAt(position);
    
    if (piece && piece.color === game.currentPlayer) {
      set({ selectedPosition: position });
    }
  },
  
  moveSelectedPiece: (toPosition: Position) => {
    const { game, selectedPosition } = get();
    
    if (!selectedPosition) return false;
    
    // 调用game实例的方法修改游戏状态
    const success = game.makeMove(selectedPosition, toPosition);
    
    // 同步更新store中的状态镜像
    if (success) {
      set({ 
        selectedPosition: null,
        currentPlayer: game.currentPlayer,
        status: game.status
      });
    }
    
    return success;
  },
  
  clearSelection: () => {
    set({ selectedPosition: null });
  }
})); 