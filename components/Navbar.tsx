import {
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { FaAngleDown } from 'react-icons/fa';
import { HiOutlineHome, HiOutlineUser } from 'react-icons/hi';
import Link from 'next/link';
import { loginStart, loginSuccess } from '../redux/authSlice';
import ModalComponent from './Modal';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.login.currentUser);

  const handleLogout = async () => {
    await localStorage.removeItem('user');
    await router.push('/');
    router.reload();
  };

  useEffect(() => {
    const user = JSON.parse(`${localStorage.getItem('user')}`);
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, []);

  return (
    <Box
      sx={{
        padding: '8px 8%',
        backgroundImage:
          // 'linear-gradient(to right, var(--chakra-colors-cyan-700), var(--chakra-colors-purple-500))',
          'linear-gradient(to right, #fb5730, #e26cff)',
        color: '#fff',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '60%' }}>
          <InputGroup size="md">
            <Input
              placeholder="Bạn tìm gì hôm nay"
              backgroundColor={'#fff'}
              color={'#333'}
              border={'none'}
              boxShadow={'none'}
              _focus={{ boxShadow: 'none' }}
            />
            <InputRightElement width="max-content">
              <Button color={'rgb(10, 104, 255)'} padding={'0px 10px'}>
                Tìm Kiếm
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: 'rgba(39, 39, 42, 0.12)',
              },
            }}
          >
            <Link
              href={'/'}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <HiOutlineHome />
              <Text style={{ whiteSpace: 'nowrap' }}>Trang chủ</Text>
            </Link>
          </Box>

          {user && user.username ? (
            <Box color={'#333'} cursor={'pointer'}>
              <Menu>
                <MenuButton
                  as={Button}
                  background={'none'}
                  _hover={{ backgroundColor: 'rgba(39, 39, 42, 0.12)' }}
                  _active={{ backgroundColor: 'rgba(39, 39, 42, 0.12)' }}
                  rightIcon={<FaAngleDown color="#fff" />}
                >
                  <Box display={'flex'} alignItems={'center'} color={'#fff'}>
                    <Avatar size="sm" name={user.username} src="" />{' '}
                    <Text style={{ whiteSpace: 'nowrap', marginLeft: '5px' }}>
                      {user.username}
                    </Text>
                  </Box>
                </MenuButton>
                <MenuList>
                  <MenuItem>thông tin cá nhân</MenuItem>
                  <MenuItem>
                    <Link href={'/shop'}>Quản lý cửa hàng</Link>
                  </MenuItem>
                  <MenuItem>Lịch sử mua hàng</MenuItem>
                  <MenuItem>Sản phẩm yêu thích</MenuItem>
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : (
            <ModalComponent
              isOpen={isOpen}
              onClose={onClose}
              component={
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  padding={'8px 16px'}
                  borderRadius={'8px'}
                  cursor={'pointer'}
                  _hover={{ backgroundColor: 'rgba(39, 39, 42, 0.12)' }}
                  onClick={onOpen}
                >
                  <HiOutlineUser />
                  <Text style={{ whiteSpace: 'nowrap' }}>Tài khoản</Text>
                </Box>
              }
            />
          )}

          {/* <Box
            display={'flex'}
            alignItems={'center'}
            padding={'4px 10px'}
            borderRadius={'8px'}
            cursor={'pointer'}
            _hover={{ backgroundColor: 'rgba(39, 39, 42, 0.12)' }}
          >
            <Avatar size="sm" name="Manh Chung" src="" />
            <Text style={{ whiteSpace: 'nowrap', marginLeft: '5px' }}>
              Chung
            </Text>
          </Box> */}

          <Box
            display={'flex'}
            alignItems={'center'}
            padding={'11px'}
            borderRadius={'8px'}
            cursor={'pointer'}
            _hover={{ backgroundColor: 'rgba(0, 96, 255, 0.12)' }}
          >
            <Link href={'/cart'}>
              <FiShoppingCart size={18} />
            </Link>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', fontSize: '14px', marginTop: '5px' }}>
        <Text paddingRight={'10px'}>Dép</Text>
        <Text paddingRight={'10px'}>Áo Khoác</Text>
        <Text paddingRight={'10px'}>Áo Croptop</Text>
        <Text paddingRight={'10px'}>Túi Xách Nữ</Text>
        <Text paddingRight={'10px'}>Áo Phông</Text>
      </Box>
    </Box>
  );
};

export default Navbar;
