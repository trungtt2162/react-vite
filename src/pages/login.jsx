import { React, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Divider, notification, message } from 'antd';
import { loginUserAPI } from "../services/api.service";
import { useNavigate, Link } from "react-router-dom";


const LoginPage = () => {
    const [formLogin] = Form.useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        setIsLoading(true);
        console.log('Success:', values);
        const resLogin = await loginUserAPI(values.email, values.password);
        console.log('check res:', resLogin);
        if (resLogin.data) {
            message.success("Dang nhap thanh cong");
            navigate("/");
            // resetCloseModal();
            // await fetchAllUser();
        }
        else {
            notification.error({
                message: "Error Register User",
                description: JSON.stringify(resLogin.message)
            })
        }
        setIsLoading(false);

    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div
            style={{ padding: "50px" }}
        >
            <Row justify={"center"}>
                <Col xs={24} md={12}>
                    <fieldset style={
                        {
                            padding: "15px",
                            margin: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "10px"
                        }
                    }>
                        <legend>Login</legend>
                        <Form
                            name="formLogin"
                            layout='vertical'
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' },
                                {
                                    type: "email",
                                    message: "Email không đúng định dạng!",
                                },]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            {/* <Form.Item name="remember" valuePropName="checked" label={null}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item> */}

                            <Form.Item label={null}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItem: "center"
                                    }}
                                >
                                    <Button
                                        loading={isLoading}
                                        type="primary" htmlType="submit">
                                        Login
                                    </Button>
                                    <Link to="/">Back to homepage </Link>
                                </div>
                            </Form.Item>

                            <Divider />
                            <div>Chưa có tài khoản? <Link to={"/login"} >Đăng ký ngay</Link> </div>
                        </Form>
                    </fieldset>
                </Col>
            </Row>
        </div >
    )
};
export default LoginPage;