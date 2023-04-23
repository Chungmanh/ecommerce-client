import { ReactElement, useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  useDisclosure,
  Badge,
  Button,
  Select,
} from '@chakra-ui/react';
import Head from 'next/head';
import type { NextPageWithLayout } from '../_app';
import { IoAdd } from 'react-icons/io5';
import { BiShow } from 'react-icons/bi';
import { CiEdit } from 'react-icons/ci';
import LayoutShop from '../../components/LayoutShop';
import ItemsInOrderModal from '../../components/ItemsInOrderModal';
import {
  getAllOrder,
  getItemsInOrderById,
  changeStatusInOrder,
  IOrderItem,
} from '../../common/apis/orderApi';
import moment from 'moment';
import Swal from 'sweetalert2';

const Shop: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orders, setOrders] = useState<any[]>([]);
  const [itemsInOrder, setItemsInOrder] = useState<IOrderItem[]>([]);
  const [orderWorking, setOrderWorking] = useState<string>('');

  const clickChangeStatus = (orderId: string) => {
    let id = orderId;
    if (orderId === orderWorking) {
      id = '';
    }
    setOrderWorking(id);
  };

  const handleChangeStatus = async (orderId: string, status: string) => {
    const new_status = await changeStatusInOrder(orderId, status);
    if (new_status) {
      setOrderWorking('');
      getOrders();
    }
  };

  const handleShowItemsInOrder = async (orderId: string) => {
    const items = await getItemsInOrderById(orderId);
    if (items && items.length !== 0) {
      setItemsInOrder(items);
      onOpen();
    }
  };

  const getOrders = async () => {
    const orders = await getAllOrder();
    setOrders(orders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  // console.log('orders: ', orders);
  return (
    <div>
      <Head>
        <title>My Orders</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display={'flex'}>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Thông tin đơn hàng</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign={'center'}>Ngày đặt</Th>
                <Th textAlign={'center'}>Tên khách hàng</Th>
                <Th textAlign={'center'}>SĐT</Th>
                <Th textAlign={'center'}>Địa chỉ</Th>
                <Th textAlign={'center'}>Tổng giá</Th>
                <Th textAlign={'center'}>Trạng thái</Th>
                <Th textAlign={'center'}>Thao tác</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.length > 0 &&
                orders.map((order) => (
                  <Tr key={order._id}>
                    <Td isNumeric>
                      {moment(order.createdAt).format('DD/MM/YY, h:mm a')}
                    </Td>
                    <Td>{order?.userId?.username || ''}</Td>
                    <Td>{order.telephone}</Td>
                    <Td>
                      <Box
                        sx={{
                          width: '200px',
                          // fontSize: '12px',
                          overflow: 'hidden',
                          whiteSpace: 'pre-wrap',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                        }}
                      >
                        {order.address}
                      </Box>
                    </Td>
                    <Td>{order.totalPrice}</Td>
                    <Td textAlign={'center'}>
                      {order._id === orderWorking ? (
                        <Select
                          value={order.status}
                          size={'xs'}
                          onChange={(e) =>
                            handleChangeStatus(order._id, e.target.value)
                          }
                        >
                          <option value="Chờ xác nhận">Chờ xác nhận</option>
                          <option value="Đang giao">Đang giao</option>
                          <option value="Hoàn thành">Hoàn thành</option>
                          <option value="Hủy đơn">Hủy đơn</option>
                        </Select>
                      ) : (
                        <Badge
                          colorScheme={
                            order.status === 'Chờ xác nhận'
                              ? 'purple'
                              : order.status === 'Đang giao'
                              ? 'green'
                              : 'red'
                          }
                        >
                          {order.status}
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
                        <Button
                          leftIcon={<CiEdit />}
                          colorScheme="pink"
                          variant="solid"
                          size={'xs'}
                          mr={'5px'}
                          onClick={() => clickChangeStatus(order._id)}
                        >
                          Chuyển trạng thái
                        </Button>
                        <Button
                          leftIcon={<BiShow />}
                          colorScheme="yellow"
                          variant="solid"
                          size={'xs'}
                          onClick={() => handleShowItemsInOrder(order._id)}
                        >
                          Chi tiết
                        </Button>
                      </Box>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>
      </Box>
      <ItemsInOrderModal
        isOpen={isOpen}
        onClose={onClose}
        itemsInOrder={itemsInOrder}
      />
    </div>
  );
};

Shop.getLayout = function getLayout(page: ReactElement) {
  return <LayoutShop>{page}</LayoutShop>;
};

export default Shop;