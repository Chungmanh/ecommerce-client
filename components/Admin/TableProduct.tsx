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
import { getAllProducts } from '../../common/admin/productApi';
import { useState, useEffect } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import Swal from 'sweetalert2';

const TableProductComponent = (props: any) => {
  const { products, handlechangeStatus } = props;
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Thông tin sản phẩm</TableCaption>
        <Thead>
          <Tr>
            <Th>Tên sản phẩm</Th>
            <Th textAlign={'center'}>Ảnh</Th>
            <Th textAlign={'center'}>Mô tả</Th>
            <Th textAlign={'center'}>Giá</Th>
            <Th textAlign={'center'}>Trạng thái</Th>
            <Th textAlign={'center'}>Thao tác</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.length > 0 &&
            products.map((product: any) => (
              <Tr key={product._id}>
                <Td>
                  <Box
                    sx={{
                      width: '210px',
                      fontSize: '12px',
                      overflow: 'hidden',
                      whiteSpace: 'pre-wrap',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }}
                  >
                    {product.name}
                  </Box>
                </Td>
                <Td>
                  <img
                    src={product.avatar}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                    }}
                  />
                </Td>
                <Td>
                  <Box
                    sx={{
                      width: '300px',
                      fontSize: '12px',
                      overflow: 'hidden',
                      whiteSpace: 'pre-wrap',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }}
                  >
                    {product.description}
                  </Box>
                </Td>
                <Td isNumeric>{product.price}</Td>
                <Td textAlign={'center'}>
                  <Badge
                    colorScheme={
                      product.status === 1
                        ? 'purple'
                        : product.status === 2
                        ? 'green'
                        : 'red'
                    }
                  >
                    {product.status === 1
                      ? 'Chờ phê duyệt'
                      : product.status === 2
                      ? 'Đanh hoạt động'
                      : 'Đã bị chặn'}
                  </Badge>
                </Td>
                <Td>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    {product.status === 1 && (
                      <Button
                        colorScheme="twitter"
                        variant="solid"
                        size={'xs'}
                        mr={'5px'}
                        onClick={() => handlechangeStatus(product._id, 2)}
                      >
                        Xác nhận duyệt
                      </Button>
                    )}

                    {(product.status === 1 || product.status === 2) && (
                      <Button
                        colorScheme="red"
                        variant="solid"
                        size={'xs'}
                        mr={'5px'}
                        onClick={() => handlechangeStatus(product._id, 3)}
                      >
                        Loại bỏ
                      </Button>
                    )}

                    {product.status === 3 && (
                      <Button
                        colorScheme="orange"
                        variant="solid"
                        size={'xs'}
                        mr={'5px'}
                        // onClick={() => clickChangeStatus(order._id)}
                      >
                        Xem lý do
                      </Button>
                    )}
                  </Box>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableProductComponent;
