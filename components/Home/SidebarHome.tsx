import { Box, Text, Divider } from '@chakra-ui/react';
import Link from 'next/link';
import { HiOutlineHome, HiOutlineUser } from 'react-icons/hi';
import { RiProductHuntLine } from 'react-icons/ri';
import { ClassNames } from '@emotion/react';
import ItemMenu from './ItemMenuSidebarHone';

const menu_data = [
  {
    image: '/icon-menu/bear.png',
    title: 'Đồ Chơi - Mẹ & Bé',
  },
  {
    image: '/icon-menu/food.png',
    title: 'NGON',
  },
  {
    image: '/icon-menu/phone.png',
    title: 'Điện Thoại - Máy Tính Bảng',
  },
  {
    image: '/icon-menu/beauty-health.png',
    title: 'Làm Đẹp - Sức Khỏe',
  },
  {
    image: '/icon-menu/electrical-equipment.png',
    title: 'Điện Gia Dụng',
  },
  {
    image: "/icon-menu/women's-fashion.png",
    title: 'Thời trang nữ',
  },
  {
    image: "/icon-menu/men's-fashion.png",
    title: 'Thời trang nam',
  },
  {
    image: "/icon-menu/women's-shoes.png",
    title: 'Giày - Dép nữ',
  },
  {
    image: "/icon-menu/women's-fashion-bags.png",
    title: 'Túi thời trang nữ',
  },
  {
    image: "/icon-menu/men's-shoes.png",
    title: 'Giày - Dép nam',
  },
  {
    image: "/icon-menu/men's-fashion-bag.png",
    title: 'Túi thời trang nam',
  },
  {
    image: '/icon-menu/backpacks-and-suitcases.png',
    title: 'Balo và Vali',
  },
  {
    image: '/icon-menu/fashion-accessories.png',
    title: 'Phụ kiện thời trang',
  },
  {
    image: '/icon-menu/watches-and-jewelry.png',
    title: 'Đồng hồ và Trang sức',
  },
  {
    image: '/icon-menu/laptop.png',
    title: 'Laptop - Máy Vi Tính - Linh kiện',
  },
  {
    image: '/icon-menu/home-life.png',
    title: 'Nhà Cửa - Đời Sống',
  },
  {
    image: '/icon-menu/online-store.png',
    title: 'Bách Hóa Online',
  },
];

const Sidebar = () => {
  return (
    <Box sx={{ padding: '0px 16px' }}>
      <Box
        sx={{
          width: '228px',
          backgroundColor: '#fff',
          padding: '12px 8px',
          borderRadius: '8px',
        }}
      >
        <Box
          sx={{
            marginBottom: '8px',
            paddingLeft: '16px',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '150%',
            color: 'rgb(39, 39, 42)',
          }}
        >
          <Text>Danh mục</Text>
        </Box>
        {menu_data &&
          menu_data.map((item, index) => (
            <Box key={index}>
              <ItemMenu image={item.image} title={item.title} />
            </Box>
          ))}
      </Box>
      <Divider orientation="horizontal" />
    </Box>
  );
};

export default Sidebar;
