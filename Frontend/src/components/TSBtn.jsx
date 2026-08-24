import { NavLink } from "react-router-dom";

function TSBtn({title, route}){
    return(
        <>
        <NavLink to={route}
            className="flex items-center justify-center h-32 rounded-2xl bg-white border-2 border-green-200 text-green-800 text-lg font-bold shadow-sm hover:bg-green-600 hover:text-white hover:border-green-600 hover:shadow-lg active:scale-95 transition-all duration-200"
        >
            {title}
        </NavLink>
        </>
    )
}

export default TSBtn;