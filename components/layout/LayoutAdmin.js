import { useState } from 'react';
import { useRouter } from "next/router";
import Image from 'next/image';
import { SolutionOutlined, MenuOutlined, ShoppingCartOutlined, TeamOutlined, GiftOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import classNames from 'classnames/bind';
import styles from './LayoutAdmin.module.scss';
import Logo from '../../assets/imgs/Logo.svg'
import Link from 'next/link';

const cx = classNames.bind(styles);

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    const toLowerCase = (href) => href.toLowerCase();
    return {
        key,
        icon,
        children,
        label: <Link href={`/${toLowerCase(label)}`}> {label} </Link>,
    };
}

const items = [
    getItem('Users', '1', <SolutionOutlined />),
    getItem('Customers', '2', <TeamOutlined />),
    getItem('Products', '3', <MenuOutlined />),
    getItem('Orders', '4', <ShoppingCartOutlined />),
    getItem('Coupons', '5', <GiftOutlined />),
];

const LayoutAdmin = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter()
    const path = router.pathname.replace('/','')

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onClick = (e) => {
        console.log('click ', e);
    };

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Link href='/' className={cx('logo-vertical')}>
                    <Image
                        src={Logo}
                        width='100%'
                        alt="Picture of the author"
                    />
                    <div className={cx('sidebar__logo-text')}>
                        <h2>MyNFT</h2>
                        <p>NFT Marketplace</p>
                    </div>
                </Link>
                <Menu 
                    onClick={onClick}
                    theme="dark" 
                    defaultSelectedKeys={['1']} 
                    mode="inline" 
                    items={items} 
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: '0 40px',
                        background: colorBgContainer,
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '1rem 0',
                            fontSize: '20px'
                        }}
                    >
                        <Breadcrumb.Item> {path.toUpperCase() ? path.toUpperCase() : 'HOME'} </Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                    }}
                >
                    { children }
                </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;