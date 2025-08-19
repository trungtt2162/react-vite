import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Navigate } from "react-router-dom";
import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";
const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    } else {
        return (
            <Result
                status="403"
                title="OOPS!!"
                subTitle={"You must login"}
                extra={<Button href="/" type="primary">
                    <Link to='/login'>
                        <span
                        >LOG IN
                        </span>
                    </Link>
                </Button>}
            />
        )
    }

}

export default PrivateRoute;