import {
  Box,
  Image,
  Button,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { addStart, addSuccess } from '../redux/cartSlice';
import CartItem from '../components/CartComponents/CartItem';
import OrderItem from '../components/CartComponents/OrderItem';
import {
  getAllCartItem,
  updateCart,
  deleteCartItem,
  ICart,
} from '../common/apis/cartApi';
import { createOrder } from '../common/apis/orderApi';
import { useDispatch } from 'react-redux';
import { MdStorefront } from 'react-icons/md';
import Swal from 'sweetalert2';

const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState<any>();
  const [checkedItems, setCheckedItems] = useState<any>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [totalPriceChanged, settotalPriceChanged] = useState<number>(0);

  const handleUpdateCart = async (productId: string, type: string) => {
    const updated = await updateCart(productId, type);
    console.log('updated: ', updated);

    if (updated && Object.keys(updated).length !== 0) {
      dispatch(addSuccess(updated.total));
      setIsChanged(!isChanged);
      await getCart();
    }
  };

  const handleRemoveItem = async (shop_name: string, productId: string) => {
    // const deleted = await deleteCartItem(productId);
    // await getCart();

    const isExistsShop = checkedItems.find(
      (checkedItem: any) => checkedItem.shop_name === shop_name
    );
    if (isExistsShop) {
      const isExistsItem = isExistsShop.items.find(
        (item: string) => item === productId
      );

      if (isExistsItem) {
        const new_items = isExistsShop.items.filter(
          (item: string) => item !== productId
        );
        const new_checkedItems = checkedItems.filter(
          (checkedItem: any) => checkedItem.shop_name !== shop_name
        );
        if (new_items.length !== 0) {
          await deleteCartItem(productId);
          setCheckedItems([
            ...new_checkedItems,
            { shop_name, items: new_items },
          ]);
        } else {
          await deleteCartItem(productId);
          setCheckedItems([...new_checkedItems]);
        }
      }
    }
  };

  async function getCart() {
    const cart = await getAllCartItem();
    setCart(cart);
  }

  const handleToggleCheckBox = (shop_name: string, itemId: string) => {
    const isExistsShop = checkedItems.find(
      (checkedItem: any) => checkedItem.shop_name === shop_name
    );
    if (isExistsShop) {
      const isExistsItem = isExistsShop.items.find(
        (item: string) => item === itemId
      );

      if (!isExistsItem) {
        const new_items = [...isExistsShop.items, itemId];
        const new_checkedItems = checkedItems.filter(
          (checkedItem: any) => checkedItem.shop_name !== shop_name
        );
        setCheckedItems([...new_checkedItems, { shop_name, items: new_items }]);
      } else {
        const new_items = isExistsShop.items.filter(
          (item: string) => item !== itemId
        );
        const new_checkedItems = checkedItems.filter(
          (checkedItem: any) => checkedItem.shop_name !== shop_name
        );
        if (new_items.length !== 0) {
          setCheckedItems([
            ...new_checkedItems,
            { shop_name, items: new_items },
          ]);
        } else {
          setCheckedItems([...new_checkedItems]);
        }
      }
    } else {
      setCheckedItems([...checkedItems, { shop_name, items: [itemId] }]);
    }
  };

  const handleToggleCheckAllShops = () => {
    const newCheckedItems = cart?.itemsInShop?.map((cart: any) => {
      return {
        items: cart.items.map((item: any) => item._id),
        shop_name: cart.shop_name,
      };
    });

    const totalItemsInCart = newCheckedItems.reduce(
      (currentCount: number, nextShop: { items: string[] }) => {
        return currentCount + nextShop.items.length;
      },
      0
    );

    const totalItemsChecked = checkedItems.reduce(
      (currentCount: number, nextShop: { items: string[] }) => {
        return currentCount + nextShop.items.length;
      },
      0
    );

    if (totalItemsInCart === totalItemsChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems([...newCheckedItems]);
    }
  };

  const handleToggleCheckAllOneShop = (shop_name: string) => {
    const isExistsShop = cart.itemsInShop.find(
      (item: any) => item.shop_name === shop_name
    );
    const otherShop = checkedItems.filter(
      (checkedItem: any) => checkedItem.shop_name !== shop_name
    );

    const ids = isExistsShop.items.map((item: any) => item._id);
    const isCheck = isCheckedShop(shop_name, ids.length);

    if (isExistsShop && !isCheck) {
      setCheckedItems([...otherShop, { shop_name, items: ids }]);
    } else {
      setCheckedItems([...otherShop]);
    }
  };

  const isCheckedItem = (shop_name: string, itemId: string) => {
    const ischeck = checkedItems.some(
      (element: any) =>
        element.shop_name === shop_name && element.items.includes(itemId)
    );
    return ischeck;
  };

  const isCheckedShop = (shop_name: string, length: number) => {
    const ischeck = checkedItems.some(
      (element: any) =>
        element.shop_name === shop_name && element.items.length === length
    );
    return ischeck;
  };

  const isCheckedAllShop = () => {
    const newCheckedItems = cart?.itemsInShop?.map((cartItem: any) => {
      return {
        items: cartItem.items.map((item: any) => item._id),
        shop_name: cartItem.shop_name,
      };
    });

    const totalItemsInCart = newCheckedItems?.reduce(
      (currentCount: number, nextShop: { items: string[] }) => {
        return currentCount + nextShop.items.length;
      },
      0
    );

    const totalItemsChecked = checkedItems?.reduce(
      (currentCount: number, nextShop: { items: string[] }) => {
        return currentCount + nextShop.items.length;
      },
      0
    );

    const ischeck = totalItemsInCart === totalItemsChecked;
    return ischeck;
  };

  const isIndeterminateShop = (shop_name: string, length: number) => {
    const ischeck = checkedItems.some(
      (element: any) =>
        element.shop_name === shop_name &&
        element.items.length > 0 &&
        element.items.length < length
    );
    return ischeck;
  };

  const isIndeterminateAllShop = () => {
    const newCheckedItems = cart?.itemsInShop?.map((cartItem: any) => {
      return {
        items: cartItem.items.map((item: any) => item._id),
        shop_name: cartItem.shop_name,
      };
    });

    const totalItemsInCart = newCheckedItems?.reduce(
      (currentCount: number, nextShop: { items: string[] }) => {
        return currentCount + nextShop.items.length;
      },
      0
    );

    const totalItemsChecked = checkedItems?.reduce(
      (currentCount: number, nextShop: { items: string[] }) => {
        return currentCount + nextShop.items.length;
      },
      0
    );
    const ischeck =
      totalItemsInCart > totalItemsChecked && totalItemsChecked > 0;
    return ischeck;
  };

  const handleGetTotalPriceInCheckedItems = async () => {
    if (
      checkedItems &&
      checkedItems.length !== 0 &&
      cart &&
      cart.itemsInShop.length !== 0
    ) {
      const itemIds = await checkedItems.reduce(
        (currentItemIds: [], nextcheckedItem: { items: string[] }) => {
          return [...currentItemIds, ...nextcheckedItem.items];
        },
        []
      );

      const total = cart.itemsInShop.reduce(
        (currentTotal: number, nextItem: { items: any[] }) => {
          const temp = nextItem.items.reduce((current: number, next: any) => {
            if (itemIds.includes(next._id.toString())) {
              return current + next.price * next.quantity;
            } else {
              return current;
            }
          }, 0);
          return currentTotal + temp;
        },
        0
      );
      settotalPriceChanged(total);
      return total;
    }
  };

  const handlePayment = async () => {
    if (checkedItems.length !== 0) {
      const isSuccess = await createOrder(checkedItems);
      console.log('isSuccess: ', isSuccess);
      if (isSuccess) {
        setCheckedItems([]);
        Swal.fire({
          icon: 'success',
          title: 'Đặt hàng thành công',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(`${localStorage.getItem('user')}`);
    if (user) {
      console.log('render');
      getCart();
    }
  }, [checkedItems]);
  console.log('checkedItems: ', checkedItems);

  useEffect(() => {
    handleGetTotalPriceInCheckedItems();
  }, [cart]);

  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          minHeight: '1000px',
          paddingTop: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '1220px',
            margin: '0px auto',
          }}
        >
          <Box
            sx={{
              width: '66.666%',
              padding: '0px 10px',
            }}
          >
            <Box
              sx={{
                fontSize: '20px',
                color: '#222',
                backgroundColor: '#fff',
                borderBottom: '1px solid #e5e5e5',
                padding: '24px 24px 10px',
                marginBottom: '10px',
                // position: 'sticky',
                // top: 0,s
                // zIndex: 2,
              }}
            >
              Tóm Tắt Mặt Hàng(2)
              <Checkbox
                isIndeterminate={isIndeterminateAllShop()}
                isChecked={isCheckedAllShop()}
                size="lg"
                colorScheme="twitter"
                onChange={(e) => handleToggleCheckAllShops()}
              >
                Tất cả
              </Checkbox>
            </Box>
            {cart &&
              cart.itemsInShop &&
              cart.itemsInShop.length > 0 &&
              cart.itemsInShop.map((shop_item: any, index: number) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      marginBottom: '10px',
                      padding: '10px',
                    }}
                  >
                    <Checkbox
                      sx={{ margin: '0px 8px' }}
                      size="lg"
                      colorScheme="twitter"
                      isChecked={isCheckedShop(
                        shop_item.shop_name,
                        shop_item.items.length
                      )}
                      isIndeterminate={isIndeterminateShop(
                        shop_item.shop_name,
                        shop_item.items.length
                      )}
                      onChange={() =>
                        handleToggleCheckAllOneShop(shop_item.shop_name)
                      }
                    />
                    <Box sx={{ margin: '0px 8px' }}>
                      <MdStorefront />
                    </Box>
                    <Box
                      sx={{
                        color: '#222',
                        fontSize: '18px',
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'inline-block',
                        maxWidth: '90%',
                      }}
                    >
                      {shop_item.shop_name}
                    </Box>
                  </Box>
                  {shop_item &&
                    shop_item.items.length > 0 &&
                    shop_item.items.map((item: any, index: number) => (
                      <Box key={index}>
                        <CartItem
                          shop_item={shop_item}
                          item={item}
                          isCheckedItem={isCheckedItem}
                          handleUpdateCart={handleUpdateCart}
                          handleToggleCheckBox={handleToggleCheckBox}
                          handleRemoveItem={handleRemoveItem}
                        />
                      </Box>
                    ))}
                </Box>
              ))}
          </Box>
          <Box
            sx={{
              width: '33.333%',
              padding: '0px 10px 20px',
              backgroundColor: '#fff',
              height: 'max-content',
            }}
          >
            <Box
              sx={{
                fontSize: '20px',
                color: '#222',
                backgroundColor: '#fff',
                borderBottom: '1px solid #e5e5e5',
                padding: '24px 24px 10px',
                marginBottom: '10px',
              }}
            >
              Tóm Tắt Đơn Hàng
            </Box>
            <Box sx={{ marginBottom: '10px' }}>
              {checkedItems.map((checkedItem: any, index: number) => (
                <OrderItem
                  key={index}
                  checkedItem={checkedItem}
                  isChanged={isChanged}
                />
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}
            >
              <Box sx={{ fontWeight: 500 }}>Thành tiền:</Box>{' '}
              <Box
                as="span"
                sx={{ color: '#ee4d2d' }}
                onClick={handleGetTotalPriceInCheckedItems}
              >
                {checkedItems.length !== 0 ? totalPriceChanged : 0}₫
              </Box>
            </Box>
            <Button
              size="lg"
              colorScheme="twitter"
              sx={{ width: '100%' }}
              isDisabled={checkedItems.length === 0}
              onClick={handlePayment}
            >
              Thanh toán ngay
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Cart;
