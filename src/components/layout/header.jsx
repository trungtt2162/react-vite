import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
// import './header.css' 
import { Menu, message } from 'antd';
import { BookOutlined, HomeFilled, LoginOutlined, LogoutOutlined, AliwangwangOutlined, SettingOutlined, UserAddOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Children, useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutUserAPI } from '../../services/api.service';
const Header = () => {
    const [current, setCurrent] = useState('mail');
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onClick = e => {
        setCurrent(e.key);
    };
    const handleLogout = async () => {
        const res = await logoutUserAPI();
        if (res.data) {
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: "",
            })
            message.success("Logout success")
            navigate("/");
        } else {
            message.error(res.data.message)
        }
    }
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

            ...(!user.id ? [{
                label: <Link to={"/login"}>Log in</Link>,
                key: 'login',
                icon: <LoginOutlined />,
            }
            ] : []),
            ...(user.id ? [{
                label: `Welcome ${user.fullName}`,
                key: 'setting',
                icon: <AliwangwangOutlined />,
                children: [
                    {
                        label: <span onClick={() => handleLogout()}>Log out</span>,
                        key: 'login',
                        icon: <LogoutOutlined />,
                    }
                ]
            }
            ] : [])
            ,
        ]
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}



export default Header;