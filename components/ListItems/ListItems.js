import { useState } from 'react';
import { Divider, Table} from 'antd';
import classNames from 'classnames/bind';
import styles from './ListItems.module.scss';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const columns = [
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Tên đăng nhập',
    dataIndex: 'username',
  },
  {
    title: 'Mật khẩu',
    dataIndex: 'password',
  },
  {
    title: 'Edit',
    dataIndex: 'edit',
    align: 'center',
    className: 'btn__edit',
    render: (text) => <a>{text}</a>,
},
{
    title: 'Delete',
    dataIndex: 'delete',
    align: 'center',
    className: 'btn__delete',
    render: (text) => <a>{text}</a>,
},
  
];
const [data, setData] = useS([
  {
    key: Math.floor(Math.random() * 1000) + 1,
    name: 'Ngọc Minh',
    age: 32,
    address: 'New York No. 1 Lake Park',
    edit: <EditOutlined />,
    delete: <DeleteOutlined />
  },
]);

// rowSelection object indicates the need for row selection
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

const ListItems = ({ users, column }) => {
  return (
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
  );
};
export default ListItems;