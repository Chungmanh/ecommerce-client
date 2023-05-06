import SidebarAdmin from './SidebarAdmin';

const LayoutAdmin = ({ children }: any) => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdmin />
      <div>{children}</div>
    </div>
  );
};

export default LayoutAdmin;
