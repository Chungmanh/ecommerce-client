import type { ReactElement } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  Badge,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import Head from 'next/head';
import CategoryModal from '../../components/CategoryModalAdmin';
import { MdStorefront } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
import { BsTrash3 } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import {
  getAllProducts,
  getProductsByQueryV2,
  changeStatus,
} from '../../common/admin/productApi';
import { useState, useEffect } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import TableProductComponent from '../../components/Admin/TableProduct';
import Swal from 'sweetalert2';

const Product = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [status, setStatus] = useState<number>(1);

  const reloadPage = async () => {
    await getProducts();
  };

  async function getProducts() {
    const listProducts = await getProductsByQueryV2({ status });
    setProducts(listProducts);
  }

  const handlechangeStatus = async (productId: string, status: number) => {
    // console.log('productId: ', productId, status);

    const updated = await changeStatus(productId, status);
    if (updated) {
      reloadPage();
    }
  };
  useEffect(() => {
    console.log('run useEffect');
    getProducts();
  }, [status]);

  return (
    <div>
      <Head>
        <title>My Order</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ padding: '20px 0px 50px 0px' }}>
        <Box display={''} sx={{ margin: '0 auto' }}>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab
                onClick={() => {
                  setStatus(0);
                }}
              >
                Tất cả
              </Tab>
              <Tab
                onClick={() => {
                  setStatus(1);
                }}
              >
                Chưa duyệt
              </Tab>
              <Tab
                onClick={() => {
                  setStatus(2);
                }}
              >
                Đã duyệt
              </Tab>
              <Tab
                onClick={() => {
                  setStatus(3);
                }}
              >
                Đã Loại
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TableProductComponent
                  products={products}
                  handlechangeStatus={handlechangeStatus}
                />
              </TabPanel>
              <TabPanel>
                <TableProductComponent
                  products={products}
                  handlechangeStatus={handlechangeStatus}
                />
              </TabPanel>
              <TabPanel>
                <TableProductComponent
                  products={products}
                  handlechangeStatus={handlechangeStatus}
                />
              </TabPanel>
              <TabPanel>
                <TableProductComponent
                  products={products}
                  handlechangeStatus={handlechangeStatus}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </div>
  );
};

Product.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default Product;
