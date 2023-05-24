import axiosClient from '../apis/axiosClient';

export const getAllProducts = async (): Promise<any[]> => {
  const url = '/product/get-all-product';
  return axiosClient.get(url, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const getProductsByQueryV2 = async (query: {}): Promise<any> => {
  const url = '/product/get-products-query-v2';
  return axiosClient.post(
    url,
    { query },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
};

export const changeStatus = async (
  productId: string,
  status: number
): Promise<any> => {
  const url = '/product/change-status';
  return axiosClient.put(
    url,
    { productId, status },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
};
