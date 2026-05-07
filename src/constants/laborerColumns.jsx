import { Button, Popconfirm } from 'antd';
import { laborerColumns } from './laborerTableConfig.jsx';

const renderActionButtons = (record, onOpenEdit, onDelete) => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button size="small" onClick={() => onOpenEdit(record)}>
        Sửa
      </Button>
      <Popconfirm
        title="Xóa laborer này?"
        description="Thao tác này sẽ gọi DELETE theo id."
        okText="Xóa"
        cancelText="Hủy"
        onConfirm={() => onDelete(record.id)}
      >
        <Button danger size="small">
          Xóa
        </Button>
      </Popconfirm>
    </div>
  );
};

export const createLaborerColumns = ({ onOpenEdit, onDelete }) => {
  const columns = [];

  for (const column of laborerColumns) {
    columns.push(column);
  }

  columns.push({
    title: 'Hành động',
    key: 'action',
    render: (_, record) => renderActionButtons(record, onOpenEdit, onDelete),
  });

  return columns;
};