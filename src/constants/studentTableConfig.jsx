import { Tag } from 'antd';

const renderStatusTag = (status) => {
  const normalizedStatus = String(status ?? '').trim().toLowerCase();
  const tagColor = normalizedStatus === 'hoạt động' || normalizedStatus === 'active' ? 'green' : 'red';

  return <Tag color={tagColor}>{status}</Tag>;
};

export const laborerColumns = [
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: renderStatusTag,
  },
];