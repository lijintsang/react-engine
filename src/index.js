import React from 'react';
import ReactDOM from 'react-dom/client';  // 引入 'react-dom/client'

const App = () => {
  return (
    <div>
      test
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));  // 创建根节点
root.render(<App />);  // 渲染应用
