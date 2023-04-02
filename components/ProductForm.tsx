import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  Select,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { addProduct, IProduct } from '../common/apis/productApi';
import { getAllCategory, ICategory } from '../common/apis/categoryApi';
import Swal from 'sweetalert2';

const ProductForm = () => {
  const [avatar, setAvatar] = useState({ file: undefined, url: '' });

  const [categories, setCategories] = useState<ICategory[]>([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      categoryId: '',
      type: '',
      price: 0,
      quantity: 0,
    },
    onSubmit: async (values) => {
      try {
        const product: IProduct = { ...values, avatar: avatar.file };
        const created = await addProduct(product);
        if (created) {
          Swal.fire({
            icon: 'success',
            title: 'Đăng ký thành công',
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } catch (error: any) {
        Swal.fire({
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

  useEffect(() => {
    async function getCategories() {
      const categories = await getAllCategory();
      setCategories(categories);
      return () => {
        avatar && URL.revokeObjectURL(avatar.url);
      };
    }

    getCategories();
  }, [avatar]);

  return (
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
        {avatar && <img src={avatar.url} alt="" width={'80px'} />}
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
          <Input
            placeholder="Thương hiệu"
            type={'text'}
            name={'type'}
            onChange={formik.handleChange}
            value={formik.values.type}
          />
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
        <Button
          marginTop={'20px'}
          colorScheme="twitter"
          variant="outline"
          size={'sm'}
        >
          Hủy
        </Button>
        <Button
          marginTop={'20px'}
          colorScheme="twitter"
          variant="outline"
          size={'sm'}
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
        >
          Lưu & Đăng bán
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
