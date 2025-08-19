import { Divider, Button, Col, Form, Input, Row, notification } from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate, Link } from "react-router-dom";


const RegisterPage = () => {
    const [formRegister] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const resRegister = await registerUserAPI(values.fullName, values.email, values.password, values.phoneNumber);
        if (resRegister.data) {
            notification.success({
                message: "Register User",
                description: "Dang ky user thanh cong"
            });
            navigate("/login");
            // resetCloseModal();
            // await fetchAllUser();
        }
        else {
            notification.error({
                message: "Error Register User",
                description: JSON.stringify(resRegister.message)
            })
        }
    }


    return (
        <div
            style={{ gap: "5px", padding: "50px" }} >
            <Form
                layout="vertical"
                name="basic"
                form={formRegister}
                // initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row justify={"center"}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,

                                message: 'Please input your password!'
                            }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[
                                // { required: true, message: 'Please input your password!' },
                                {
                                    pattern: /^0\d{5,11}$/,
                                    message: "Số điện thoại phải bắt đầu bằng 0 và dài 6–12 chữ số",
                                }]}
                        // rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12}>
                        <Button type="primary" htmlType="submit"
                        >
                            Submit
                        </Button>
                        <Divider />
                        <div>Đã có tài khoản? <Link to={"/login"} >Đăng nhập</Link> </div>
                    </Col>
                </Row>

            </Form>
        </div >
    )
}

export default RegisterPage;