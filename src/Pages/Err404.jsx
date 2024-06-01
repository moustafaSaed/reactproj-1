import { useRouteError } from "react-router-dom";

export default function Err404() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error-page">
            <h1>Oops!  :  Mous</h1>
            <div className="sorry">Sorry, an unexpected error has occurred.</div>
            <p>
                <i>{error.
                    // @ts-ignore
                    statusText || error.message}</i>
            </p>
        </div>
    );
}