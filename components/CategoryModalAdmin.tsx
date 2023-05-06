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
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId?: string;
}

const CategoryModal: React.FC<IProps> = ({
  isOpen,
  onClose,
  categoryId = '',
}) => {
  const [avatar, setAvatar] = useState({ file: undefined, url: '' });
  const [category, setCategory] = useState<ICategory>({
    name: '',
    description: '',
    avatar: '',
  });

  const handlePreviewAvatar = (e: any) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setAvatar({ file, url: preview });
  };

  const formik = useFormik({
    initialValues: {
      name: `${category.name}`,
      description: `${category.description}`,
      status: `${category.status === false ? '0' : '1'}`,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const { status, ...other } = values;
        const category: ICategory = {
          ...other,
          status: status === '1',
          _id: categoryId,
          avatar: avatar.file,
        };
        const created = await createCategory(category);
        if (created) {
          formik.resetForm();
          onClose();
        }
      } catch (error: any) {
        console.log('error: ', error);
      }
    },
  });

  async function getCategoryDetail(id: string) {
    if (id) {
      const category = await getCategoryById(id);
      // console.log('category: ', category);
      setCategory(category);
      setAvatar({ ...avatar, url: `${category.avatar}` });
    }
    //  else {
    //   setCategory({
    //     name: '',
    //     description: '',
    //     avatar: '',
    //   });
    //   setAvatar({ ...avatar, url: '' });
    // }
  }

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
      setCategory({ name: '', description: '', avatar: '' });
      setAvatar({ file: undefined, url: '' });
    } else {
      getCategoryDetail(categoryId);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.url);
    };
  }, [avatar]);

  return (
    <>
      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm mới danh mục</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Tên danh mục</FormLabel>
                <Input
                  placeholder="Tên danh mục"
                  type={'text'}
                  name={'name'}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </FormControl>
              <FormControl mt={2}>
                <label htmlFor="file">File upload</label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={handlePreviewAvatar}
                  className="form-control"
                />
              </FormControl>
              {avatar && <img src={avatar.url} alt="" width={'80px'} />}

              <FormControl mt={4}>
                <FormLabel>Mô tả</FormLabel>
                <Input
                  placeholder="Mô tả"
                  type={'text'}
                  name={'description'}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Trạng thái</FormLabel>
                <RadioGroup
                  name="status"
                  value={formik.values.status}
                  onChange={(value) => {
                    formik.setFieldValue('status', value);
                  }}
                >
                  <Stack direction="row">
                    <Radio value="1">Active</Radio>
                    <Radio value="0">InActive</Radio>
                  </Stack>
                </RadioGroup>
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

export default CategoryModal;
