import axiosClient from './axiosClient';

export interface IReview {
  _id?: string;
  userId?: string;
  productId?: string;
  vote: number;
  comment: string;
}

export const addReview = async (review: IReview): Promise<IReview> => {
  const url = '/review/add';
  return axiosClient.post(url, review, {
    headers: {
      'content-type': 'application/json',
    },
  });
};
