import { Box, Text, Divider } from '@chakra-ui/react';
import Link from 'next/link';
import { NavLink } from './NavLink';
import { HiOutlineHome, HiOutlineUser } from 'react-icons/hi';
import { RiProductHuntLine } from 'react-icons/ri';
import styles from '../styles/Shop.module.css';
import { ClassNames } from '@emotion/react';

const Sidebar = () => {
  return (
    <Box sx={{ padding: '0px 16px' }} className={styles.sidebar}>
      <Box sx={{ width: '228px' }}>
        <Box
          sx={{
            margin: '10px 0px 0.35em',
            lineHeight: 1.66,
            display: 'block',
            color: 'rgb(18, 25, 38)',
            fontSize: '0.875rem',
            fontWeight: 500,
            padding: '6px',
            textTransform: 'capitalize',
          }}
        >
          <Text>Danh mục</Text>
        </Box>
        <Box>
          <NavLink
            href={'/shop/products'}
            sx={{
              padding: '10px 16px 10px 24px',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.5,
              marginBottom: '4px',
            }}
          >
            <RiProductHuntLine size={18} style={{ marginRight: '10px' }} />
            <Text>Sản Phẩm</Text>
          </NavLink>
        </Box>
        <Box>
          <NavLink
            href={'/shop/categorys'}
            sx={{
              padding: '10px 16px 10px 24px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '4px',
            }}
          >
            <RiProductHuntLine size={18} style={{ marginRight: '10px' }} />
            <Text>Danh Mục</Text>
          </NavLink>
        </Box>
        <Box>
          <NavLink
            href={'/shop/orders'}
            sx={{
              padding: '10px 16px 10px 24px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '4px',
            }}
          >
            <RiProductHuntLine size={18} style={{ marginRight: '10px' }} />
            <Text>Đơn Hàng</Text>
          </NavLink>
        </Box>
        <Box>
          <NavLink
            href={'/shop/customers'}
            sx={{
              padding: '10px 16px 10px 24px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '4px',
            }}
          >
            <RiProductHuntLine size={18} style={{ marginRight: '10px' }} />
            <Text>Khách hàng</Text>
          </NavLink>
        </Box>
      </Box>
      <Divider orientation="horizontal" />
    </Box>
  );
};

export default Sidebar;
