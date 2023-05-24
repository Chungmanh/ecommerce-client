import { Box, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { HiOutlineHome, HiOutlineUser } from 'react-icons/hi';
import { RiProductHuntLine } from 'react-icons/ri';
import { ClassNames } from '@emotion/react';
import { getAllCategory, ICategory } from '../../common/apis/categoryApi';
import {
  getTrademarksByShopId,
  ITrademark,
} from '../../common/apis/trademarkApi';
import FilterPrice from '../Home/FilterPrice';
import FilterStar from '../Home/FilterStar';
import ItemMenu from './ItemMenuSidebarShop';
import { useEffect, useState, memo } from 'react';
import { insertQueryTrademarkId, refreshQuery } from '../../redux/querySlice';
import { useSelector, useDispatch } from 'react-redux';

const Sidebar = (props: any) => {
  const { shopId } = props;
  const dispatch = useDispatch();
  const [trademarks, setTrademarks] = useState<ITrademark[]>([]);
  const query = useSelector((state: any) => state.search.query);

  const handleInsertQuery = (value: string) => {
    dispatch(insertQueryTrademarkId(value));
  };

  const handleRefreshQuery = () => {
    dispatch(refreshQuery());
  };

  async function getTrademarks(id: string) {
    const trademarks = await getTrademarksByShopId(id);
    setTrademarks(trademarks);
  }

  useEffect(() => {
    getTrademarks(shopId);
    handleRefreshQuery();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        marginRight: '12px',
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          width: '228px',
          padding: '12px 8px',
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
          <Text>Thương hiệu</Text>
        </Box>
        {trademarks &&
          trademarks.map((item, index) => (
            <Box
              key={index}
              onClick={() => {
                handleInsertQuery(item._id);
              }}
            >
              <ItemMenu
                title={item.name}
                isActive={query.trademarkId === item._id}
              />
            </Box>
          ))}
      </Box>

      <FilterStar />
      <FilterPrice />
      <Box
        sx={{
          width: '228px',
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
