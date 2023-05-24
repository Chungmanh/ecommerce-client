import axiosClient from './axiosClient';
export interface ITrademark {
  _id: string;
  name: String;
}

export const addTrademark = async (trademark: object) => {
  const url = '/trademark/add';
  return axiosClient.post(url, trademark, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const getAllTrademarksByUser = async (): Promise<[]> => {
  console.log('call');
  const url = '/trademark/get-trademark/user';
  return axiosClient.get(url);
};

export const deleteTrademark = async (id: string) => {
  const url = `/trademark/delete/${id}`;
  return axiosClient.delete(url);
};

export const getTrademarksByShopId = async (
  id: string
): Promise<ITrademark[]> => {
  const url = `/trademark/get-by-shopId/${id}`;
  return axiosClient.get(url);
};

export const getTrademarkById = async (id: string): Promise<any> => {
  const url = `/trademark/${id}`;
  return axiosClient.get(url);
};
