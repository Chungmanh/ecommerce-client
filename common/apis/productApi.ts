import axiosClient from './axiosClient';

export interface IProduct {
  _id?: string;
  name: String;
  shopId?: String;
  categoryId: String;
  price: Number;
  description: String;
  quantity: Number;
  star?: Number;
  avatar?: File;
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

export const getProductById = async (id: string): Promise<any[]> => {
  const url = `/product/${id}`;
  return axiosClient.get(url, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};
