import { useEffect, useState } from "react";
import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserAPI } from "../services/api.service";


const UserPage = () => {
    const [dataUser, setDataUser] = useState([]);
    useEffect(() => {
        fetchAllUser()
    }, [dataUser._id]
    )
    const fetchAllUser = async () => {
        const res = await fetchAllUserAPI();
        if (res.data) {
            setDataUser(res.data);
        }
    }

    return (
        <div>
            <UserForm
                fetchAllUser={fetchAllUser}
            />
            <UserTable
                dataUser={dataUser}
            />
        </div>
    )
}

export default UserPage;