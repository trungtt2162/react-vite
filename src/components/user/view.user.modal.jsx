import { Drawer, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";

const ViewUserModal = (props) => {
    const { isModalViewOpen, setIsModalViewOpen, dataUpdate, setDataUpdate, fetchAllUser } = props;
    const [id, setID] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(
        () => {
            if (dataUpdate) {
                setID(dataUpdate._id);
                setFullName(dataUpdate.fullName);
                setEmail(dataUpdate.email);
                setPhoneNumber(dataUpdate.phone)
            }
        }, [dataUpdate]
    )
    // const handleClickButton = async () => {
    //     const res = await updateUserAPI(id, fullName, phoneNumber);
    //     if (res.data) {

    //         notification.success({
    //             message: "Update User",
    //             description: "Cap nhat user thanh cong"
    //         })
    //         resetCloseModal();
    //         await fetchAllUser();
    //     }
    //     else {
    //         notification.error({
    //             message: "Error Create User",
    //             description: JSON.stringify(res.message)
    //         })
    //     }
    // }

    const resetCloseModal = () => {
        setIsModalViewOpen(false);
        setFullName("");
        setPhoneNumber("");
        setEmail("");
        setID("");
        setDataUpdate(null)
    }
    const handleCancel = () => {
        setIsModalViewOpen(false);
    };
    return (
        <div>
            <Drawer
                title="Profile User"
                closable={true}
                open={isModalViewOpen}
                onClose={() => handleCancel()}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                    <div>
                        ID: {id}
                    </div>
                    <div>
                        Full Name: {fullName}
                    </div>
                    <div>
                        Email: {email}
                    </div>
                    <span>Phone Number:</span>
                    <div>
                        <Input value={phoneNumber} />
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default ViewUserModal;