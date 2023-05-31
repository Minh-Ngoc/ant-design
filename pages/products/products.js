import Wrapper from '../../components/Wrapper';
import { Input, Space, Button, Modal, Form, Divider, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from '@/styles/styleForm.module.scss';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);


export default function Products() {
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
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
      title: 'Thương hiệu',
      dataIndex: 'brand',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      align: 'center',
      width: 100,
      render: (text, row) => (<Space> <Button className={cx('btn__edit')} onClick={() => handleEdit(row.id)} type="link"> {text} </Button> </Space>),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      align: 'center',
      width: 100,
      render: (text, row) => (<Space> <Button className={cx('btn__delete')} onClick={() => handleDelete(row.id)} type="link"> {text} </Button> </Space>),
    },
    
  ];

  const [selectedItem, setSelectedItem] = useState(false);

  const [form] = Form.useForm();
  const { Search } = Input;
  
  const dispatch = useDispatch();

  const productsStore = useSelector((state) => state.products);
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
    dispatch.products.fetchProducts();
    // dispatch.products.setProductsList()
  }, [])

  const attbute = {
    edit: <EditOutlined />,
    delete: <DeleteOutlined />
  }
  // productsStore.productsList && 
  // productsStore.productsList.map(item => 
  //   Object.assign(item,attbute)
  // )

  const handleSubmitAdd = (values) => {
    if (!values.title || !values.price || !values.category || !values.brand) {
      return;
    } else {
      
      dispatch.products.setProductsList([...productsStore.productsList, {
        key: Math.floor(Math.random() * 10000) + 1,
        title: values.title,
        price: values.price,
        category: values.category,
        brand: values.brand,
      }])

      dispatch.modal.setIsOpenModalAdd(false);
    }
    return;
  }

  const handleDelete = (id) => {
    const arr = productsStore.productsList.filter((item) => item.id !== id)
    dispatch.products.setProductsList([...arr])
  }
  const handleEdit = (id) => {
    dispatch.modal.setIsOpenModalEdit(true)
    setSelectedItem(productsStore.productsList.find(item => item.id === id))
  }

  const handleSubmitEdit = (values) => {
    dispatch.products.setProductsList((pre) => {
      return pre.map((item) => {
        if (item.id === selectedItem.id) {
          return selectedItem;
        } else {
          return item;
        }
      });
    });
    dispatch.modal.setIsOpenModalEdit(false);
    console.log(productsStore.productsList)
  }

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
          dataSource={productsStore.productsList}
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
            label="Tên sản phẩm:"
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá:"
            name="price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Loại sản phẩm:"
            name="category"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thương hiệu:"
            name="brand"
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
          <label className="floating-label">Tên sản phẩm:</label>
          <Input
            value={selectedItem?.title}
            onChange={(e) => {
              setSelectedItem((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <label className="floating-label">Giá:</label>
          <Input
            value={selectedItem?.price}
            onChange={(e) => {
              setSelectedItem((pre) => {
                return { ...pre, price: e.target.value };
              });
            }}
          />
        </Form.Item>

        <Form.Item>
          <label className="floating-label">Loại sản phẩm:</label>
          <Input
            value={selectedItem?.category}
            onChange={(e) => {
              setSelectedItem((pre) => {
                return { ...pre, category: e.target.value };
              });
            }}
          />
        </Form.Item>

        <Form.Item>
          <label className="floating-label">Thương hiệu:</label>
          <Input
            value={selectedItem?.brand}
            onChange={(e) => {
              setSelectedItem((pre) => {
                return { ...pre, brand: e.target.value };
              });
            }}
          />
        </Form.Item>

      </Modal>
    </main>
  )
}
