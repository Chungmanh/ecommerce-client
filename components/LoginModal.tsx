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
import { login, IUser } from '../common/apis/authApi';
import { loginStart, loginSuccess } from '../redux/authSlice';
import { addStart, addSuccess } from '../redux/cartSlice';
import { getAllCartItem } from '../common/apis/cartApi';

import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

interface IProps {
  setIsLogin: Function;
  onClose: Function;
}

const Login = (props: IProps) => {
  const { setIsLogin, onClose } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const handleGetCart = async () => {
    const cart = await getAllCartItem();
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch(addSuccess(cart.total));
  };

  const formik = useFormik({
    initialValues: {
      telephone: '',
      password: '',
    },
    validationSchema: Yup.object({
      telephone: Yup.string()
        .max(10, 'Số điện thoại chưa đúng định dạng')
        .required('Chưa nhập số điện thoại'),
      password: Yup.string().required('Chưa nhập mật khẩu'),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(loginStart());
        const { accessToken, refreshToken, ...user } = await login(values);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
        if (user && user.admin) {
          await router.push('/admin');
          // router.reload();
          onClose();
        }
        if (user && !user.admin) {
          dispatch(loginSuccess(user));
          handleGetCart();
          onClose();
        }
      } catch (error: any) {
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
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
        <Text fontSize={26} fontWeight={500}>
          Xin chào
        </Text>
        <Text fontSize={15} marginTop={'10px'}>
          Đăng nhập hoặc Tạo tài khoản
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <Input
              placeholder="Email/Số điện thoại/Tên đăng nhập"
              type={'text'}
              name={'telephone'}
              onChange={formik.handleChange}
              value={formik.values.telephone}
            />
            {formik.touched.telephone && formik.errors.telephone ? (
              <span style={{ fontSize: '12px', color: 'red' }}>
                {formik.errors.telephone}
              </span>
            ) : null}
          </FormControl>
          <FormControl marginTop={'20px'}>
            <Input
              placeholder="Mật khẩu"
              type={'password'}
              name={'password'}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <span style={{ fontSize: '12px', color: 'red' }}>
                {formik.errors.password}
              </span>
            ) : null}
          </FormControl>
          <Button
            marginTop={'20px'}
            colorScheme="twitter"
            width={'100%'}
            type={'submit'}
          >
            Đăng nhập
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
        <Box display={'flex'} fontSize={'13px'} marginTop={'10px'}>
          <Text color={'rgb(120, 120, 120)'}>Chưa có tài khoản?</Text>
          {/* <Link href={'/'}> */}
          <Text
            color={'rgb(13, 92, 182)'}
            cursor={'pointer'}
            onClick={() => setIsLogin(false)}
          >
            Tạo tài khoản
          </Text>
          {/* </Link> */}
        </Box>
      </ModalFooter>
    </>
  );
};

export default Login;
