import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  Image,
  typography,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllCartItemDrawer, ICart } from '../common/apis/cartApi';
import { useRouter } from 'next/navigation';
// import { useRef } from 'react';

const CartComponent = (props: any) => {
  const { btnComponent } = props;
  const { push } = useRouter();
  const [cart, setCart] = useState<ICart>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = useRef()

  const handleClickToCart = () => {
    const user = JSON.parse(`${localStorage.getItem('user')}`);
    if (!user) {
      push('/');
    } else {
      push('/cart');
    }
    onClose();
  };
  useEffect(() => {
    async function getCart() {
      const cart = await getAllCartItemDrawer();
      setCart(cart);
    }
    const user = JSON.parse(`${localStorage.getItem('user')}`);
    if (user) {
      getCart();
    }
  }, [isOpen]);

  return (
    <>
      <div // ref={btnRef}
        onClick={onOpen}
      >
        {btnComponent}
      </div>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="sm"
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Giỏ hàng</DrawerHeader>

          <DrawerBody>
            <Box>
              {cart &&
                cart.items &&
                cart.items.length > 0 &&
                cart.items.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: 'flex', marginBottom: '10px' }}
                  >
                    <Box sx={{ marginRight: '10px' }}>
                      <Image
                        src={`${item?.productId?.avatar}`}
                        sx={{
                          width: '90px',
                          height: '120px',
                        }}
                      />
                    </Box>
                    <Box sx={{ width: '280px' }}>
                      <Box
                        as="p"
                        sx={{
                          display: 'block',
                          marginBottom: '6px',
                          lineHeight: '18px',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item?.productId?.name}
                      </Box>
                      <Box as="strong">{item?.productId?.price}₫</Box>
                    </Box>
                  </Box>
                ))}
            </Box>
          </DrawerBody>

          <DrawerFooter>
            {/* <Link href={'/cart'}> */}
            <Button colorScheme="blue" onClick={handleClickToCart}>
              Xem Giỏ Hàng
            </Button>
            {/* </Link> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartComponent;
