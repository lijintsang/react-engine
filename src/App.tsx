import './App.less';
import Info from './assets/images/eye.png';
import Home from '@/pages/Home';

const App = () => {
  console.log('111    ', 222);
  return (
    <div className="text">
      test
      <img src={Info} alt="" />
      <Home></Home>
    </div>
  );
};

export default App;
