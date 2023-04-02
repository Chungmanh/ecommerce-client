import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  Image,
} from '@chakra-ui/react';
import Login from './LoginModal';
import Register from './RegisterModal';
import { useState } from 'react';

const ModalComponent = (props: any) => {
  const { isOpen, onClose, component } = props;
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {component}
      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <ModalOverlay />
        <ModalContent borderRadius={'20px'} overflow={'hidden'}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box
              sx={{
                boxSizing: 'border-box',
                padding: '0 20px',
                flex: 5,
              }}
            >
              {isLogin ? (
                <Login setIsLogin={setIsLogin} onClose={onClose} />
              ) : (
                <Register setIsLogin={setIsLogin} onClose={onClose} />
              )}
            </Box>
            <Box
              sx={{
                background:
                  'linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%)',
                flex: 3,
              }}
            >
              <Image src={'/ecomerce.png'} />
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
