import { Box, Avatar, WrapItem, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import Product from '../product';
import Sidebar from '../../components/Shop/SidebarShop';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import { getProductsByQuery } from '../../common/apis/productApi';
import SortBar from '../../components/Home/SortBar';
import { addStart, addSuccess } from '../../redux/cartSlice';
import { refreshQuery } from '../../redux/querySlice';
import { onOpen } from '../../redux/actionSlice';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';
import moment from 'moment';

const ProductDetail = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const query = useSelector((state: any) => state.search.query);
  console.log('query: ', query);

  const { info } = props;
  console.log('data: ', data);

  const handleClickProduct = async (id: string) => {
    await router.push(`/product/${id}`);
  };

  async function queryProduct(query: {}) {
    const queryOfShop = { ...query, shopId: info?.shop?._id || '' };
    const data = await getProductsByQuery(queryOfShop);
    setData(data[0]);
  }

  const handlePageClick = async (event: any) => {
    console.log('event: ', event);

    const skip = event.selected * query.limit;
    const queryLimit = {
      ...query,
      skip,
    };
    await queryProduct(queryLimit);
  };

  const pageCount =
    Math.ceil(
      data?.metadata &&
        data?.metadata?.length !== 0 &&
        data?.metadata[0]?.total / query.limit
    ) || 1;
  const forcePage =
    (data?.metadata &&
      data?.metadata?.length !== 0 &&
      data?.metadata[0]?.page) ||
    0;

  useEffect(() => {
    console.log('useEffect');
    queryProduct(query);
  }, [query]);

  console.log('render');

  return (
    <div>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ backgroundColor: '#f5f5fa' }}>
        <Box
          sx={{
            width: '1250px',
            margin: '0px auto',
          }}
        >
          <Box pt={3} pb={3}>
            <Box
              sx={{
                padding: '10px',
                marginBottom: '15px',
                overflow: 'hidden',
                boxShadow:
                  'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
                borderRadius: '6px',
                backgroundColor: '#fff',

                display: 'flex',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '10px',
                }}
              >
                <WrapItem>
                  <Avatar
                    size="xl"
                    name={info?.shop?.name || ''}
                    src={info?.shop?.avatar || ''}
                  />
                </WrapItem>
                <Box ml={4}>
                  <Text
                    sx={{
                      fontSize: '20px',
                      fontWeight: 500,
                      color: '#2d4d72',
                    }}
                  >
                    {info?.shop?.name || ''}
                  </Text>
                  <Text
                    sx={{
                      fontSize: '14px',
                      color: '#696c6f',
                    }}
                  >
                    Sản phẩm: <span>{info?.totalProduct || 0}</span>
                  </Text>
                  <Text
                    sx={{
                      fontSize: '12px',
                      color: '#696c6f',
                    }}
                  >
                    Ngày tham gia:{' '}
                    <span>
                      {moment(info?.shop?.createdAt).format('DD/MM/YYYY')}
                    </span>
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Sidebar shopId={info?.shop?._id} />

              <Box
                sx={{
                  padding: '10px',
                  overflow: 'hidden',
                  boxShadow:
                    'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
                  borderRadius: '6px',
                  backgroundColor: '#fff',
                  width: '100%',
                }}
              >
                <SortBar />
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    height: 'max-content',
                  }}
                >
                  {data?.products && data?.products?.length === 0 ? (
                    <Box sx={{ margin: '0 auto' }}>
                      Hiện không có sản phẩm phù hợp
                    </Box>
                  ) : (
                    data?.products &&
                    data?.products?.map((product: any) => (
                      <Box
                        key={product._id}
                        sx={{ height: 'max-content' }}
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
                    ))
                  )}
                </Box>
                <ReactPaginate
                  breakLabel="..."
                  // nextLabel=">"
                  nextLabel={
                    <Box className="num-next">
                      <TfiAngleRight />
                    </Box>
                  }
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={1}
                  pageCount={pageCount}
                  forcePage={forcePage}
                  previousLabel={
                    <Box className="num-previous">
                      <TfiAngleLeft />
                    </Box>
                  }
                  renderOnZeroPageCount={null}
                  containerClassName={'pagination'}
                  pageLinkClassName={'page-num'}
                  previousLinkClassName={'page-num-previous'}
                  nextLinkClassName={'page-num-next'}
                  activeLinkClassName={'active'}
                />
              </Box>
            </Box>
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
    `${process.env.NEXT_PUBLIC_APP_API_URL}/shop/get-shop/${id}`,
    { headers: { 'content-type': 'application/json' } }
  );

  return {
    props: {
      info: data,
    },
  };
}

export default ProductDetail;
