import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
); // 创建根节点
root.render(<App />); // 渲染应用
