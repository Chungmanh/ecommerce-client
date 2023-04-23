import classNames from 'classnames/bind';
import Link from 'next/link';
import { Text, Button } from '@chakra-ui/react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebook,
//   faInstagram,
//   faTwitter,
//   faTiktok,
//   faYoutube,
//   faPinterest,
// } from  'react-icons/fa';

import styles from '../styles/Footer.module.scss';
const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('about-us')}>
        <div className={cx('col-3-footer')}>
          <div className={cx('info')}>
            <h6>Thông tin cửa hàng</h6>
            <ul>
              <li>
                <Link href={'/'}>Giới thiệu shop</Link>
              </li>
              <li>
                <Link href={'/'}>Blogger thời trang</Link>
              </li>
            </ul>
          </div>
          <div className={cx('support')}>
            <h6>Hỗ trợ khách hàng</h6>
            <ul>
              <li>
                <Link href={'/'}>Phí vận chuyển</Link>
              </li>
              <li>
                <Link href={'/'}>Trả lại</Link>
              </li>
              <li>
                <Link href={'/'}>Hướng dẫn đặt hàng</Link>
              </li>
              <li>
                <Link href={'/'}>Làm thế nào để theo dõi</Link>
              </li>
              <li>
                <Link href={'/'}>Hướng dẫn kích thước</Link>
              </li>
              <li>
                <Link href={'/'}>Trách nghiệm xã hội</Link>
              </li>
            </ul>
          </div>
          <div className={cx('service')}>
            <h6>Dịch vụ khách hàng</h6>
            <ul>
              <li>
                <Link href={'/'}>Liên hệ chúng tôi</Link>
              </li>
              <li>
                <Link href={'/'}>Phương thức thanh toán</Link>
              </li>
              <li>
                <Link href={'/'}>Điểm thưởng</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx('col-2-footer')}>
          <div className={cx('contact-us')}>
            <div className={cx('row')}>
              <div className={cx('connect-us')}>
                <h6>Kết nối với chúng tôi</h6>
                <ul className={cx('content-info')}>
                  {/* <li>
                    <FontAwesomeIcon icon={faFacebook} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faInstagram} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faTwitter} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faYoutube} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faPinterest} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faTiktok} />
                  </li> */}
                </ul>
              </div>
              <div className={cx('app')}>
                <h6>App</h6>
                <ul className={cx('content-info')}>
                  <li>{/* <FontAwesomeIcon icon={faFacebook} /> */}</li>
                  <li>{/* <FontAwesomeIcon icon={faInstagram} /> */}</li>
                </ul>
              </div>
            </div>
            <div className={cx('receive-email')}>
              <h6>Đăng ký nhận tin từ shop</h6>
              <div className={cx('form-email')}>
                <Text
                  // label="Email"
                  variant="standard"
                  size="small"
                  color="secondary"
                  className={cx('input-email')}
                />
                <Button
                  variant="contained"
                  size="small"
                  className={cx('btn-register-email')}
                >
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('footer-bottom')}>
        <span className={cx('copyright')}>
          ©2009-2022 Shop bảo lưu tất cả các quyền
        </span>
        <ul>
          <li>
            <Link href={'/'}>Trung tâm bảo mật</Link>
          </li>
          <li>
            <Link href={'/'}>Chính sách bảo mật & Cookie</Link>
          </li>
          <li>
            <Link href={'/'}>Điều khoản và Điều kiện</Link>
          </li>
          <li>
            <Link href={'/'}>Thông báo về bản quyền</Link>
          </li>
          <li>
            <Link href={'/'}>Dấu ấn</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
