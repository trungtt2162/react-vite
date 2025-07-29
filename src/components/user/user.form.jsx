import { Button, Input } from "antd";
import { useState } from "react";

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("")

    const handleClickButton = () => {
    }
    return (
        <div className="form-input" style={{ margin: "20px 0", padding: "20px" }} >
            <div> Full Name:
                <Input value={fullName}
                    onChange={(event) => { setFullName(event.target.value) }} />
            </div>
            <div> Email:
                <Input value={email}
                    onChange={(event) => { setEmail(event.target.value) }} />
            </div>
            <div> Phone Number:
                <Input value={phoneNumber}
                    onChange={(event) => { setPhoneNumber(event.target.value) }} />
            </div>
            <div> Password:
                <Input.Password value={password}
                    onChange={(event) => { setPassword(event.target.value) }} />
            </div>
            <Button type="primary"
                onClick={() => handleClickButton()}
            >Create User</Button>
        </div>
    )
}

export default UserForm;