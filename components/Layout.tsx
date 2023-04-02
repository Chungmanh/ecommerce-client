import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: '500px' }}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
