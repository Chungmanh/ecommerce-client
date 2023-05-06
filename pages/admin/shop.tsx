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
} from '@chakra-ui/react';
import Head from 'next/head';
import CategoryModal from '../../components/CategoryModalAdmin';
import { MdStorefront } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
import { BsTrash3 } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { getAllShops } from '../../common/admin/shopApi';
import { useState, useEffect } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import Swal from 'sweetalert2';

const Shop = () => {
  const [shops, setShops] = useState<any[]>([]);

  const reloadPage = async () => {
    await getShops();
  };

  async function getShops() {
    const listShops = await getAllShops();
    setShops(listShops);
  }

  useEffect(() => {
    console.log('run useEffect');
    getShops();
  }, []);

  return (
    <div>
      <Head>
        <title>My Order</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ padding: '20px 0px 50px 0px' }}>
        <Box display={'flex'} sx={{ margin: '0 auto' }}>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Thông tin danh sách cửa hàng</TableCaption>
              <Thead>
                <Tr>
                  <Th textAlign={'center'}>STT</Th>
                  <Th textAlign={'center'}>Tên cửa hàng</Th>
                  <Th textAlign={'center'}>Ảnh</Th>
                  <Th textAlign={'center'}>Địa chỉ</Th>
                  <Th textAlign={'center'}>SĐT</Th>
                  <Th textAlign={'center'}>Trạng thái</Th>
                  <Th textAlign={'center'}>Thao tác</Th>
                </Tr>
              </Thead>
              <Tbody>
                {shops &&
                  shops?.length > 0 &&
                  shops?.map((shop, index) => (
                    <Tr key={shop._id}>
                      <Td>{index + 1}</Td>
                      <Td>{shop?.name || ''}</Td>
                      <Td>
                        <img
                          src={`${shop?.avatar}` || ''}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                          }}
                        />
                      </Td>
                      <Td>{shop?.address || ''}</Td>
                      <Td>{shop?.telephone || ''}</Td>
                      <Td textAlign={'center'}>
                        {shop?.status ? (
                          <Badge
                            textTransform={'capitalize'}
                            colorScheme="green"
                          >
                            Active
                          </Badge>
                        ) : (
                          <Badge textTransform={'capitalize'} colorScheme="red">
                            InActive
                          </Badge>
                        )}
                      </Td>
                      <Td>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <CiEdit
                            size={18}
                            style={{
                              cursor: 'pointer',
                            }}
                          />
                          <BsTrash3
                            size={16}
                            style={{
                              cursor: 'pointer',
                            }}
                          />
                        </Box>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

Shop.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default Shop;
