import { Box } from '@chakra-ui/react';
import { MdStorefront } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { getProductByIds, IProduct } from '../../common/apis/productApi';
const OrderItem = (props: any) => {
  const { checkedItem, isChanged } = props;
  const [itemInfo, setItemInfo] = useState<any>();

  const getProductInCart = async () => {
    const pro_info = await getProductByIds(checkedItem.items);
    setItemInfo(pro_info);
  };

  useEffect(() => {
    getProductInCart();
  }, [checkedItem, isChanged]);
  return (
    <Box
      sx={{
        // backgroundColor: '#fafdff',
        backgroundColor: '#effdff',
        borderRadius: '5px',
        padding: '4px',
        marginBottom: '5px',
      }}
    >
      <Box
        sx={{
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ margin: '0px 4px' }}>
          <MdStorefront />
        </Box>
        {checkedItem.shop_name}
      </Box>
      {checkedItem.items &&
        itemInfo &&
        itemInfo.products?.map((product: any) => (
          <Box
            key={product._id}
            sx={{
              fontSize: '12px',
              display: 'flex',
              marginBottom: '8px',
            }}
          >
            <Box sx={{ flex: 3 }}>{product.name}</Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>x{product.quantity}</Box>
            <Box sx={{ flex: 1, textAlign: 'right' }}>
              {product.price * product.quantity}₫
            </Box>
          </Box>
        ))}

      <Box
        sx={{
          borderTop: '1px solid #e5e5e5',
          marginBottom: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '14px',
          }}
        >
          <Box>Phí vận chuyển:</Box> <Box as="span">0₫</Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '14px',
          }}
        >
          <Box>Tạm tính:</Box>{' '}
          <Box as="span">{itemInfo ? itemInfo.total : 0}₫</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderItem;
