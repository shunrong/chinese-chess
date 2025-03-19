import React from 'react';
import { Layout, Row, Col } from 'antd';
import ChessBoard from './components/ChessBoard';
import GameControl from './components/GameControl';
import CapturedPieces from './components/CapturedPieces';
import { createStyles } from 'antd-style';

const { Content } = Layout;

const useStyles = createStyles(({ css }) => ({
  layout: css`
    min-height: 100vh;
    background-color: #f0f2f5;
  `,
  content: css`
    padding: 24px;
  `,
  rightPanel: css`
    display: flex;
    flex-direction: column;
  `
}));

const App: React.FC = () => {
  const { styles } = useStyles();
  
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={14} lg={16} xl={18}>
            <ChessBoard />
          </Col>
          <Col xs={24} md={10} lg={8} xl={6}>
            <div className={styles.rightPanel}>
              <GameControl />
              <CapturedPieces />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App; 