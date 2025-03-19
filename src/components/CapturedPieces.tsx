import React from 'react';
import { Card, Divider, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { useGameStore } from '../store/gameStore';
import { PieceColor } from '../sdk';

const { Title } = Typography;

const useStyles = createStyles(({ css }) => ({
  container: css`
    margin-top: 20px;
  `,
  pieceContainer: css`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  `,
  capturedPiece: css`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
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

const CapturedPieces: React.FC = () => {
  const { styles } = useStyles();
  const { game } = useGameStore();
  
  const redCaptured = game.getCapturedPiecesByColor(PieceColor.RED);
  const blackCaptured = game.getCapturedPiecesByColor(PieceColor.BLACK);
  
  const renderPiece = (piece: any) => {
    const pieceClass = piece.color === PieceColor.RED ? styles.redPiece : styles.blackPiece;
    return (
      <div 
        key={piece.id} 
        className={`${styles.capturedPiece} ${pieceClass}`}
        title={piece.name}
      >
        {piece.name}
      </div>
    );
  };
  
  return (
    <Card className={styles.container}>
      <Title level={4}>已吃掉的棋子</Title>
      
      <Divider orientation="left">红方被吃</Divider>
      <div className={styles.pieceContainer}>
        {redCaptured.length > 0 ? redCaptured.map(renderPiece) : '无'}
      </div>
      
      <Divider orientation="left">黑方被吃</Divider>
      <div className={styles.pieceContainer}>
        {blackCaptured.length > 0 ? blackCaptured.map(renderPiece) : '无'}
      </div>
    </Card>
  );
};

export default CapturedPieces; 