import { Outlet,Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function PrivateRoute({children,...rest}) {
    const {user} = useContext(AuthContext)
    return ( 
        user ?
        <Outlet {...rest}>{children}</Outlet>
        :
        <Navigate to="/login" />
     );
}

export default PrivateRoute;