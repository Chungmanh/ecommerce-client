import axiosClient from './axiosClient';

// export interface ICartItem {
//   productId: any;
//   quantity: number;
//   price: number;
// }

export const recommend = async (): Promise<any> => {
  const url = '/action/recommend';
  return axiosClient.get(url);
};
