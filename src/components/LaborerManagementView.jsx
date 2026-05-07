import { Layout, Menu, Table, Button, Form, Input, Modal } from 'antd';
import { UserOutlined, DashboardOutlined, SettingOutlined } from '@ant-design/icons';
import { createLaborerColumns } from '../constants/laborerColumns.jsx';

const { Header, Sider, Content } = Layout;

export const LaborerManagementView = ({
  collapsed,
  onCollapseChange,
  laborers,
  loading,
  submitting,
  createForm,
  editForm,
  editOpen,
  onCreate,
  onEditSubmit,
  onOpenEdit,
  onCloseEdit,
  onDelete,
}) => {
  const columns = createLaborerColumns({ onOpenEdit, onDelete });

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
            <h2>Danh sách Laborer</h2>
            <Form
              form={createForm}
              layout="inline"
              onFinish={onCreate}
              style={{ marginBottom: 16, gap: 8 }}
            >
              <Form.Item name="fullName" rules={[{ required: true, message: 'Nhập họ và tên' }]}>
                <Input placeholder="Họ và tên" />
              </Form.Item>
              <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Nhập số điện thoại' }]}>
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item name="status" rules={[{ required: true, message: 'Nhập trạng thái' }]}>
                <Input placeholder="Trạng thái" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  Thêm mới
                </Button>
              </Form.Item>
            </Form>

            <Table rowKey="id" dataSource={laborers} columns={columns} loading={loading} />

            <Modal
              title="Sửa laborer"
              open={editOpen}
              onCancel={onCloseEdit}
              onOk={() => editForm.submit()}
              okButtonProps={{ loading: submitting }}
              cancelText="Hủy"
              okText="Lưu"
              destroyOnClose
            >
              <Form form={editForm} layout="vertical" onFinish={onEditSubmit}>
                <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Nhập họ và tên' }]}>
                  <Input placeholder="Họ và tên" />
                </Form.Item>
                <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true, message: 'Nhập số điện thoại' }]}>
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Nhập trạng thái' }]}>
                  <Input placeholder="Trạng thái" />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};