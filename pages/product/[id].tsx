import { Box, Avatar, Divider, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Stars from '../../components/rating/star';
import { BsCartPlus } from 'react-icons/bs';
import { addToCart } from '../../common/apis/cartApi';
import { addStart, addSuccess } from '../../redux/cartSlice';
import { onOpen } from '../../redux/actionSlice';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const ProductDetail = (props: any) => {
  const { product } = props;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async (quantity: number = 1) => {
    const user = JSON.parse(`${localStorage.getItem('user')}`);
    if (user) {
      dispatch(addStart());
      const success = await addToCart({ productId: product._id, quantity });
      // console.log('success: ', success);
      if (success) {
        dispatch(addSuccess(success.total));
      }
    } else {
      dispatch(onOpen(true));
    }
  };

  const handleBuyNow = async (quantity: number = 1) => {
    const user = JSON.parse(`${localStorage.getItem('user')}`);
    if (user) {
      dispatch(addStart());
      const success = await addToCart({ productId: product._id, quantity });
      // console.log('success: ', success);
      if (success) {
        dispatch(addSuccess(success.total));
      }
    } else {
      dispatch(onOpen(true));
    }
  };
  console.log('product: ', product);

  return (
    <div>
      <Head>
        <title>Product</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ backgroundColor: '#f5f5fa' }}>
        <Box
          sx={{
            display: 'flex',
            width: '1240px',
            margin: '0px auto',
            backgroundColor: '#fff',
          }}
        >
          <Box sx={{ padding: '16px 0px 16px 16px' }}>
            <Box
              as="img"
              src={product.avatar}
              style={{
                display: 'block',
                maxWidth: '400px',
                width: '400px',
                height: '400px',
                objectFit: 'cover',
              }}
            />
          </Box>
          <Box sx={{ margin: '0px 12px' }}>
            <Divider orientation="vertical" />
          </Box>
          <Box>
            <Box sx={{ padding: '16px 28px 16px 0px' }}>
              <Box
                sx={{
                  fontSize: '13px',
                  color: 'rgb(36, 36, 36)',
                  lineHeight: '20px',
                }}
              >
                Thương hiệu:{' '}
                <span style={{ color: 'rgb(13, 92, 182)' }}>
                  {product?.trademarkName?.name || 'No Brand'}
                </span>
              </Box>
              <Box
                sx={{
                  margin: '0px 0px 4px',
                  color: 'rgb(36, 36, 36)',
                  fontSize: '24px',
                  lineHeight: '32px',
                }}
              >
                {product.name}
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Stars star={3} size={'14px'} />{' '}
                <Box
                  sx={{
                    cursor: 'pointer',
                    marginLeft: '8px',
                    color: 'rgb(120, 120, 120)',
                    fontSize: '15px',
                  }}
                >
                  (Xem {product?.reviews?.length || 0} đánh giá)
                  {/* | Đã bán 5000+ */}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: 'rgb(250, 250, 250)',
                borderRadius: '4px',
                padding: '0px 16px 12px',
                boxSizing: 'border-box',
              }}
            >
              <Box
                sx={{
                  fontSize: '32px',
                  margin: '0px 8px',
                  height: '66px',
                  fontWeight: 400,
                  color: '#FF424E',
                }}
              >
                {product.price} ₫
              </Box>
            </Box>
            {/* <Box
              sx={{
                display: 'flex',
                fontSize: '.875rem',
                alignItems: 'center',
                margin: '20px 0px',
              }}
            >
              <Box
                as="span"
                sx={{
                  color: '#757575',
                  width: '110px',
                }}
              >
                Loại
              </Box>
              <Box sx={{ fontWeight: 100 }}>
                <Button
                  size={'sm'}
                  sx={{ marginRight: '8px', fontWeight: 400 }}
                  _focus={{
                    color: 'rgb(13, 92, 182)',
                    transform: 'scale(0.98)',
                    borderColor: 'rgb(13, 92, 182)',
                  }}
                  variant="outline"
                >
                  Trắng
                </Button>
                <Button
                  size={'sm'}
                  sx={{ marginRight: '8px', fontWeight: 400 }}
                  _focus={{
                    color: 'rgb(13, 92, 182)',
                    transform: 'scale(0.98)',
                    borderColor: 'rgb(13, 92, 182)',
                  }}
                  variant="outline"
                >
                  Đen
                </Button>
                <Button
                  size={'sm'}
                  sx={{ marginRight: '8px', fontWeight: 400 }}
                  _focus={{
                    color: 'rgb(13, 92, 182)',
                    transform: 'scale(0.98)',
                    borderColor: 'rgb(13, 92, 182)',
                  }}
                  variant="outline"
                >
                  Xanh
                </Button>
              </Box>
            </Box> */}
            <Box
              sx={{
                display: 'flex',
                color: '#757575',
                fontSize: '.875rem',
                alignItems: 'center',
                margin: '20px 0px',
              }}
            >
              <Box
                as={'span'}
                sx={{
                  width: '110px',
                }}
              >
                Số lượng
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box
                  as="button"
                  sx={{
                    boxSizing: 'border-box',
                    border: '1px solid rgba(0,0,0,.09)',
                    padding: '1px 6px',
                    width: '32px',
                    height: '32px',
                    textAlign: 'center',
                  }}
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    border: '1px solid rgba(0,0,0,.09)',
                    borderLeft: 0,
                    borderRight: 0,
                    width: '50px',
                    height: '32px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {quantity}
                </Box>
                <Box
                  as="button"
                  sx={{
                    boxSizing: 'border-box',
                    border: '1px solid rgba(0,0,0,.09)',
                    padding: '1px 6px',
                    width: '32px',
                    height: '32px',
                    textAlign: 'center',
                  }}
                  disabled={quantity >= product.quantity}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Box>
              </Box>
              <Box as="span" sx={{ marginLeft: '15px' }}>
                {product.quantity} sản phẩm có sẵn
              </Box>
            </Box>
            <Box>
              <Button
                leftIcon={<BsCartPlus />}
                variant="outline"
                sx={{ marginRight: '12px', height: '48px' }}
                onClick={() => handleAddToCart()}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="solid"
                sx={{
                  backgroundColor: '#EE4D2D',
                  color: '#fff',
                  height: '48px',
                }}
                onClick={() => handleBuyNow()}
              >
                Mua ngay
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '1240px',
            margin: '16px auto',
            backgroundColor: '#fff',
          }}
        >
          <Box
            sx={{
              padding: '16px 0px 16px 16px',
            }}
          >
            <Text
              sx={{
                fontSize: '20px',
                marginBottom: '12px',
              }}
            >
              Mô Tả Sản Phẩm
            </Text>
            <Box
              sx={{
                fontSize: '14px',
              }}
            >
              {product.description}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '1240px',
            margin: '16px auto',
            backgroundColor: '#fff',
          }}
        >
          <Box
            sx={{
              padding: '16px 0px 16px 16px',
              width: '100%',
            }}
          >
            <Text
              sx={{
                fontSize: '20px',
                marginBottom: '12px',
              }}
            >
              Đánh Giá - Nhận Xét Từ Khách Hàng
            </Text>
            {product?.reviews &&
              product?.reviews.length !== 0 &&
              product?.reviews?.map((review: any, index: number) => (
                <Box
                  sx={{
                    display: 'flex',
                    borderTop: '1px solid rgb(242, 242, 242)',
                    padding: '32px 48px',
                  }}
                  key={index}
                >
                  <Box
                    sx={{
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                      }}
                    >
                      <Avatar
                        name="Sasuke Uchiha"
                        src="https://bit.ly/broken-link"
                      />
                      <Box sx={{ marginLeft: '12px', fontSize: '.75rem' }}>
                        <Text
                          sx={{
                            color: 'rgba(0,0,0,.87)',
                          }}
                        >
                          {review?.userId?.username}
                        </Text>
                        <Text
                          sx={{
                            // marginTop: '0.75rem',
                            color: 'rgba(0,0,0,.54)',
                          }}
                        >
                          {moment(review?.createdAt).format('DD/MM/YYYY')}
                        </Text>
                        {/* <Text>Đã tham gia 2 năm</Text> */}
                      </Box>
                    </Box>
                    {/* <Text>Ngày nhận xét: 2023-01-08 16:00</Text> */}
                  </Box>
                  <Box
                    sx={{
                      flex: 2,
                    }}
                  >
                    <Stars star={review?.vote || 5} size={'14px'} />
                    <Text>{review?.comment || 5}</Text>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  // console.log(context.params);
  const id = context.params.id;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/product/${id}`,
    { headers: { 'content-type': 'application/json' } }
  );

  return {
    props: {
      product: data,
    }, // will be passed to the page component as props
  };
}

export default ProductDetail;
