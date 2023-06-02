import Head from "next/head"
import { Divider, Table, Space, Button } from 'antd';
import classNames from 'classnames/bind';
import styles from '@/styles/styleForm.module.scss';
import { useEffect, useState } from "react";
import { CheckOutlined } from '@ant-design/icons';
import Wrapper from '../../components/Wrapper';

const cx = classNames.bind(styles);

export default function Orders() {
  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'price',
    },
    {
      title: 'Tổng số tiền',
      dataIndex: 'total',
    },
    {
      title: 'Xác nhận',
      dataIndex: 'edit',
      align: 'center',
      width: 100,
      render: (text, row) => (<Space> <Button className={cx('btn__delete')} onClick={() => handleAction(row.id)} type="link"> {text} </Button> </Space>),
    },
  ]
  const data = [
    {
      id: 1,
      name: 'Ngọc Minh',
      product: 'Iphone X',
      quantity: 2,
      status: 'Chưa xác nhận',
      price: 899,
      total: 1798,
      edit: <CheckOutlined />,
    },
    {
      id: 2,
      name: 'Văn Khang',
      product: 'OPPOF19',
      quantity: 1,
      status: 'Chưa xác nhận',
      price: 280,
      total: 280,
      edit: <CheckOutlined />,
    },
    {
      id: 3,
      name: 'Hồng Ngọc',
      product: 'MacBook Pro',
      quantity: 1,
      status: 'Chưa xác nhận',
      price: 1749,
      total: 1749,
      edit: <CheckOutlined />,
    },
  ]

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    setOrdersList(data);
  }, [])

  const handleAction = (id) => {
    // console.log(ordersList[id-1].status)
    data[id-1].status = 'Đã xác nhận';
    setOrdersList([...data])
    return;
  }

  return (
    <main>
      <Head>
        <title>Orders page</title>
      </Head>
      <Wrapper className={cx('ListItems')}>
        <h4>Danh sách Orders</h4>
      </Wrapper>
      <div>
        <Divider />
        <Table
          columns={columns}
          dataSource={ordersList}
        />
      </div>
    </main>
  )
}
