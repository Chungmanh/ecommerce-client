import axiosClient from './axiosClient';

export interface IProduct {
  _id?: string;
  name: String;
  shopId?: String;
  categoryId: String;
  price: number;
  description: String;
  quantity: number;
  star?: Number;
  avatar?: File | string;
  type: String;
  status?: Boolean;
}

export const addProduct = async (product: IProduct) => {
  const url = '/product/add';
  return axiosClient.post(url, product, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const deleteProduct = async (id: string) => {
  const url = `/product/delete/${id}`;
  return axiosClient.delete(url);
};

export const getProductsByShop = async (): Promise<any[]> => {
  const url = '/product/get-product-by-shop';
  return axiosClient.get(url, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const getAllProducts = async (): Promise<any[]> => {
  const url = '/product/get-all-product';
  return axiosClient.get(url, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const getProductByIds = async (ids: string[]): Promise<any> => {
  const url = '/product/get-product-ids';
  return axiosClient.post(url, ids, {
    headers: {
      // 'content-type': 'multipart/form-data',
      'content-type': 'application/json',
    },
  });
};

export const getProductsByOrderId = async (orderId: string[]): Promise<any> => {
  const url = '/product/get-product-in-order';
  return axiosClient.post(url, orderId, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const getAllProductsOrderOfUser = async (): Promise<any> => {
  const url = '/product/get-all-products-order-of-user';
  return axiosClient.get(url, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const url = `/product/${id}`;
  return axiosClient.get(url);
};
