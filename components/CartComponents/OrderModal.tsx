import {
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { getInfoUser } from '../../common/apis/userApi';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  handlePayment: (value: any) => void;
}

const OrderModal: React.FC<IProps> = ({ isOpen, onClose, handlePayment }) => {
  const [info, setInfo] = useState<any>({
    address: '',
    telephone: '',
  });

  const formik = useFormik({
    initialValues: {
      address: `${info.address}`,
      telephone: `${info.telephone}`,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const { address, telephone } = values;
        handlePayment({ address, telephone });
        formik.resetForm();
        onClose();
      } catch (error: any) {
        console.log('error: ', error);
      }
    },
  });

  async function getUserDetail() {
    const user = await getInfoUser();
    const { address, telephone } = user;
    setInfo({ address, telephone });
  }

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
      setInfo({ address: '', telephone: '' });
    } else {
      getUserDetail();
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Xác nhận thông tin</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Địa chỉ</FormLabel>
                <Input
                  placeholder="address"
                  type={'text'}
                  name={'address'}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Số điện thoại</FormLabel>
                <Input
                  placeholder="Số điện thoại"
                  type={'text'}
                  name={'telephone'}
                  onChange={formik.handleChange}
                  value={formik.values.telephone}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={formik.submitForm}>
              Đặt hàng
            </Button>
            <Button onClick={onClose}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderModal;
