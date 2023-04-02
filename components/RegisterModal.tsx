import {
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Text,
  Box,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { TfiAngleLeft } from 'react-icons/tfi';
import { register, IUser } from '../common/apis/authApi';
import Swal from 'sweetalert2';

interface IProps {
  setIsLogin: Function;
  onClose: Function;
}

const Register = (props: IProps) => {
  const { setIsLogin, onClose } = props;
  const formik = useFormik({
    initialValues: {
      username: '',
      telephone: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await register(values);
        onClose();
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công',
          showConfirmButton: false,
          timer: 1000,
        });
      } catch (error: any) {
        onClose();

        Swal.fire({
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  });
  return (
    <>
      <ModalHeader>
        <Box marginTop={'10px'}>
          <TfiAngleLeft cursor={'pointer'} onClick={() => setIsLogin(true)} />
        </Box>
        <Text fontSize={15} marginTop={'10px'}>
          Tạo tài khoản
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <Input
              placeholder="Tên người dùng"
              type={'text'}
              name={'username'}
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </FormControl>
          <FormControl marginTop={'15px'}>
            <Input
              placeholder="Số điện thoại"
              type={'text'}
              name={'telephone'}
              onChange={formik.handleChange}
              value={formik.values.telephone}
            />
          </FormControl>
          <FormControl marginTop={'15px'}>
            <Input
              placeholder="Mật khẩu"
              type={'password'}
              name={'password'}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </FormControl>
          {/* <FormControl marginTop={'20px'}>
            <Input placeholder="Nhập Lại mật khẩu" type={'password'} />
          </FormControl> */}
          <Button
            marginTop={'20px'}
            colorScheme="twitter"
            width={'100%'}
            type={'submit'}
          >
            Đăng ký
          </Button>
        </form>
      </ModalBody>

      <ModalFooter justifyContent={'start'} display={'block'}>
        <Box>
          <Link href={'/'}>
            <Text color={'rgb(13, 92, 182)'} fontSize={'13px'}>
              Quên mật khẩu?
            </Text>
          </Link>
        </Box>
      </ModalFooter>
    </>
  );
};

export default Register;
