import { Layout, Menu, Table, Button, Form, Input, Modal } from 'antd';
import { UserOutlined, DashboardOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import { createLaborerColumns } from '../constants/LaborerColumns.jsx';

const { Header, Sider, Content } = Layout;

export const LaborerManagementView = ({
  collapsed,
  onCollapseChange,
  laborers,
  loading,
  submitting,
  form,
  modalOpen,
  modalMode,
  onOpenAdd,
  onOpenEdit,
  onCloseModal,
  onSubmit,
  onDelete,
}) => {
  const columns = createLaborerColumns({ onOpenEdit, onDelete });
  const isAdd = modalMode === 'add';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapseChange}>
        <div style={{ height: 64, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>Tổng quan</Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>Quản lý Lao động</Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>Cài đặt</Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ margin: 0 }}>Danh sách Nhân công</h2>
              <Button type="primary" icon={<PlusOutlined />} onClick={onOpenAdd}>
                Thêm nhân công
              </Button>
            </div>

            <Table rowKey="id" dataSource={laborers} columns={columns} loading={loading} />

            <Modal
              title={isAdd ? 'Thêm nhân công' : 'Sửa nhân công'}
              open={modalOpen}
              onCancel={onCloseModal}
              onOk={() => form.submit()}
              okButtonProps={{ loading: submitting }}
              cancelText="Hủy"
              okText={isAdd ? 'Thêm' : 'Lưu'}
              destroyOnClose
            >
              <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Nhập họ và tên' }]}>
                  <Input.Search placeholder="nhập họ và tên" enterButton={false} />
                </Form.Item>
                <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true, message: 'Nhập số điện thoại' }]}>
                  <Input.Search placeholder="nhập số điện thoại" enterButton={false} />
                </Form.Item>
                <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Nhập trạng thái' }]}>
                  <Input.Search placeholder="nhập trạng thái" enterButton={false} />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};