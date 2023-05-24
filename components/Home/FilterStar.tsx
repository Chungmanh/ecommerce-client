import { Box, Text } from '@chakra-ui/react';
import Stars from '../rating/star';
import { useEffect, useState } from 'react';
import { selectQureyByStar } from '../../redux/querySlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

const FilterStar = () => {
  const dispatch = useDispatch();
  const handleSelectStar = (value: number) => {
    dispatch(selectQureyByStar(value));
  };

  return (
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
        <Text
          sx={{
            marginBottom: '8px',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '150%',
          }}
        >
          Đánh giá
        </Text>
        <Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            cursor="pointer"
            onClick={() => {
              handleSelectStar(5);
            }}
          >
            <Stars star={5} />{' '}
            <span
              style={{ fontSize: '13px', color: '#242424', marginLeft: '5px' }}
            >
              từ 5 sao
            </span>
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            mt={2}
            cursor="pointer"
            onClick={() => {
              handleSelectStar(4);
            }}
          >
            <Stars star={4} />{' '}
            <span
              style={{ fontSize: '13px', color: '#242424', marginLeft: '5px' }}
            >
              từ 4 sao
            </span>
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            mt={2}
            cursor="pointer"
            onClick={() => {
              handleSelectStar(3);
            }}
          >
            <Stars star={3} />{' '}
            <span
              style={{ fontSize: '13px', color: '#242424', marginLeft: '5px' }}
            >
              từ 3 sao
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterStar;
