import {Link, useLocation} from "react-router-dom";

const Button = ({to, state, disabled = false, isNav = false, children, ...props}) => {
    const {search} = useLocation();
    return (
        <Link to={to} state={state} {...props}>
            <button disabled={disabled} className={isNav && search === to ? 'active' : ''}>{children}</button>
        </Link>
    );
};

export {Button};