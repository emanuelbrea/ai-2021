import {Redirect, Route} from "react-router-dom";
import useToken from "./useToken";


export default function PrivateRoute({component: Component, ...rest}) {
    const token = useToken()['token'];

    return <Route {...rest} render={(props) => (
        token !== undefined
            ? <Component {...props} />
            : <Redirect to='/login'/>
    )}/>
}