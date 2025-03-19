import React from 'react';
import { createStyles } from 'antd-style';
import { Piece, PieceColor } from '../sdk';

interface ChessPieceProps {
  piece: Piece;
  size: number;
  cellSize: number;
  borderOffset: number;
}

const useStyles = createStyles(({ css }) => ({
  piece: css`
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    transition: all 0.3s ease;
    user-select: none;
  `,
  redPiece: css`
    background-color: #f5222d;
    color: #fff;
    border: 1px solid #d9d9d9;
  `,
  blackPiece: css`
    background-color: #000;
    color: #fff;
    border: 1px solid #d9d9d9;
  `
}));

const ChessPiece: React.FC<ChessPieceProps> = ({ piece, size, cellSize, borderOffset }) => {
  const { styles } = useStyles();
  const { position, color, name } = piece;
  
  const pieceClass = color === PieceColor.RED ? styles.redPiece : styles.blackPiece;
  
  return (
    <div 
      className={`${styles.piece} ${pieceClass}`}
      style={{ 
        left: borderOffset + position.x * cellSize - size / 2,
        top: borderOffset + position.y * cellSize - size / 2,
        width: size,
        height: size,
        fontSize: `${size * 0.5}px`,
      }}
    >
      {name}
    </div>
  );
};

export default ChessPiece; 