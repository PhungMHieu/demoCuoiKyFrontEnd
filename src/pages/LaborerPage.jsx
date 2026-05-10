import { useState } from 'react';
import { Form } from 'antd';
import { LaborerManagementView } from '../components/LaborerManagementView.jsx';
import { useLaborerManagement } from '../hooks/useLaborerManagement.js';

export const LaborerPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingLaborer, setEditingLaborer] = useState(null);
  const [form] = Form.useForm();
  const { laborers, loading, submitting, createNewLaborer, updateExistingLaborer, removeLaborer } = useLaborerManagement();

  const openAdd = () => {
    setModalMode('add');
    setEditingLaborer(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEdit = (laborer) => {
    setModalMode('edit');
    setEditingLaborer(laborer);
    form.setFieldsValue({
      fullName: laborer.fullName,
      phoneNumber: laborer.phoneNumber,
      status: laborer.status,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingLaborer(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    if (modalMode === 'add') {
      await createNewLaborer(values);
    } else {
      if (!editingLaborer?.id) return;
      await updateExistingLaborer(editingLaborer.id, values);
    }
    closeModal();
  };

  return (
    <LaborerManagementView
      collapsed={collapsed}
      onCollapseChange={setCollapsed}
      laborers={laborers}
      loading={loading}
      submitting={submitting}
      form={form}
      modalOpen={modalOpen}
      modalMode={modalMode}
      onOpenAdd={openAdd}
      onOpenEdit={openEdit}
      onCloseModal={closeModal}
      onSubmit={handleSubmit}
      onDelete={removeLaborer}
    />
  );
};