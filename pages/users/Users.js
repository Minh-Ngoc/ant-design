import Wrapper from '../../components/Wrapper';
import { Input, Space, Button, Modal, Form, Divider, Table  } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import classNames from 'classnames/bind';
import styles from './users.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const columns = [
  {
    title: 'Họ và tên',
    dataIndex: 'name',
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
    render: (text) => (<Space> <Button type="link"> {text} </Button> </Space>),
},
{
    title: 'Delete',
    dataIndex: 'delete',
    align: 'center',
    className: 'btn__delete',
    render: (text) => (<Space> <Button type="link"> {text} </Button> </Space>),
},
  
];
const data = [
  {
    key: '1',
    name: 'Ngọc Minh',
    username: 'ngocminh',
    password: '123456',
    edit: <EditOutlined />,
    delete: <DeleteOutlined />
  },
];

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

export default function Users() {
  const { Search } = Input;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataTable, setDataTable] = useState([...data]);

  const onSearch = (value) => console.log(...value);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const handleSubmit = (values) => {
    console.log(values)
    if(!values.name || !values.username || !values.password) {
      return;
    } else {
      data.push({
        key: Math.floor(Math.random() * 10000) + 1,
        name: values.name,
        username: values.username,
        password: values.password,
        edit: <EditOutlined />,
        delete: <DeleteOutlined />
      })
      setDataTable([...data])
      setIsModalOpen(false);
    }

  }
  
  return (
    <main>
      <Wrapper className={cx('ListItems')}>
        <h4>Danh sách User</h4>
        <Button onClick={showModal} size='large'>
            Add new User
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
            dataSource={dataTable}
        />
        </div>

      <Modal 
        className={cx('modal')}
        width={800}
        title="Add user" 
        open={isModalOpen} 
        onOk={handleOk} 
        okText='Submit'
        okType='default'
        onCancel={handleCancel}
      >
        <Form 
          form={form} 
          onFinish={handleSubmit}
          name="validateOnly" 
          layout="vertical" 
          autoComplete="off"
        >
          <Form.Item
            label="Họ và tên:"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên đăng nhập:"
            name="username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu:"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  )
}
