import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Box,
  Text,
  Textarea,
  Button,
} from '@chakra-ui/react';
import RateInput from './rateInput';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { addReview } from '../../common/apis/reviewApi';
import { getProductById, IProduct } from '../../common/apis/productApi';

const RatingModal = (props: any) => {
  const { isOpen, onClose, productId } = props;
  const [product, setProduct] = useState<IProduct>();
  const [star, setStar] = useState(5);

  const handleClickComment = async (comment: string) => {
    formik.setFieldValue('comment', comment);
  };

  const formik = useFormik({
    initialValues: {
      starNumber: 5,
      comment: '',
    },
    onSubmit: async (values) => {
      try {
        const review = {
          productId: productId,
          vote: star,
          comment: values.comment || '',
        };
        const created = await addReview(review);
        console.log('created: ', created);

        if (created) {
          formik.resetForm();
          onClose();
          Swal.fire({
            customClass: {
              container: 'my-swal',
            },
            icon: 'success',
            title: 'cam on',
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } catch (error: any) {
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  });
  console.log('star :', star);
  console.log('product :', product);
  useEffect(() => {
    async function getProduct(productId: string) {
      const product = await getProductById(productId);
      setProduct(product);
    }
    console.log('run useEffect');
    if (productId && productId !== '') {
      getProduct(productId);
    }
  }, []);
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize={15} marginTop={'10px'}>
              Đánh giá sản phẩm
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {product && (
                <Box
                  sx={{
                    display: 'flex',
                    padding: '12px 0px',
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <img
                        src={`${product?.avatar}`}
                        style={{
                          width: '70px',
                          height: '70px',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <Box sx={{ paddingLeft: '12px' }}>
                      <Text>
                        {product.name}
                        {/* Áo Croptop Tay Dài Vạt Bầu Cổ Cao Ôm Body Quyến Rũ ✨ */}
                      </Text>
                      <Text color={'#ee4d2d'}>₫{product?.price || '0'}</Text>
                    </Box>
                  </Box>
                </Box>
              )}

              <Box
                sx={{
                  width: 'max-content',
                  margin: '0 auto',
                }}
              >
                <RateInput onChange={setStar} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '8px 6px',
                  margin: '20px 0px',
                }}
              >
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size={'xs'}
                  display={'block'}
                  onClick={() =>
                    handleClickComment('Chất lượng sản phẩm tuyệt vời')
                  }
                >
                  Chất lượng sản phẩm tuyệt vời
                </Button>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size={'xs'}
                  display={'block'}
                  onClick={() =>
                    handleClickComment('Đóng gói sản phẩm rất đẹp và chắc chắn')
                  }
                >
                  Đóng gói sản phẩm rất đẹp và chắc chắn
                </Button>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size={'xs'}
                  display={'block'}
                  onClick={() => handleClickComment('Shop phục vụ rất tốt')}
                >
                  Shop phục vụ rất tốt
                </Button>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size={'xs'}
                  display={'block'}
                  onClick={() => handleClickComment('Rất đáng tiền')}
                >
                  Rất đáng tiền
                </Button>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size={'xs'}
                  display={'block'}
                  onClick={() =>
                    handleClickComment('Thời gian giao hàng rất nhanh')
                  }
                >
                  Thời gian giao hàng rất nhanh
                </Button>
              </Box>
              <form onSubmit={formik.handleSubmit}>
                <Textarea
                  placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này nhé"
                  resize={'none'}
                  name={'comment'}
                  onChange={formik.handleChange}
                  value={formik.values.comment}
                />
              </form>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" size="sm" onClick={formik.submitForm}>
              Đánh giá
            </Button>
            <Button colorScheme="gray" size="sm" ml={2} onClick={onClose}>
              Hủy
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RatingModal;
