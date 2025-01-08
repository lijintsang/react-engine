import { useEffect } from 'react';
import styles from './index.less';
import { getSysProduct } from '@/api/Home';

const Home = () => {
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getSysProduct();
        console.log('🚀 ~ fetchUserInfo ~ data-------->', data);
      } catch (error) {
        console.error('失败:', error);
      }
    };
    fetchInfo();
  }, []);

  return <div className={styles.text}>home</div>;
};

export default Home;
