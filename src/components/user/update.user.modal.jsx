import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, fetchAllUser } = props;
    const [id, setID] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [avatar, setAvatar] = useState("");
    useEffect(
        () => {
            if (dataUpdate) {
                setID(dataUpdate._id);
                setFullName(dataUpdate.fullName);
                setPhoneNumber(dataUpdate.phone);
                setAvatar(dataUpdate.avatar);
            }
        }, [dataUpdate]
    )
    const handleClickButton = async () => {
        const res = await updateUserAPI(id, fullName, phoneNumber, avatar);
        if (res.data) {

            notification.success({
                message: "Update User",
                description: "Cap nhat user thanh cong"
            })
            resetCloseModal();
            await fetchAllUser();
        }
        else {
            notification.error({
                message: "Error Create User",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setPhoneNumber("");
        setID("");
        setAvatar("");
        setDataUpdate(null)
    }
    const handleCancel = () => {
        setIsModalUpdateOpen(false);
    };
    return (
        <div>
            <Modal
                title="Update User"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalUpdateOpen}
                onOk={() => handleClickButton()}
                onCancel={() => handleCancel()}
                maskClosable={false}
                okText={"Update"}
            >
                <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                    <span>ID:</span>
                    <div>
                        <Input value={id}
                            disabled />
                    </div>
                    <span>Full Name:</span>
                    <div>
                        <Input value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }} />
                    </div>
                    <span>Phone Number:</span>
                    <div>
                        <Input value={phoneNumber}
                            onChange={(event) => { setPhoneNumber(event.target.value) }} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UpdateUserModal;