import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Product from '../../pages/product/index';
import { recommend } from '../../common/apis/actionApi';
import { memo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';

const Recommend = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // variableWidth: true,
    // slidesPerRow: 1,
  };

  const router = useRouter();
  const [productsRecommend, setProductsRecommend] = useState<any[]>([]);

  const recommendSystem = async () => {
    const user = JSON.parse(`${localStorage.getItem('user')}`);
    if (user) {
      const recommend_Product = await recommend();
      if (recommend_Product && recommend_Product.length !== 0) {
        setProductsRecommend(recommend_Product);
      }
    }
  };
  const handleClickProduct = async (id: string) => {
    await router.push(`/product/${id}`);
  };

  useEffect(() => {
    recommendSystem();
  }, []);
  console.log('productsRecommend: ', productsRecommend);

  return (
    <Box
      sx={{
        width: '95%',
        margin: '0 auto',
        paddingTop: '16px',
      }}
    >
      {productsRecommend && productsRecommend.length !== 0 && (
        <Text>Có thể bạn sẽ thích</Text>
      )}
      <Slider {...settings}>
        {productsRecommend &&
          productsRecommend?.map((product) => (
            /* {products?.map((product) => ( */
            <Box
              key={product._id}
              sx={{
                height: 'max-content',
                // backgroundColor: 'red',
                width: '198px !important',
              }}
              onClick={() => {
                handleClickProduct(product._id);
              }}
            >
              <Product
                name={product.name}
                image={product.avatar}
                price={product.price}
                star={product.star}
              />
            </Box>
          ))}
      </Slider>
    </Box>
  );
};

export default memo(Recommend);
