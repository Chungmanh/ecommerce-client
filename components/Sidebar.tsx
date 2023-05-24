import { Box, Text, Divider } from '@chakra-ui/react';
import Link from 'next/link';
import { NavLink } from './NavLink';
import {
  AiOutlineTrademark,
  AiOutlineLineChart,
  AiOutlineInfoCircle,
} from 'react-icons/ai';
import { BsCardChecklist } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { RiProductHuntLine, RiTrademarkFill } from 'react-icons/ri';
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
            href={'/shop/home'}
            sx={{
              padding: '10px 16px 10px 24px',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 1.5,
              marginBottom: '4px',
            }}
          >
            <AiOutlineInfoCircle size={18} style={{ marginRight: '10px' }} />
            <Text>Thông tin</Text>
          </NavLink>
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
            href={'/shop/trademark'}
            sx={{
              padding: '10px 16px 10px 24px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '4px',
            }}
          >
            <AiOutlineTrademark size={18} style={{ marginRight: '10px' }} />
            <Text>Thương hiệu</Text>
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
            <BsCardChecklist size={18} style={{ marginRight: '10px' }} />
            <Text>Đơn Hàng</Text>
          </NavLink>
        </Box>
        <Box>
          <NavLink
            href={'/shop/revenue'}
            sx={{
              padding: '10px 16px 10px 24px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '4px',
            }}
          >
            <AiOutlineLineChart size={18} style={{ marginRight: '10px' }} />
            <Text>Doanh thu</Text>
          </NavLink>
        </Box>
      </Box>
      <Divider orientation="horizontal" />
    </Box>
  );
};

export default Sidebar;
