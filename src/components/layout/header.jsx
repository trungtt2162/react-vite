import { Link, NavLink } from 'react-router-dom';
// import './header.css' 
import { Menu } from 'antd';
import { BookOutlined, HomeFilled, ProductOutlined, SettingOutlined, UserAddOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Children, useState } from 'react';
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
            {
                label: "Setting",
                key: 'setting',
                icon: <SettingOutlined />,
                children: [
                    {
                        label: <Link to={"/register"}>Sign In</Link>,
                        key: 'register',
                        icon: <UserSwitchOutlined />,
                    },
                    {
                        label: <Link to={"/login"}>Login</Link>,
                        key: 'login',
                        icon: <UserSwitchOutlined />,
                    }
                ]
            },
        ]
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}



export default Header;