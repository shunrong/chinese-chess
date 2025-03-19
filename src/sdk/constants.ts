// 棋盘尺寸
export const BOARD_WIDTH = 9;  // 列数
export const BOARD_HEIGHT = 10; // 行数

// 棋子初始配置
export const INITIAL_SETUP = [
  // 红方
  { type: 'chariot', color: 'red', position: { x: 0, y: 9 } },
  { type: 'horse', color: 'red', position: { x: 1, y: 9 } },
  { type: 'elephant', color: 'red', position: { x: 2, y: 9 } },
  { type: 'advisor', color: 'red', position: { x: 3, y: 9 } },
  { type: 'king', color: 'red', position: { x: 4, y: 9 } },
  { type: 'advisor', color: 'red', position: { x: 5, y: 9 } },
  { type: 'elephant', color: 'red', position: { x: 6, y: 9 } },
  { type: 'horse', color: 'red', position: { x: 7, y: 9 } },
  { type: 'chariot', color: 'red', position: { x: 8, y: 9 } },
  { type: 'cannon', color: 'red', position: { x: 1, y: 7 } },
  { type: 'cannon', color: 'red', position: { x: 7, y: 7 } },
  { type: 'pawn', color: 'red', position: { x: 0, y: 6 } },
  { type: 'pawn', color: 'red', position: { x: 2, y: 6 } },
  { type: 'pawn', color: 'red', position: { x: 4, y: 6 } },
  { type: 'pawn', color: 'red', position: { x: 6, y: 6 } },
  { type: 'pawn', color: 'red', position: { x: 8, y: 6 } },
  
  // 黑方
  { type: 'chariot', color: 'black', position: { x: 0, y: 0 } },
  { type: 'horse', color: 'black', position: { x: 1, y: 0 } },
  { type: 'elephant', color: 'black', position: { x: 2, y: 0 } },
  { type: 'advisor', color: 'black', position: { x: 3, y: 0 } },
  { type: 'king', color: 'black', position: { x: 4, y: 0 } },
  { type: 'advisor', color: 'black', position: { x: 5, y: 0 } },
  { type: 'elephant', color: 'black', position: { x: 6, y: 0 } },
  { type: 'horse', color: 'black', position: { x: 7, y: 0 } },
  { type: 'chariot', color: 'black', position: { x: 8, y: 0 } },
  { type: 'cannon', color: 'black', position: { x: 1, y: 2 } },
  { type: 'cannon', color: 'black', position: { x: 7, y: 2 } },
  { type: 'pawn', color: 'black', position: { x: 0, y: 3 } },
  { type: 'pawn', color: 'black', position: { x: 2, y: 3 } },
  { type: 'pawn', color: 'black', position: { x: 4, y: 3 } },
  { type: 'pawn', color: 'black', position: { x: 6, y: 3 } },
  { type: 'pawn', color: 'black', position: { x: 8, y: 3 } }
];

// 棋子名称映射
export const PIECE_NAMES = {
  red: {
    king: '帅',
    advisor: '仕',
    elephant: '相',
    horse: '马',
    chariot: '车',
    cannon: '炮',
    pawn: '兵'
  },
  black: {
    king: '将',
    advisor: '士',
    elephant: '象',
    horse: '马',
    chariot: '车',
    cannon: '炮',
    pawn: '卒'
  }
}; 