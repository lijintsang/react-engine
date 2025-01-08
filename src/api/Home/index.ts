import service from '../index';

//
export const getSysProduct = async () => {
  return service.get('/xxx/list', {
    params: {
      pageNo: 1,
      pageSize: 9999,
    },
  });
};
