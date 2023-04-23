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
} from '@chakra-ui/react';
import { IoAdd } from 'react-icons/io5';
import { BsTrash3 } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { useState } from 'react';

const ModalComponent = (props: any) => {
  const { isOpen, onClose, component } = props;
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Thông tin sản phẩm</TableCaption>
          <Thead>
            <Tr>
              <Th>Tên sản phẩm</Th>
              <Th>Ảnh</Th>
              <Th>Giá</Th>
              <Th>Số lượng</Th>
              <Th>Mô tả</Th>
              <Th>Trạng thái</Th>
              <Th>Thao tác</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
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
                  1231
                </Box>
              </Td>
              <Td>
                <img
                  src="12"
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                  }}
                />
              </Td>
              <Td isNumeric>123</Td>
              <Td>10 (cái)</Td>
              <Td>new</Td>
              <Td>{true ? 'đang bán' : ''}</Td>
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
                    // onClick={() => handleEditProduct(product._id)}
                  />
                  <BsTrash3
                    size={16}
                    style={{
                      cursor: 'pointer',
                    }}
                    // onClick={() => handleDeleteProduct(product._id)}
                  />
                </Box>
              </Td>
            </Tr>
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
    </>
  );
};

export default ModalComponent;
