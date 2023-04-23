import { Box, Text, Button, useDisclosure } from '@chakra-ui/react';
RatingModal;
import { MdStorefront } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { cancelOrder, repurchase } from '../../common/apis/orderApi';
import RatingModal from '../../components/rating/RatingModal';

const ItemInHistoryOrderCustomer = (props: any) => {
  const { orders, reloadPage } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ratingCurrent, setRatingCurrent] = useState<string>('');

  // const getProductInCart = async () => {
  //   const pro_info = await getProductByIds(checkedItem.items);
  //   setItemInfo(pro_info);
  // };
  const handleRatingItem = async (productId: string) => {
    setRatingCurrent(productId);
    onOpen();
  };

  const handleCancelOrder = async (orderId: string) => {
    const canceled = await cancelOrder(orderId);
    if (canceled) {
      console.log('canceled: ', canceled);
      await reloadPage();
    }
  };

  const handleRepurchase = async (orderId: string) => {
    const order = await repurchase(orderId);
    if (order) {
      console.log('repurchase: ', order);
      await reloadPage();
    }
  };

  // useEffect(() => {}, []);
  // console.log('orders: ', orders);

  return (
    <>
      {orders &&
        orders?.length !== 0 &&
        orders?.map((value: any, index: number) => (
          <Box sx={{ margin: '0px 30px' }} key={index}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(0,0,0,.09)',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                }}
              >
                <MdStorefront />
                <Text
                  ml={1}
                  sx={{
                    // maxWidth: '200px',
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {value?.shop_name || ''}
                </Text>
              </Box>
              <Box
                sx={{
                  color: '#ee4d2d',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                {value?.status || ''}
              </Box>
            </Box>
            {value?.items &&
              value?.items?.map((item: any, index: number) => (
                <Box
                  sx={{
                    display: 'flex',
                    borderBottom: '1px solid rgba(0,0,0,.09)',
                    padding: '12px 0px',
                    justifyContent: 'space-between',
                  }}
                  key={index}
                >
                  <Box sx={{ display: 'flex', flex: 3 }}>
                    <Box>
                      <img
                        src={item?.productId?.avatar || ''}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <Box sx={{ paddingLeft: '12px' }}>
                      <Text>
                        {item?.productId?.name || ''}
                        {/* Áo Croptop Tay Dài Vạt Bầu Cổ Cao Ôm Body Quyến Rũ ✨ */}
                      </Text>
                      x{item?.quantity || '1'}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'right',
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        // color: '#000000de',
                        color: '#ee4d2d',
                        minWidth: '120px',
                        textAlign: 'right',
                      }}
                    >
                      ₫{item?.price || '0'}
                    </Box>
                    {value?.status === 'Hoàn thành' &&
                      (item?.hasReviewed === true ? (
                        <Button
                          colorScheme="orange"
                          variant="outline"
                          size="sm"
                          ml={10}
                          // onClick={() => handleRatingItem(item?.productId?._id)}
                        >
                          Xem đánh giá
                        </Button>
                      ) : (
                        <Button
                          colorScheme="gray"
                          variant="outline"
                          size="sm"
                          ml={10}
                          onClick={() => handleRatingItem(item?.productId?._id)}
                        >
                          Đánh giá
                        </Button>
                      ))}
                  </Box>
                </Box>
              ))}
            {value?.status === 'Chờ xác nhận' && (
              <Box
                sx={{
                  backgroundColor: '#fffefb',
                  height: '90px',
                  display: 'flex',
                  justifyContent: 'right',
                  flexFlow: 'wrap-reverse',
                }}
              >
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size="sm"
                  ml={10}
                  onClick={() => handleCancelOrder(value._id)}
                >
                  Hủy đơn hàng
                </Button>
              </Box>
            )}
            {value?.status === 'Hủy đơn' && (
              <Box
                sx={{
                  backgroundColor: '#fffefb',
                  height: '90px',
                  display: 'flex',
                  justifyContent: 'right',
                  flexFlow: 'wrap-reverse',
                }}
              >
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size="sm"
                  ml={10}
                  onClick={() => handleRepurchase(value._id)}
                >
                  Mua lại
                </Button>
              </Box>
            )}
          </Box>
        ))}
      {isOpen && (
        <RatingModal
          isOpen={isOpen}
          onClose={onClose}
          productId={ratingCurrent}
        />
      )}
    </>
  );
};

export default ItemInHistoryOrderCustomer;
