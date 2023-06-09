import { ReactElement, useEffect, useState } from 'react';
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
  IconButton,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useFormik } from 'formik';
import type { NextPageWithLayout } from '../_app';
import { IoAdd } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { BsTrash3 } from 'react-icons/bs';
import LayoutShop from '../../components/LayoutShop';
import TrademarkModal from '../../components/TrademarkModal';
import {
  addTrademark,
  getAllTrademarksByUser,
  deleteTrademark,
} from '../../common/apis/trademarkApi';
import moment from 'moment';
import Swal from 'sweetalert2';

const Trademark: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [trademarks, setTrademarks] = useState<any[]>([]);
  const [trademarkId, setTrademarkId] = useState('');

  const getTrademarks = async () => {
    const trademarks = await getAllTrademarksByUser();
    setTrademarks(trademarks);
  };

  const handleDeleteTrademark = async (id: string) => {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Xác nhận xóa thương hiệu này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleted = await deleteTrademark(id);
        if (deleted && Object.keys(deleted).length !== 0) {
          const new_trademarks = trademarks.filter(
            (trademark) => trademark._id !== id
          );
          Swal.fire('Deleted!', 'Xóa thành công', 'success');
          setTrademarks(new_trademarks);
        } else {
          Swal.fire('Error!', 'Xóa thất bại.', 'error');
        }
      }
    });
  };

  const handleEditTrademark = async (id: string) => {
    setTrademarkId(id);
    onOpen();
  };

  useEffect(() => {
    getTrademarks();
    if (!isOpen) {
      setTrademarkId('');
    }
  }, [isOpen]);
  return (
    <div>
      <Head>
        <title>Trademark</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display={'flex'}>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Thông tin danh sách thương hiệu</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign={'center'}>STT</Th>
                <Th textAlign={'center'}>Tên thương hiệu</Th>
                <Th textAlign={'center'}>Ngày tạo</Th>
                {/* <Th textAlign={'center'}>Trạng thái</Th> */}
                <Th textAlign={'center'}>Thao tác</Th>
              </Tr>
            </Thead>
            <Tbody>
              {trademarks.length > 0 &&
                trademarks.map((trademark, index) => (
                  <Tr key={trademark._id}>
                    <Td isNumeric>{index + 1}</Td>
                    <Td>{trademark?.name || ''}</Td>
                    <Td>
                      {moment(trademark.createdAt).format('DD/MM/YY, h:mm a')}
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
                          onClick={() => handleEditTrademark(trademark._id)}
                        />
                        <BsTrash3
                          size={16}
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => handleDeleteTrademark(trademark._id)}
                        />
                      </Box>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Box>
          <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="Add"
            icon={<IoAdd />}
            onClick={onOpen}
          />
        </Box>
      </Box>
      <TrademarkModal
        isOpen={isOpen}
        onClose={onClose}
        trademarkId={trademarkId}
      />
    </div>
  );
};

// const Shop = () => {
Trademark.getLayout = function getLayout(page: ReactElement) {
  return <LayoutShop>{page}</LayoutShop>;
};

export default Trademark;
