import React, { useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import { createStyles } from 'antd-style';
import { useGameStore } from '../store/gameStore';
import ChessPiece from './ChessPiece';
import { Position, PieceColor, GameStatus } from '../sdk';

// 创建样式，现在使用相对单位而非固定像素
const useStyles = createStyles(({ css }) => ({
  boardContainer: css`
    width: 100%;
    max-width: 800px; // 设置最大宽度
    margin: 0 auto;
  `,
  board: css`
    position: relative;
    width: 100%;
    padding-bottom: 111%; // 保持棋盘9:10的比例
    background-color: #DEB887;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  `,
  grid: css`
    position: absolute;
    top: 4%;
    left: 4%;
    width: 92%;
    height: 92%;
  `,
  horizontalLine: css`
    position: absolute;
    height: 1px;
    background-color: #000;
  `,
  verticalLine: css`
    position: absolute;
    width: 1px;
    background-color: #000;
  `,
  river: css`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #333;
    background-color: transparent;
    pointer-events: none;
  `,
  position: css`
    position: absolute;
    border-radius: 50%;
    cursor: pointer;
    z-index: 20;
  `,
  selected: css`
    background-color: rgba(255, 255, 0, 0.3);
  `,
  validMove: css`
    background-color: rgba(0, 255, 0, 0.2);
  `,
  positionMark: css`
    position: absolute;
    border-radius: 50%;
    background-color: #000;
  `,
  diagonalLine: css`
    position: absolute;
    height: 1px;
    background-color: #000;
    opacity: 0.5;
    transform-origin: 0 0;
  `
}));

const ChessBoard: React.FC = () => {
  const { styles } = useStyles();
  const { game, selectedPosition, selectPosition, moveSelectedPiece, status } = useGameStore();
  
  // 引用DOM元素以获取实际尺寸
  const boardRef = useRef<HTMLDivElement>(null);
  
  // 存储计算出的尺寸
  const [dimensions, setDimensions] = useState({
    gridWidth: 0,
    gridHeight: 0,
    cellSize: 0,
    pieceSize: 0,
    borderOffset: 0,
  });
  
  // 监听棋盘尺寸变化并重新计算
  useEffect(() => {
    if (!boardRef.current) return;
    
    const calculateDimensions = () => {
      const gridElement = boardRef.current?.querySelector(`.${styles.grid}`);
      if (!gridElement) return;
      
      const gridRect = gridElement.getBoundingClientRect();
      const gridWidth = gridRect.width;
      const gridHeight = gridRect.height;
      
      // 计算单元格大小 (9列，10行)
      const cellWidth = gridWidth / 8; // 8个间隔，9条线
      const cellHeight = gridHeight / 9; // 9个间隔，10条线
      const cellSize = Math.min(cellWidth, cellHeight);
      
      // 计算边框偏移，使棋盘居中
      const borderOffsetX = (gridWidth - cellSize * 8) / 2;
      const borderOffsetY = (gridHeight - cellSize * 9) / 2;
      
      // 棋子稍小于单元格
      const pieceSize = cellSize * 0.9;
      
      setDimensions({
        gridWidth,
        gridHeight,
        cellSize,
        pieceSize,
        borderOffset: Math.min(borderOffsetX, borderOffsetY),
      });
    };
    
    calculateDimensions();
    
    // 创建ResizeObserver监听尺寸变化
    const resizeObserver = new ResizeObserver(calculateDimensions);
    resizeObserver.observe(boardRef.current);
    
    return () => {
      if (boardRef.current) {
        resizeObserver.unobserve(boardRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [styles.grid]);

  // 计算可能的移动位置
  const validMoves: Position[] = [];
  
  if (selectedPosition) {
    const piece = game.board.getPieceAt(selectedPosition);
    if (piece) {
      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 10; y++) {
          const pos = { x, y };
          if (piece.canMoveTo(pos, game.board)) {
            validMoves.push(pos);
          }
        }
      }
    }
  }

  // 处理点击棋盘位置的函数
  const handlePositionClick = (position: Position) => {
    // 检查游戏是否已开始
    if (status !== GameStatus.IN_PROGRESS) {
      message.warning('请先点击"开始游戏"按钮');
      return;
    }
    
    const piece = game.board.getPieceAt(position);
    
    // 如果有选中的棋子，尝试移动
    if (selectedPosition) {
      // 点击自己的位置，取消选择
      if (selectedPosition.x === position.x && selectedPosition.y === position.y) {
        selectPosition(null);
        return;
      }
      
      // 尝试移动到新位置
      const moved = moveSelectedPiece(position);
      
      // 如果移动失败
      if (!moved) {
        // 如果点击的是己方其他棋子，选择该棋子
        if (piece && piece.color === game.currentPlayer) {
          selectPosition(position);
        } else {
          // 移动失败且不是己方棋子，提示错误
          message.error('不能移动到该位置！');
        }
      }
    } else {
      // 如果没有选中的棋子，尝试选择
      if (piece) {
        if (piece.color === game.currentPlayer) {
          selectPosition(position);
        } else {
          message.warning('现在是' + (game.currentPlayer === PieceColor.RED ? '红方' : '黑方') + '回合！');
        }
      } else {
        // 点击了没有棋子的位置
        message.info('请先选择一个棋子');
      }
    }
  };

  // 如果尺寸未计算完成，显示加载中
  if (dimensions.cellSize === 0) {
    return <div ref={boardRef} className={styles.boardContainer}>
      <div className={styles.board}>
        <div className={styles.grid}></div>
      </div>
    </div>;
  }

  // 计算坐标位置的函数
  const getPositionStyle = (x: number, y: number) => {
    const { cellSize, borderOffset } = dimensions;
    return {
      left: borderOffset + x * cellSize - cellSize * 0.45,
      top: borderOffset + y * cellSize - cellSize * 0.45,
      width: cellSize * 0.9,
      height: cellSize * 0.9,
    };
  };

  // 生成横线
  const horizontalLines = Array.from({ length: 10 }, (_, i) => {
    const { cellSize, borderOffset } = dimensions;
    return (
      <div 
        key={`h-${i}`}
        className={styles.horizontalLine}
        style={{ 
          top: borderOffset + i * cellSize,
          left: borderOffset,
          width: cellSize * 8,
        }}
      />
    );
  });

  // 生成竖线
  const verticalLines = [];
  for (let i = 0; i < 9; i++) {
    const { cellSize, borderOffset } = dimensions;
    
    if (i === 0 || i === 8) {
      // 两侧的边界竖线应完整贯穿棋盘
      verticalLines.push(
        <div 
          key={`v-full-${i}`}
          className={styles.verticalLine}
          style={{ 
            left: borderOffset + i * cellSize,
            top: borderOffset,
            height: cellSize * 9,
          }}
        />
      );
    } else {
      // 中间的竖线在楚河汉界处断开
      // 上半部分竖线
      verticalLines.push(
        <div 
          key={`v-upper-${i}`}
          className={styles.verticalLine}
          style={{ 
            left: borderOffset + i * cellSize,
            top: borderOffset,
            height: cellSize * 4,
          }}
        />
      );
      
      // 下半部分竖线
      verticalLines.push(
        <div 
          key={`v-lower-${i}`}
          className={styles.verticalLine}
          style={{ 
            left: borderOffset + i * cellSize,
            top: borderOffset + cellSize * 5,
            height: cellSize * 4,
          }}
        />
      );
    }
  }

  // 河界
  const riverStyle = {
    top: dimensions.borderOffset + dimensions.cellSize * 4,
    left: dimensions.borderOffset,
    width: dimensions.cellSize * 8,
    height: dimensions.cellSize,
    fontSize: `${dimensions.cellSize / 3}px`,
  };

  // 添加炮和卒的起始位置标记
  const positionMarks = [
    // 红方炮位
    { x: 1, y: 7 },
    { x: 7, y: 7 },
    // 黑方炮位
    { x: 1, y: 2 },
    { x: 7, y: 2 },
    // 红方兵位
    { x: 0, y: 6 },
    { x: 2, y: 6 },
    { x: 4, y: 6 },
    { x: 6, y: 6 },
    { x: 8, y: 6 },
    // 黑方卒位
    { x: 0, y: 3 },
    { x: 2, y: 3 },
    { x: 4, y: 3 },
    { x: 6, y: 3 },
    { x: 8, y: 3 },
  ].map(({x, y}, index) => {
    const { cellSize, borderOffset } = dimensions;
    return (
      <div 
        key={`mark-${index}`}
        className={styles.positionMark}
        style={{ 
          left: borderOffset + x * cellSize - cellSize * 0.05,
          top: borderOffset + y * cellSize - cellSize * 0.05,
          width: cellSize * 0.1,
          height: cellSize * 0.1,
        }}
      />
    );
  });
  
  // 添加九宫格对角线
  const diagonalLines = [
    // 黑方九宫格对角线
    { startX: 3, startY: 0, endX: 5, endY: 2 },
    { startX: 5, startY: 0, endX: 3, endY: 2 },
    // 红方九宫格对角线
    { startX: 3, startY: 7, endX: 5, endY: 9 },
    { startX: 5, startY: 7, endX: 3, endY: 9 },
  ].map((line, index) => {
    const { cellSize, borderOffset } = dimensions;
    const startX = borderOffset + line.startX * cellSize;
    const startY = borderOffset + line.startY * cellSize;
    const endX = borderOffset + line.endX * cellSize;
    const endY = borderOffset + line.endY * cellSize;
    
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
    
    return (
      <div 
        key={`diagonal-${index}`}
        className={styles.diagonalLine}
        style={{ 
          left: startX,
          top: startY,
          width: length,
          transform: `rotate(${angle}deg)`,
          borderTop: '1px dashed #000'
        }}
      />
    );
  });

  // 生成位置点击区域
  const positions = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      const pos = { x, y };
      const isSelected = selectedPosition?.x === x && selectedPosition?.y === y;
      const isValidMove = validMoves.some(move => move.x === x && move.y === y);
      
      positions.push(
        <div
          key={`pos-${x}-${y}`}
          className={`${styles.position} ${isSelected ? styles.selected : ''} ${isValidMove ? styles.validMove : ''}`}
          style={getPositionStyle(x, y)}
          onClick={() => handlePositionClick(pos)}
        />
      );
    }
  }

  return (
    <div ref={boardRef} className={styles.boardContainer}>
      <div className={styles.board}>
        <div className={styles.grid}>
          {horizontalLines}
          {verticalLines}
          {positions}
          {positionMarks}
          {diagonalLines}
          <div className={styles.river} style={riverStyle}>楚 河 汉 界</div>
          
          {/* 渲染棋子 */}
          {game.board.pieces.map(piece => (
            <ChessPiece 
              key={piece.id} 
              piece={piece}
              size={dimensions.pieceSize}
              cellSize={dimensions.cellSize}
              borderOffset={dimensions.borderOffset}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard; 