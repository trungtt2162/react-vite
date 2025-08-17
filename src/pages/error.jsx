import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div>
            <Result
                status="404"
                title="OOPS!!"
                subTitle={error.statusText || error.message}
                extra={<Button href="/" type="primary">
                    <Link to='/'>
                        <span
                        >BACK TO HOMEPAGE
                        </span>
                    </Link>
                </Button>}
            />
        </div>

    );
}

export default ErrorPage;