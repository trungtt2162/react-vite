import { Link, NavLink } from 'react-router-dom';
// import './header.css' 
import { Menu } from 'antd';
import { BookOutlined, HomeFilled, ProductOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
const Header = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const items =
        [
            {
                label: <Link to={"/"}>Home</Link>,
                key: 'home',
                icon: <HomeFilled />,
            },
            {
                label: <Link to={"/users"}>User</Link>,
                key: 'user',
                icon: <UserOutlined />,
            },
            {
                label: <Link to={"/books"}>Book</Link>,
                key: 'book',
                icon: <BookOutlined />,
            },
        ]
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}



export default Header;