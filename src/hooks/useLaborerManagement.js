import { useEffect, useState } from 'react';
import { message } from 'antd';
import { createLaborer, deleteLaborer, getLaborers, updateLaborer } from '../api/laborerApi.js';

const toTableRows = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  const rows = [];

  for (const item of items) {
    rows.push({ ...item, key: item.id });
  }

  return rows;
};

export const useLaborerManagement = () => {
  const [laborers, setLaborers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadLaborers = async () => {
    setLoading(true);
    try {
      const data = await getLaborers();
      setLaborers(toTableRows(data));
    } catch (error) {
      message.error(error.message || 'Không tải được danh sách laborers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchLaborers = async () => {
      setLoading(true);
      try {
        const data = await getLaborers();
        if (!cancelled) {
          setLaborers(toTableRows(data));
        }
      } catch (error) {
        if (!cancelled) {
          message.error(error.message || 'Không tải được danh sách laborers');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchLaborers();

    return () => {
      cancelled = true;
    };
  }, []);

  const createNewLaborer = async (values) => {
    setSubmitting(true);
    try {
      await createLaborer(values);
      message.success('Đã thêm laborer mới');
      await loadLaborers();
    } catch (error) {
      message.error(error.message || 'Không tạo được laborer');
    } finally {
      setSubmitting(false);
    }
  };

  const updateExistingLaborer = async (id, values) => {
    setSubmitting(true);
    try {
      await updateLaborer(id, values);
      message.success('Đã cập nhật laborer');
      await loadLaborers();
    } catch (error) {
      message.error(error.message || 'Không sửa được laborer');
    } finally {
      setSubmitting(false);
    }
  };

  const removeLaborer = async (id) => {
    try {
      await deleteLaborer(id);
      message.success('Đã xóa laborer');
      await loadLaborers();
    } catch (error) {
      message.error(error.message || 'Không xóa được laborer');
    }
  };

  return {
    laborers,
    loading,
    submitting,
    loadLaborers,
    createNewLaborer,
    updateExistingLaborer,
    removeLaborer,
  };
};