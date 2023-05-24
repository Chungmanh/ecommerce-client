import axiosClient from './axiosClient';

export interface IShop {
  _id?: string;
  userId?: string;
  name: string;
  avatar?: string;
  address: string;
  telephone: string;
}

export const getShopByUser = async (): Promise<IShop> => {
  const url = '/shop/get-shop';
  return axiosClient.get(url, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const updatedShopByUser = async (shop: IShop): Promise<IShop> => {
  const url = '/shop/update';
  return axiosClient.post(url, shop, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const changeAvatarShop = async (avatar: File | string): Promise<any> => {
  const url = '/shop/update-avatar';
  return axiosClient.post(
    url,
    { avatar },
    {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
  );
};
