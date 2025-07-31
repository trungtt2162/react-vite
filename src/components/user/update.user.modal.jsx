import { useState } from "react";

const UpdateUserModal = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClickButton = async () => {

        // const res = await createUserAPI(fullName, email, phoneNumber, password);
        // if (res.data) {
        //     notification.success({
        //         message: "Create User",
        //         description: "Tao moi user thanh cong"
        //     })
        //     resetCloseModal();
        //     await fetchAllUser();
        // }
        // else {
        //     notification.error({
        //         message: "Error Create User",
        //         description: JSON.stringify(res.message)
        //     })
        // }
        const showModal = () => {
            setIsModalOpen(true);
        };

        const handleCancel = () => {
            setIsModalOpen(false);
        };
    }
    return (
        <div>
            <Modal
                title="Create New User"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => handleClickButton()}
                onCancel={() => handleCancel()}
                maskClosable={false}
                okText={"Create"}
            >
                <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                    <span>Full Name:</span>
                    <div>
                        <Input value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }} />
                    </div>
                    <span>Email:</span>
                    <div>
                        <Input value={email}
                            onChange={(event) => { setEmail(event.target.value) }} />
                    </div>
                    <span>Phone Number:</span>
                    <div>
                        <Input value={phoneNumber}
                            onChange={(event) => { setPhoneNumber(event.target.value) }} />
                    </div>
                    <span>Password:</span>
                    <div>
                        <Input.Password value={password}
                            onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UpdateUserModal;