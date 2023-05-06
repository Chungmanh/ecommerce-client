import { Box, Text, Divider } from '@chakra-ui/react';
import Link from 'next/link';
import { NavLink } from './NavLink';
import { FaUsers } from 'react-icons/fa';
import { RiProductHuntLine } from 'react-icons/ri';
import { BiStore, BiCategory } from 'react-icons/bi';
import styles from '../styles/Shop.module.css';
import { ClassNames } from '@emotion/react';

const SidebarAdmin = () => {
  return (
    <Box sx={{ padding: '0px 16px' }} className={styles.sidebar}>
      <Box sx={{ width: '228px' }}>
        <Box>
          <NavLink
            href={'/admin/category'}
            sx={{
              padding: '10px 16px 10px 24px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '4px',
            }}
          >
            <BiCategory size={18} style={{ marginRight: '10px' }} />
            <Text>Danh Mục</Text>
          </NavLink>
        </Box>
        <Box>
          <NavLink
            href={'/admin/product'}
            sx={{
              padding: '10px 16px 10px 24px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '4px',
            }}
          >
            <RiProductHuntLine size={18} style={{ marginRight: '10px' }} />
            <Text>Sản phẩm</Text>
          </NavLink>
        </Box>
        <Box>
          <NavLink
            href={'/admin/shop'}
            sx={{
              padding: '10px 16px 10px 24px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '4px',
            }}
          >
            <BiStore size={18} style={{ marginRight: '10px' }} />
            <Text>Cửa hàng</Text>
          </NavLink>
        </Box>
        <Box>
          <NavLink
            href={'/admin/user'}
            sx={{
              padding: '10px 16px 10px 24px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '4px',
            }}
          >
            <FaUsers size={18} style={{ marginRight: '10px' }} />
            <Text>Người dùng</Text>
          </NavLink>
        </Box>
      </Box>
      <Divider orientation="horizontal" />
    </Box>
  );
};

export default SidebarAdmin;
