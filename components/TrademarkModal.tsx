import {
  Button,
  Select,
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
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import {
  createCategory,
  getCategoryById,
  ICategory,
} from '../common/admin/categoryApi';
import {
  addTrademark,
  getAllTrademarksByUser,
  deleteTrademark,
  getTrademarkById,
} from '../common/apis/trademarkApi';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  trademarkId?: string;
}

const TrademarkModal: React.FC<IProps> = ({
  isOpen,
  onClose,
  trademarkId = '',
}) => {
  const [trademark, setTrademark] = useState<any>({
    name: '',
  });

  async function getTrademarkDetail(id: string) {
    if (id) {
      const trademark = await getTrademarkById(id);
      setTrademark(trademark);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: `${trademark.name}`,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const obj = {
          _id: trademarkId,
          ...values,
        };
        const created = await addTrademark(obj);
        if (
          created &&
          Object.keys(created).length !== 0 &&
          Object.getPrototypeOf(created) === Object.prototype
        ) {
          onClose();
          Swal.fire({
            customClass: {
              container: 'my-swal',
            },
            icon: 'success',
            title: 'Thao tác thành công',
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            customClass: {
              container: 'my-swal',
            },
            icon: 'error',
            title: 'Yêu cầu nhập đúng dữ liệu',
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

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
      console.log('pppppppppppppppppppppppppppppppppppppppp');

      setTrademark({ name: '' });
    } else {
      getTrademarkDetail(trademarkId);
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm mới thương hiệu</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Tên thương hiệu</FormLabel>
                <Input
                  placeholder="Tên thương hiệu"
                  type={'text'}
                  name={'name'}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={formik.submitForm}>
              Lưu
            </Button>
            <Button onClick={onClose}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TrademarkModal;
