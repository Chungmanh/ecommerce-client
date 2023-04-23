import axiosClient from './axiosClient';

export interface IOrderItem {
  productId: any;
  quantity: number;
  price: number;
}

export interface IOrder {
  _id: string;
  userId: string;
  shopId: string;
  address: string;
  items: [IOrderItem];
  total: number;
  status: string;
}

export const getAllOrder = async (): Promise<IOrder[]> => {
  const url = '/order/get-orders-by-user';
  return axiosClient.get(url);
};

export const getItemsInOrderById = async (
  orderId: string
): Promise<IOrderItem[]> => {
  const url = `/order/get-items-order/${orderId}`;
  return axiosClient.get(url);
};

export const changeStatusInOrder = async (
  orderId: string,
  status: string
): Promise<string> => {
  const url = '/order/change-status';
  return axiosClient.put(
    url,
    { orderId, status },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
};

export const cancelOrder = async (orderId: string): Promise<string> => {
  const url = '/order/cancel-order';
  return axiosClient.put(
    url,
    { orderId },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
};

export const repurchase = async (orderId: string): Promise<string> => {
  const url = '/order/repurchase';
  return axiosClient.put(
    url,
    { orderId },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
};

export const createOrder = async (
  order: {
    items: {
      productId: string;
      quantity: number;
    };
    shop_name: string;
  }[]
): Promise<{ isSuccess: boolean }> => {
  const url = '/order/add';
  console.log('order: ', order);

  return axiosClient.post(
    url,
    { order },
    {
      headers: {
        'content-type': 'application/json',
        // 'content-type': 'multipart/form-data',
      },
    }
  );
};

// export const deleteCartItem = async (id: string) => {
//   const url = `/cart/delete/${id}`;
//   return axiosClient.delete(url);
// };
