import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

const ItemsInOrderModal = (props: any) => {
  const { isOpen, onClose, itemsInOrder } = props;
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {/* <Text fontSize={15} marginTop={'10px'}>
              Chi tiết mặt hàng
            </Text> */}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Thông tin sản phẩm</TableCaption>
                  <Thead>
                    <Tr>
                      <Th textAlign={'center'}>Ảnh</Th>
                      <Th textAlign={'center'}>Tên sản phẩm</Th>
                      <Th textAlign={'center'}>Giá</Th>
                      <Th textAlign={'center'}>Số lượng</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {itemsInOrder &&
                      itemsInOrder.length !== 0 &&
                      itemsInOrder.map((item: any, index: number) => (
                        <Tr key={index}>
                          <Td>
                            <img
                              src={item?.productId?.avatar}
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                display: 'block',
                                margin: '0px auto',
                              }}
                            />
                          </Td>
                          <Td>
                            <Box
                              sx={{
                                width: '162px',
                                fontSize: '12px',
                                overflow: 'hidden',
                                whiteSpace: 'pre-wrap',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                              }}
                            >
                              {item?.productId?.name}
                            </Box>
                          </Td>
                          <Td isNumeric textAlign={'right'}>
                            {item?.price}
                          </Td>
                          <Td textAlign={'right'}>{item?.quantity} (cái)</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ItemsInOrderModal;
