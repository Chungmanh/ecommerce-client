import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Box,
  FormControl,
  Text,
  Select,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import {
  addProduct,
  getProductById,
  IProduct,
} from '../common/apis/productApi';
import { getAllCategory, ICategory } from '../common/apis/categoryApi';
import { getAllTrademarksByUser } from '../common/apis/trademarkApi';
import Swal from 'sweetalert2';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
}

const ProductFormDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  productId = '',
}) => {
  const [avatar, setAvatar] = useState({ file: undefined, url: '' });
  const [product, setProduct] = useState<IProduct>({
    categoryId: '',
    trademarkId: '',
    type: '',
    description: '',
    name: '',
    price: 0,
    quantity: 0,
  });

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [trademarks, setTrademarks] = useState<any>([]);

  const formik = useFormik({
    initialValues: {
      name: `${product.name}`,
      description: `${product.description}`,
      categoryId: `${product.categoryId}`,
      trademarkId: `${product.trademarkId || ''}`,
      type: `${product.type}`,
      price: product.price,
      quantity: product.quantity,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const product: IProduct = {
          ...values,
          _id: productId,
          avatar: avatar.file,
        };
        const created = await addProduct(product);
        if (created) {
          onClose();
          setAvatar({ file: undefined, url: '' });
          Swal.fire({
            customClass: {
              container: 'my-swal',
            },
            icon: 'success',
            // title: 'Đăng ký thành công',
            title: 'Thao tác thành công',
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

  const handlePreviewAvatar = (e: any) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setAvatar({ file, url: preview });
  };

  async function getProductDetail(id: string) {
    if (id) {
      const product = await getProductById(id);
      console.log('product: ', product);
      setProduct(product);
      setAvatar({ ...avatar, url: `${product.avatar}` });
    } else {
      setProduct({
        categoryId: '',
        trademarkId: '',
        type: '',
        description: '',
        name: '',
        avatar: '',
        price: 0,
        quantity: 0,
      });
      setAvatar({ ...avatar, url: '' });
    }
  }

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
    getProductDetail(productId);
  }, [isOpen]);

  useEffect(() => {
    async function getCategories() {
      const categories = await getAllCategory();
      setCategories(categories);
    }
    async function getTrademarks() {
      const trademarks = await getAllTrademarksByUser();
      setTrademarks(trademarks);
    }
    getCategories();
    getTrademarks();
  }, []);

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.url);
    };
  }, [avatar]);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'lg'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cập nhật sản phẩm</DrawerHeader>

          <DrawerBody>
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <label htmlFor="file">File upload</label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={handlePreviewAvatar}
                    className="form-control"
                  />
                </FormControl>
                {(avatar || product.avatar) && (
                  <img
                    src={avatar.url || `${product.avatar}`}
                    alt=""
                    width={'80px'}
                  />
                )}
                <FormControl>
                  <Input
                    placeholder="Tên sản phẩm"
                    type={'text'}
                    name={'name'}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </FormControl>
                <FormControl marginTop={'15px'}>
                  <Input
                    placeholder="Mô tả sản phẩm"
                    type={'text'}
                    name={'description'}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                </FormControl>
                <FormControl marginTop={'15px'}>
                  <Select
                    placeholder="Danh mục"
                    name={'categoryId'}
                    onChange={formik.handleChange}
                    value={formik.values.categoryId}
                  >
                    {categories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl marginTop={'15px'}>
                  <Select
                    placeholder="Thương hiệu"
                    name={'trademarkId'}
                    onChange={formik.handleChange}
                    value={formik.values.trademarkId}
                  >
                    {trademarks?.map((trademark: any) => (
                      <option key={trademark._id} value={trademark._id}>
                        {trademark.name}
                      </option>
                    ))}
                  </Select>
                  {/* <Input
                    placeholder="Thương hiệu"
                    type={'text'}
                    name={'type'}
                    onChange={formik.handleChange}
                    value={formik.values.type}
                  /> */}
                </FormControl>
                <FormControl marginTop={'15px'}>
                  <Input
                    placeholder="Giá bán"
                    type={'number'}
                    name={'price'}
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />
                </FormControl>
                <FormControl marginTop={'15px'}>
                  <Input
                    placeholder="Số lượng còn"
                    type={'number'}
                    name={'quantity'}
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                  />
                </FormControl>
              </form>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button
              marginTop={'20px'}
              colorScheme="twitter"
              variant="outline"
              size={'sm'}
              mr={3}
              onClick={onClose}
            >
              Hủy
            </Button>
            <Button
              marginTop={'20px'}
              colorScheme="twitter"
              variant="outline"
              size={'sm'}
              mr={3}
              // onClick={formik.resetForm}
            >
              Lưu & Ẩn
            </Button>
            <Button
              marginTop={'20px'}
              backgroundColor={'#fb5730'}
              color={'#fff'}
              type={'submit'}
              size={'sm'}
              variant="outline"
              mr={2}
              onClick={formik.submitForm}
            >
              Lưu & Đăng bán
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProductFormDrawer;
