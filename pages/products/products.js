import Wrapper from '../../components/Wrapper';
import { Input, Space, Button, Modal, Form, Divider, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from '@/styles/styleForm.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const data = [
  {
    key: '1',
    name: 'SamSung Galaxy Y',
    price: '500000',
    category: 'SamSung',
    edit: <EditOutlined />,
    delete: <DeleteOutlined />
  },
  {
    key: '2',
    name: 'Iphone 14 Pro',
    price: '1000000',
    category: 'Apple',
    edit: <EditOutlined />,
    delete: <DeleteOutlined />
  },
];

export default function Products() {
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'category',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      align: 'center',
      className: 'btn__edit',
      render: (text, row) => (<Space> <Button className={cx('btn__edit')} onClick={() => handleEdit(row.key)} type="link"> {text} </Button> </Space>),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      align: 'center',
      className: 'btn__delete',
      render: (text, row) => (<Space> <Button className={cx('btn__delete')} onClick={() => handleDelete(row.key)} type="link"> {text} </Button> </Space>),
    },

  ];

  const { Search } = Input;

  const showModalAdd = () => {
    // setIsModalOpen({add: true});
    return;
  };

  const onSearch = (value) => console.log(...value);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <main>
      <Wrapper className={cx('ListItems')}>
        <h4>Danh sách Product</h4>
        <Button onClick={showModalAdd} size='large'>
          Add new Product
        </Button>
        <Space direction="vertical">
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{
              width: 400,
            }}
          />
        </Space>
      </Wrapper>

      <div>
        <Divider />
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </main>
  )
}
