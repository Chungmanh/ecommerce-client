import { Box, Button, Input, Text } from '@chakra-ui/react';
import { changeQueryPrice } from '../../redux/querySlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

const FilterPrice = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      from: 0,
      to: '',
    },
    onSubmit: async (values) => {
      try {
        dispatch(changeQueryPrice(values));
      } catch (error: any) {
        console.log('error: ', error);
      }
    },
  });

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
          Chọn khoảng giá
        </Text>
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Input
                size={'sm'}
                placeholder="₫ Từ"
                type={'number'}
                name={'from'}
                onChange={formik.handleChange}
                value={formik.values.from}
              />
              <span
                style={{
                  fontWeight: 100,
                  padding: '10px',
                }}
              >
                {' '}
                -{' '}
              </span>
              <Input
                size={'sm'}
                placeholder="₫ Đến"
                type={'number'}
                name={'to'}
                onChange={formik.handleChange}
                value={formik.values.to}
              />
            </Box>
          </form>
          <Button
            colorScheme="blue"
            variant="outline"
            size="sm"
            sx={{ width: '100%', marginTop: '5px' }}
            onClick={formik.submitForm}
          >
            Áp dụng
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterPrice;
