import styles from "./FloatingBtn.module.css"
import Add_icon from "../icons/add_icon.jsx";
import {Link} from "react-router-dom";

function FloatingBtn(){
    return (
        <Link to="/post" className={styles.btn_area}>
            <Add_icon/>
        </Link>
    )
}

export default FloatingBtn;