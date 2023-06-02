import Wrapper from '../../components/Wrapper';
import { Input, Space, Button, Modal, Form, Divider, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from '@/styles/styleForm.module.scss';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import Head from 'next/head';

const cx = classNames.bind(styles);


export default function Users() {
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'password',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      align: 'center',
      className: 'btn__edit',
      width: 100,
      render: (text, row) => (<Space> <Button className={cx('btn__edit')} onClick={() => handleEdit(row.id)} type="link"> {text} </Button> </Space>),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      align: 'center',
      className: 'btn__delete',
      width: 100,
      render: (text, row) => (<Space> <Button className={cx('btn__delete')} onClick={() => handleDelete(row.id)} type="link"> {text} </Button> </Space>),
    },
  ];

  const [selectedItem, setSelectedItem] = useState(false);

  const [form] = Form.useForm();
  const { Search } = Input;
  
  const dispatch = useDispatch();

  const usersStore = useSelector((state) => state.users);
  const modalStore = useSelector((state) => state.modal);
  
  const showModalAdd = () => {
    dispatch.modal.setIsOpenModalAdd(true);
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

  useEffect(() => {
    dispatch.users.fetchUsers();
  }, [])

  const attbute = {
    edit: <EditOutlined />,
    delete: <DeleteOutlined />
  }
  usersStore.usersList && 
  usersStore.usersList.map(item => 
    Object.assign(item,attbute)
  )

  const handleSubmitAdd = (values) => {
    if (!values.firstName || !values.lastName || !values.username || !values.password || !values.email) {
      return;
    } else {
      dispatch.users.setUsersList([...usersStore.usersList, {
        id: Math.floor(Math.random() * 10000) + 1,
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        password: values.password,
        email: values.email,
        edit: <EditOutlined />,
        delete: <DeleteOutlined />
      }])

      dispatch.modal.setIsOpenModalAdd(false);
    }
    return;
  }

  const handleDelete = (id) => {
    console.log(id)
    const arr = usersStore.usersList.filter((item) => item.id !== id)
    dispatch.users.setUsersList([...arr])
  }
  const handleEdit = (id) => {
    dispatch.modal.setIsOpenModalEdit(true)
    setSelectedItem(usersStore.usersList.find(item => item.id === id))
  }

  const handleSubmitEdit = () => {
    dispatch.users.setUsersList(  
      usersStore.usersList.map(product => 
        product.id === selectedItem.id ? selectedItem : product
      )
    )
    dispatch.modal.setIsOpenModalEdit(false)
    console.log('usersStore',usersStore.usersList)
  }

  return (
    <main>
      <Head>
        <title>Users page</title>
      </Head>
      <Wrapper className={cx('ListItems')}>
        <h4>Danh sách User</h4>
        <Button onClick={showModalAdd} size='large'>
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
          dataSource={usersStore.usersList}
        />
      </div>

{/* ----------------------Modal Add------------------- */}

      <Modal
        className={cx('modal')}
        width={800}
        title="Add product"
        open={modalStore.isOpenModalAdd}
        onOk={() => form.submit()}
        okText='Submit'
        okType='default'
        onCancel={() => dispatch.modal.setIsOpenModalAdd(false)}
      >
        <Form
          form={form}
          onFinish={handleSubmitAdd}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="First Name:"
            name="firstName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name:"
            name="lastName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username:"
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
          <Form.Item
            label="Email:"
            name="email"
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

{/* ----------------------Modal Edit------------------- */}
      <Modal
        className={cx('modal')}
        width={800}
        title="Edit user"
        open={modalStore.isOpenModalEdit}
        onOk={handleSubmitEdit}
        okText='Submit'
        okType='default'
        onCancel={() => dispatch.modal.setIsOpenModalEdit(false)}
      >
        <Form.Item>
           <label className="floating-label">First Name:</label>
          <Input
            value={selectedItem?.firstName}
            onChange={(e) => {
              setSelectedItem((pre) => {
                return { ...pre, firstName: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <label className="floating-label">Last Name:</label>
          <Input
            value={selectedItem?.lastName}
            onChange={(e) => {
              setSelectedItem((pre) => {
                return { ...pre, lastName: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <label className="floating-label">Username:</label>
          <Input
            value={selectedItem?.username}
            onChange={(e) => {
              setSelectedItem((pre) => {
                return { ...pre, username: e.target.value };
              });
            }}
          />
        </Form.Item>

        <Form.Item>
          <label className="floating-label">Password:</label>
          <Input
            value={selectedItem?.password}
            onChange={(e) => {
              setSelectedItem((pre) => {
                return { ...pre, password: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <label className="floating-label">Email:</label>
          <Input
            value={selectedItem?.email}
            onChange={(e) => {
              setSelectedItem((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
        </Form.Item>

      </Modal>
    </main>
  )
}
