import { Link, useLocation, useNavigate } from 'react-router-dom';
// import './header.css' 
import { Menu, message } from 'antd';
import { BookOutlined, HomeFilled, LoginOutlined, LogoutOutlined, AliwangwangOutlined, SettingOutlined, UserAddOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Children, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutUserAPI } from '../../services/api.service';
import { set } from 'nprogress';
const Header = () => {
    const [current, setCurrent] = useState('mail');
    const { user, setUser } = useContext(AuthContext);
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        if (location && location.pathname) {
            const allRoutes = ["users", "books"];
            const currentRoute = allRoutes.find(item => `/${item}` === location.pathname)
            if (currentRoute) {
                setCurrent(currentRoute);
            } else {
                setCurrent("home");
            }
        }
    },
        [location]);

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
                key: 'users',
                icon: <UserOutlined />,
            },
            {
                label: <Link to={"/books"}>Book</Link>,
                key: 'books',
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