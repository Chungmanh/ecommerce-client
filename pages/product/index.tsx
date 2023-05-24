import { Box, Image, Text } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { memo } from 'react';
import Stars from '../../components/rating/star';

interface Props {
  name: string;
  image: string;
  price: number;
  star: number;
  // frontMatter: FrontMatter;
}

const Product: React.FC<Props> = ({ name, image, price, star }) => {
  return (
    <Box
      sx={{
        // width: {
        //   sm: '50%',
        //   md: '33.33%',
        //   lg: '25%',
        //   xl: '20%',
        //   '2xl': '16.66%',
        // },
        width: '198px',
        padding: '10px 5px',
      }}
    >
      <Box
        sx={{
          boxSizing: 'border-box',
          boxShadow: '0 0.0625rem 0.125rem 0 rgb(0 0 0 / 10%)',
          ':hover': {
            boxShadow: '0 2px 4px 0 rgb(0 0 0 / 25%)',
            cursor: 'pointer',
          },
          width: '100%',
          backgroundColor: '#fff',
        }}
      >
        <Image
          display={'block'}
          src={image}
          alt={name}
          style={{ width: '100%', height: '191px', objectFit: 'cover' }}
        />
        <Box
          sx={{
            padding: '8px',
          }}
        >
          <Text
            sx={{
              height: '38px',
              fontSize: '12px',
              overflow: 'hidden',
              whiteSpace: 'pre-wrap',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            {name}
          </Text>
          <Box color={'#ee4d2d'}>
            <span style={{ fontSize: '12px' }}>₫</span>
            <span style={{ fontSize: '18px' }}>{price}</span>
          </Box>
          <Box sx={{ display: 'flex', padding: '3px 0px', height: '25px' }}>
            {star ? (
              <>
                <Stars star={star} size={'14px'} />
                <span style={{ fontSize: '12px', color: '#9e9e9e' }}>
                  ({star})
                </span>
              </>
            ) : (
              <Text
                sx={{
                  color: '#767676',
                  fontSize: '12px',
                }}
              >
                Chưa Có Đánh Giá
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Product);
