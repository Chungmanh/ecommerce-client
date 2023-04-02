import Sidebar from './Sidebar';

const LayoutShop = ({ children }: any) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default LayoutShop;
