import { Box, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { HiOutlineHome, HiOutlineUser } from 'react-icons/hi';
import { RiProductHuntLine } from 'react-icons/ri';
import { ClassNames } from '@emotion/react';
import { getAllCategory, ICategory } from '../../common/apis/categoryApi';
import ItemMenu from './ItemMenuSidebarHone';
import FilterPrice from './FilterPrice';
import FilterStar from './FilterStar';
import { useEffect, useState, memo } from 'react';
import { insertQueryCategoryId, refreshQuery } from '../../redux/querySlice';
import { useSelector, useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const query = useSelector((state: any) => state.search.query);

  const handleInsertQuery = (value: string) => {
    dispatch(insertQueryCategoryId(value));
  };

  const handleRefreshQuery = () => {
    dispatch(refreshQuery());
  };

  async function getCategories() {
    const categories = await getAllCategory();
    setCategories(categories);
  }

  useEffect(() => {
    handleRefreshQuery();
    getCategories();
  }, []);

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
        {categories &&
          categories.map((item, index) => (
            <Box
              key={index}
              onClick={() => {
                handleInsertQuery(item._id);
              }}
            >
              <ItemMenu
                image={item.avatar}
                title={item.name}
                isActive={query.categoryId === item._id}
              />
            </Box>
          ))}
      </Box>

      <FilterStar />
      <FilterPrice />
      <Box
        sx={{
          width: '228px',
          backgroundColor: '#fff',
          padding: '12px 8px',
          borderRadius: '8px',
        }}
        mt={3}
      >
        <Box
          sx={{
            padding: '0px 16px',
            color: 'rgb(39, 39, 42)',
          }}
        >
          <Button
            colorScheme="twitter"
            size={'sm'}
            sx={{ width: '100%' }}
            onClick={handleRefreshQuery}
          >
            XÓA TẤT CẢ
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Sidebar);
