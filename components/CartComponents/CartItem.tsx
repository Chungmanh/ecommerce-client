import { Box, Image, Checkbox } from '@chakra-ui/react';
import { BsHeart } from 'react-icons/bs';
const CartItem = (props: any) => {
  const {
    shop_item,
    item,
    isCheckedItem,
    handleUpdateCart,
    handleToggleCheckBox,
    handleRemoveItem,
  } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        marginBottom: '10px',
        padding: '0px 10px',
        backgroundColor: '#fff',
      }}
    >
      <Checkbox
        sx={{ margin: '0px 8px' }}
        size="lg"
        colorScheme="twitter"
        isChecked={isCheckedItem(shop_item.shop_name, item._id)}
        onChange={(e) =>
          handleToggleCheckBox(shop_item.shop_name, item._id.toString())
        }
      />
      <Image
        sx={{
          width: '116px',
          height: '154px',
          objectFit: 'cover',
          padding: '5px',
        }}
        src={`${item?.avatar}`}
      />
      <Box sx={{ width: '100%', padding: '0px 12px' }}>
        <Box sx={{ marginBottom: '58px' }}>
          <Box
            sx={{
              fontSize: '14px',
              color: '#222',
              paddingTop: '8px',
            }}
          >
            {item?.name}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <Box
              sx={{
                color: 'rgba(0, 0, 0, 0.54)',
                fontSize: '0.875rem',
                width: '25%',
              }}
            >
              Phân Loại Hàng:
            </Box>
            <Box as="strong" sx={{ width: '25%' }}>
              {item.price}₫
            </Box>
            <Box sx={{ display: 'flex', width: '25%' }}>
              <Box
                as="button"
                sx={{
                  boxSizing: 'border-box',
                  border: '1px solid rgba(0,0,0,.09)',
                  borderRadius: '100px 0 0 100px',
                  padding: '1px 6px',
                  width: '25px',
                  height: '28px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  ':hover': {
                    cursor: 'pointer',
                  },
                  ':active': {
                    border: '1px solid rgba(0,0,0,.3)',
                  },
                }}
                disabled={item.quantity <= 1}
                onClick={() => handleUpdateCart(item._id, 'decrease')}
              >
                -
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  border: '1px solid rgba(0,0,0,.09)',
                  borderLeft: 0,
                  borderRight: 0,
                  width: '34px',
                  height: '28px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '13px',
                }}
              >
                {item.quantity}
              </Box>
              <Box
                sx={{
                  boxSizing: 'border-box',
                  border: '1px solid rgba(0,0,0,.09)',
                  borderRadius: '0 100px 100px 0',
                  padding: '1px 6px',
                  width: '25px',
                  height: '28px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  ':hover': {
                    cursor: 'pointer',
                  },
                  ':active': {
                    border: '1px solid rgba(0,0,0,.3)',
                  },
                }}
                onClick={() => handleUpdateCart(item._id, 'increase')}
              >
                +
              </Box>
            </Box>
            <Box as="strong" sx={{ width: '25%' }}>
              {item.price * item.quantity}₫
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            color: '#222',
            fontSize: '13px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <BsHeart />
            <Box sx={{ marginLeft: '5px' }}>Lưu lại sau</Box>
          </Box>
          <Box
            sx={{ cursor: 'pointer', marginLeft: '15px' }}
            onClick={() => {
              handleRemoveItem(shop_item.shop_name, item._id);
            }}
          >
            Xóa
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
