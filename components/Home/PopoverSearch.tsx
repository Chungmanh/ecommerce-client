import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverAnchor,
  Portal,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const PopoverSearch = (props: any) => {
  const { Trigger, isOpen, products, setProducts } = props;
  const router = useRouter();

  const handleClickProduct = async (id: string) => {
    setProducts([]);
    await router.push(`/product/${id}`);
  };

  return (
    <Popover
      closeOnBlur={false}
      placement="bottom"
      isOpen={isOpen}
      autoFocus={false}
    >
      <>
        <PopoverAnchor>{Trigger}</PopoverAnchor>
        <Portal>
          <PopoverContent sx={{ width: '50vw' }}>
            <PopoverBody>
              {products &&
                products.length > 0 &&
                products.map((product: any) => (
                  <Box
                    sx={{
                      display: 'flex',
                      marginBottom: '5px',
                      cursor: 'pointer',
                      '&:hover': {
                        transition: 'all 0.3s ease 0s',
                        backgroundColor: '#e5e5e5',
                      },
                    }}
                    onClick={() => {
                      handleClickProduct(product._id);
                    }}
                  >
                    <img
                      src={product?.avatar || ''}
                      alt={product?.name || ''}
                      style={{ width: '50px', display: 'block' }}
                    />
                    <Box ml={3}>
                      <Text
                        sx={{
                          fontSize: '15px',
                          color: '#000',
                          overflow: 'hidden',
                          whiteSpace: 'pre-wrap',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 1,
                        }}
                      >
                        {product?.name || ''}
                      </Text>
                      <Text
                        sx={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#FF0000',
                        }}
                      >
                        {product?.price || ''} <span>₫</span>
                      </Text>
                    </Box>
                  </Box>
                ))}
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </>
    </Popover>
  );
};

export default PopoverSearch;
