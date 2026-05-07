import { useState } from 'react';
import { Form } from 'antd';
import { LaborerManagementView } from '../components/LaborerManagementView.jsx';
import { useLaborerManagement } from '../hooks/useLaborerManagement.js';

export const LaborerPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingLaborer, setEditingLaborer] = useState(null);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const { laborers, loading, submitting, createNewLaborer, updateExistingLaborer, removeLaborer } = useLaborerManagement();

  const handleCreate = async (values) => {
    await createNewLaborer(values);
    createForm.resetFields();
  };

  const openEdit = (laborer) => {
    setEditingLaborer(laborer);
    editForm.setFieldsValue({
      fullName: laborer.fullName,
      phoneNumber: laborer.phoneNumber,
      status: laborer.status,
    });
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditingLaborer(null);
    editForm.resetFields();
  };

  const handleEditSubmit = async (values) => {
    if (!editingLaborer?.id) {
      return;
    }

    await updateExistingLaborer(editingLaborer.id, values);
    closeEdit();
  };

  return (
    <LaborerManagementView
      collapsed={collapsed}
      onCollapseChange={setCollapsed}
      laborers={laborers}
      loading={loading}
      submitting={submitting}
      createForm={createForm}
      editForm={editForm}
      editOpen={editOpen}
      onCreate={handleCreate}
      onEditSubmit={handleEditSubmit}
      onOpenEdit={openEdit}
      onCloseEdit={closeEdit}
      onDelete={removeLaborer}
    />
  );
};