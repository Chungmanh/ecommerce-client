import { Box, Text, Divider, FormControl, Select } from '@chakra-ui/react';
import ItemMenu from './ItemMenuSidebarHone';
import { useEffect, useState } from 'react';
import { insertQueryCategoryId, insertQuerySort } from '../../redux/querySlice';
import { useSelector, useDispatch } from 'react-redux';

const active = {
  height: '31px',
  lineHeight: '31px',
  borderRadius: '2px',
  color: '#fff',
  backgroundColor: '#4f95ba',
  padding: '0 15px',
  marginLeft: '15px',
  cursor: 'pointer',
};

const notActive = {
  height: '31px',
  lineHeight: '31px',
  borderRadius: '2px',
  backgroundColor: '#fff',
  padding: '0 15px',
  marginLeft: '15px',
  cursor: 'pointer',
};

const SortBar = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: any) => state.search.query);
  console.log('query: ', query);

  const handleChangeQuerySort = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const sort = {
      [name]: Number(value),
    };
    dispatch(insertQuerySort(sort));
  };

  const handleClickQuerySort = (name: string, value: string) => {
    const sort = {
      [name]: Number(value),
    };
    dispatch(insertQuerySort(sort));
  };

  useEffect(() => {}, []);
  return (
    <Box
      sx={{
        backgroundColor: '#00000008',
        padding: '0.8125rem 1.25rem',
        margin: '0 5px',
        borderRadius: '2px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          // justifyContent: 'space-between',
        }}
      >
        <Text sx={{ width: 'max-content', color: '#555', fontSize: '.875rem' }}>
          Sắp xếp theo
        </Text>
        <Box
          sx={
            query && query?.sort && query?.sort?.numberOfOrders === 1
              ? active
              : notActive
          }
          onClick={() => {
            handleClickQuerySort('numberOfOrders', '1');
          }}
        >
          Phổ biến
        </Box>
        <Box
          sx={
            query && query?.sort && query?.sort?.createdAt === 1
              ? active
              : notActive
          }
          onClick={() => {
            handleClickQuerySort('createdAt', '1');
          }}
        >
          Mới nhất
        </Box>
        {/* <Box
          sx={{
            height: '31px',
            lineHeight: '31px',
            borderRadius: '2px',
            backgroundColor: '#fff',
            padding: '0 15px',
            marginLeft: '15px',
            cursor: 'pointer',
          }}
        >
          Bán chạy
        </Box> */}
        <Select
          // placeholder="Giá"
          marginLeft={'15px'}
          name={'price'}
          size="sm"
          width={'180px'}
          backgroundColor={'#fff'}
          // value={''}
          defaultValue={''}
          // color={'red'}
          onChange={(e) => {
            handleChangeQuerySort(e);
          }}
        >
          <option value="" disabled>
            Giá
          </option>
          <option value="1">Giá: Thấp đến Cao</option>
          <option value="-1">Giá: Cao đến Thấp</option>
        </Select>
      </Box>
      <Divider orientation="horizontal" />
    </Box>
  );
};

export default SortBar;
