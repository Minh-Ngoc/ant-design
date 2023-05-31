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
    name: 'Ngọc Minh',
    username: 'ngocminh',
    password: '123456',
    edit: <EditOutlined />,
    delete: <DeleteOutlined />
  },
  {
    key: '2',
    name: 'KITS',
    username: 'kits',
    password: '123456',
    edit: <EditOutlined />,
    delete: <DeleteOutlined />
  },
];

export default function Users() {
  const { Search } = Input;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState({ add: false, edit: false });
  const [dataTable, setDataTable] = useState([...data]);
  const [selectedItem, setSelectedItem] = useState(false);

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
      width: 100,
      render: (text, row) => (<Space> <Button className={cx('btn__edit')} onClick={() => handleEdit(row.key)} type="link"> {text} </Button> </Space>),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      align: 'center',
      className: 'btn__delete',
      width: 100,
      render: (text, row) => (<Space> <Button className={cx('btn__delete')} onClick={() => handleDelete(row.key)} type="link"> {text} </Button> </Space>),
    },

  ];

  const handleEdit = (key) => {
    setIsModalOpen({edit: true})
    setSelectedItem(dataTable.find(item => item.key === key))
  }
  const handleDelete = (key) => {
    console.log(key, data);
    const arr = dataTable.filter((item) => item.key !== key)
    setDataTable([...arr])
  }

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
  
  const onSearch = (value) => console.log(...value);

  // Show Modal
  const showModalAdd = () => {
    setIsModalOpen({add: true});
  };

  // HandleOk
  const handleOkAdd = () => {
    form.submit();
  };
  // const handleOkEdit = () => {
  //   form.submit();
  // };

  // HandleCancel
  const handleCancelAdd = () => {
    setIsModalOpen({add: false});
  };

  const handleCancelEdit = () => {
    setIsModalOpen({edit: false});
  };

  // HandleSubmit
  const handleSubmitAdd = (values) => {
    console.log(values)
    if (!values.name || !values.username || !values.password) {
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

  const handleSubmitEdit = (values) => {
    setDataTable((pre) => {
      return pre.map((item) => {
        if (item.key === selectedItem.key) {
          return selectedItem;
        } else {
          return item;
        }
      });
    });
      setIsModalOpen(false);
  }

  return (
    <main>
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
          dataSource={dataTable}
        />
      </div>

          {/* ---------Modal Add USer-------- */}
      <Modal
        className={cx('modal')}
        width={800}
        title="Add user"
        open={isModalOpen.add}
        onOk={handleOkAdd}
        okText='Submit'
        okType='default'
        onCancel={handleCancelAdd}
      >
        <Form
          form={form}
          onFinish={handleSubmitAdd}
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

          {/* ---------Modal Edit USer-------- */}

      <Modal
        className={cx('modal')}
        width={800}
        title="Edit user"
        open={isModalOpen.edit}
        onOk={handleSubmitEdit}
        okText='Submit'
        okType='default'
        onCancel={handleCancelEdit}
      >
        <Form.Item>
          <label className="floating-label">Họ và tên:</label>
          <Input
            value={selectedItem?.name}
            onChange={(e) => {
              setSelectedItem((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <label className="floating-label">Tên đăng nhập:</label>
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
          <label className="floating-label">Mật khẩu:</label>
          <Input
            value={selectedItem?.password}
            onChange={(e) => {
              setSelectedItem((pre) => {
                return { ...pre, password: e.target.value };
              });
            }}
          />
        </Form.Item>

      </Modal>

    </main>
  )
}
