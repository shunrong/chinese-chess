import React from 'react';
import { Button, Space, Typography, Card } from 'antd';
import { useGameStore } from '../store/gameStore';
import { GameStatus, PieceColor } from '../sdk';

const { Title, Text } = Typography;

const GameControl: React.FC = () => {
  const { status, currentPlayer, startGame, resetGame } = useGameStore();
  
  const getStatusText = () => {
    switch (status) {
      case GameStatus.NOT_STARTED:
        return '游戏未开始';
      case GameStatus.IN_PROGRESS:
        return `游戏进行中: ${currentPlayer === PieceColor.RED ? '红方' : '黑方'}回合`;
      case GameStatus.RED_WIN:
        return '红方胜利';
      case GameStatus.BLACK_WIN:
        return '黑方胜利';
      case GameStatus.DRAW:
        return '和棋';
      default:
        return '';
    }
  };
  
  return (
    <Card style={{ width: 300, marginLeft: 20 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={3}>中国象棋</Title>
        
        <Text strong>游戏状态: {getStatusText()}</Text>
        
        <Space>
          <Button 
            type="primary" 
            onClick={startGame}
            disabled={status === GameStatus.IN_PROGRESS}
          >
            开始游戏
          </Button>
          
          <Button 
            onClick={resetGame}
            disabled={status === GameStatus.NOT_STARTED}
          >
            重置游戏
          </Button>
        </Space>
        
        <Text>
          操作说明:
          <ul>
            <li>点击己方棋子选中</li>
            <li>点击目标位置移动棋子</li>
            <li>绿色表示可移动的位置</li>
            <li>黄色表示当前选中的棋子</li>
          </ul>
        </Text>
      </Space>
    </Card>
  );
};

export default GameControl; 