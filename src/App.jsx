import { useEffect, useState } from 'react';
import { Layout, Menu, Table, Button, Form, Input, message, Popconfirm, Modal } from 'antd';
import { UserOutlined, DashboardOutlined, SettingOutlined } from '@ant-design/icons';
import { laborerColumns } from './constants/studentTableConfig.jsx';
import { createLaborer, deleteLaborer, getLaborers, updateLaborer } from './api/laborerApi.js';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [laborers, setLaborers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingLaborer, setEditingLaborer] = useState(null);
  const [editForm] = Form.useForm();
  const [form] = Form.useForm();

  const loadLaborers = async () => {
    try {
      const data = await getLaborers();
      setLaborers(Array.isArray(data) ? data.map((item) => ({ ...item, key: item.id })) : []);
    } catch (error) {
      message.error(error.message || 'Không tải được danh sách laborers');
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchLaborers = async () => {
      try {
        const data = await getLaborers();
        if (!cancelled) {
          setLaborers(Array.isArray(data) ? data.map((item) => ({ ...item, key: item.id })) : []);
        }
      } catch (error) {
        if (!cancelled) {
          message.error(error.message || 'Không tải được danh sách laborers');
        }
      }
    };

    void fetchLaborers();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreateLaborer = async (values) => {
    setSubmitting(true);
    try {
      await createLaborer(values);
      message.success('Đã thêm laborer mới');
      form.resetFields();
      await loadLaborers();
    } catch (error) {
      message.error(error.message || 'Không tạo được laborer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteLaborer = async (id) => {
    try {
      await deleteLaborer(id);
      message.success('Đã xóa laborer');
      await loadLaborers();
    } catch (error) {
      message.error(error.message || 'Không xóa được laborer');
    }
  };

  const openEditLaborer = (laborer) => {
    setEditingLaborer(laborer);
    editForm.setFieldsValue({
      fullName: laborer.fullName,
      phoneNumber: laborer.phoneNumber,
      status: laborer.status,
    });
    setEditOpen(true);
  };

  const handleUpdateLaborer = async (values) => {
    if (!editingLaborer?.id) {
      message.error('Không tìm thấy laborer để sửa');
      return;
    }

    setSubmitting(true);
    try {
      await updateLaborer(editingLaborer.id, values);
      message.success('Đã cập nhật laborer');
      setEditOpen(false);
      setEditingLaborer(null);
      editForm.resetFields();
      await loadLaborers();
    } catch (error) {
      message.error(error.message || 'Không sửa được laborer');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    ...laborerColumns,
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="small" onClick={() => openEditLaborer(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa laborer này?"
            description="Thao tác này sẽ gọi DELETE theo id."
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => handleDeleteLaborer(record.id)}
          >
            <Button danger size="small">
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Cột Menu bên trái */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 64, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>Tổng quan</Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>Quản lý Lao động</Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>Cài đặt</Menu.Item>
        </Menu>
      </Sider>

      {/* Phần nội dung chính */}
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: 8 }}>
            <h2>Danh sách Laborer</h2>
            <Form
              form={form}
              layout="inline"
              onFinish={handleCreateLaborer}
              style={{ marginBottom: 16, gap: 8 }}
            >
              <Form.Item
                name="fullName"
                rules={[{ required: true, message: 'Nhập họ và tên' }]}
              >
                <Input placeholder="Họ và tên" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[{ required: true, message: 'Nhập số điện thoại' }]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item
                name="status"
                rules={[{ required: true, message: 'Nhập trạng thái' }]}
              >
                <Input placeholder="Trạng thái" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  Thêm mới
                </Button>
              </Form.Item>
            </Form>
            <Table 
              rowKey="id"
              dataSource={laborers} 
              columns={columns} 
            />
            <Modal
              title="Sửa laborer"
              open={editOpen}
              onCancel={() => {
                setEditOpen(false);
                setEditingLaborer(null);
                editForm.resetFields();
              }}
              onOk={() => editForm.submit()}
              okButtonProps={{ loading: submitting }}
              cancelText="Hủy"
              okText="Lưu"
              destroyOnClose
            >
              <Form form={editForm} layout="vertical" onFinish={handleUpdateLaborer}>
                <Form.Item
                  name="fullName"
                  label="Họ và tên"
                  rules={[{ required: true, message: 'Nhập họ và tên' }]}
                >
                  <Input placeholder="Họ và tên" />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Số điện thoại"
                  rules={[{ required: true, message: 'Nhập số điện thoại' }]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Trạng thái"
                  rules={[{ required: true, message: 'Nhập trạng thái' }]}
                >
                  <Input placeholder="Trạng thái" />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;