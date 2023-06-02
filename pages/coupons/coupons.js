import Wrapper from '../../components/Wrapper';
import { Input, Space, Button, Modal, Form, Divider, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from '@/styles/styleForm.module.scss';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import Head from 'next/head';

const cx = classNames.bind(styles);


export default function Products() {
  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
    },
    {
      title: '%',
      dataIndex: 'percent',
      align: 'center',
    },
    {
      title: 'Mã giảm giá',
      dataIndex: 'codeCoupon',
      align: 'center',
    },
    // {
    //   title: 'Edit',
    //   dataIndex: 'edit',
    //   align: 'center',
    //   width: 100,
    //   render: (text, row) => (<Space> <Button className={cx('btn__edit')} onClick={() => handleEdit(row.id)} type="link"> {text} </Button> </Space>),
    // },
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

  const couponsStore = useSelector((state) => state.coupons);
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
    dispatch.coupons.fetchCoupons();
  }, [])

  const attbute = {
    // edit: <EditOutlined />,
    delete: <DeleteOutlined />
  }
  couponsStore.couponsList && 
  couponsStore.couponsList.map(item => 
    Object.assign(item,attbute)
  )

  const handleSubmitAdd = (values) => {
    if (!values.title || !values.percent || !values.codeCoupon) {
      return;
    } else {
      dispatch.coupons.setCouponsList([...couponsStore.couponsList, {
        id: Math.floor(Math.random() * 10000) + 1,
        title: values.title,
        percent: values.percent,
        codeCoupon: values.codeCoupon,
      }]);
    }
    dispatch.modal.setIsOpenModalAdd(false);
    return;
  }

  const handleDelete = (id) => {
    const arr = couponsStore.couponsList.filter((item) => item.id !== id)
    dispatch.coupons.setCouponsList([...arr])
  }
  // const handleEdit = (id) => {
  //   dispatch.modal.setIsOpenModalEdit(true)
  //   setSelectedItem(productsStore.productsList.find(item => item.id === id))
  // }

  // const handleSubmitEdit = () => {
  //   dispatch.products.setProductsList(  
  //     productsStore.productsList.map(product => 
  //       product.id === selectedItem.id ? selectedItem : product
  //     )
  //   )
  //   dispatch.modal.setIsOpenModalEdit(false)
  //   console.log('productsStore',productsStore.productsList)
  // }

  return (
    <main>
      <Head>
        <title>Coupons page</title>
      </Head>
      <Wrapper className={cx('ListItems')}>
        <h4>Danh sách Coupons</h4>
        <Button onClick={showModalAdd} size='large'>
          Add new coupon
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
          dataSource={couponsStore.couponsList}
        />
      </div>

{/* ----------------------Modal Add------------------- */}

      <Modal
        className={cx('modal')}
        width={800}
        title="Add coupon"
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
            label="Tiêu đề:"
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
            label="Tỷ lệ % giảm giá:"
            name="percent"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mã giảm giá:"
            name="codeCoupon"
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
      {/* <Modal
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
            value={selectedItem && selectedItem.title}
              onChange={e => setSelectedItem(pre => {
                return {...pre, title: e.target.value}
              })}
          />
        </Form.Item>
        <Form.Item>
          <label className="floating-label">Giá:</label>
          <Input
            value={selectedItem && selectedItem.price}
            onChange={e => setSelectedItem(pre => {
              return {...pre, price: e.target.value}
            })}
          />
        </Form.Item>

        <Form.Item>
          <label className="floating-label">Loại sản phẩm:</label>
          <Input
            value={selectedItem && selectedItem.category}
            onChange={e => setSelectedItem(pre => {
              return {...pre, category: e.target.value}
            })}
          />
        </Form.Item>

        <Form.Item>
          <label className="floating-label">Thương hiệu:</label>
          <Input
            value={selectedItem && selectedItem.brand}
            onChange={e => setSelectedItem(pre => {
              return {...pre, brand: e.target.value}
            })}
          />
        </Form.Item>

      </Modal> */}
    </main>
  )
}
