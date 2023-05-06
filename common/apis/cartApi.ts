import axiosClient from './axiosClient';

export interface ICartItem {
  productId: any;
  quantity: number;
  price: number;
}

export interface ICart {
  _id: string;
  userId: string;
  items: [ICartItem];
  total: number;
}

// export interface ICart {
//   itemsInShop: {
//     items: any[];
//     shop_name: string;
//   };
//   total: number;
// }

export const getAllCartItem = async (): Promise<ICart> => {
  const url = '/cart/get-cart';
  return axiosClient.get(url);
};

export const getAllCartItemDrawer = async (): Promise<ICart> => {
  const url = '/cart/get-cart-drawer';
  return axiosClient.get(url);
};

export const addToCart = async (item: {
  productId: string;
  quantity: number;
}): Promise<{ total: number }> => {
  const url = '/cart/add';
  return axiosClient.post(url, item, {
    headers: {
      'content-type': 'application/json',
      // 'content-type': 'multipart/form-data',
    },
  });
};

export const updateCart = async (
  productId: string,
  type: string
): Promise<any> => {
  const url = '/cart/update';
  return axiosClient.put(
    url,
    { productId, type },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
};

export const deleteCartItem = async (id: string) => {
  const url = `/cart/delete/${id}`;
  return axiosClient.delete(url);
};
