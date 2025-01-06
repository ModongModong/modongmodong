import GobackIcon from "../icons/goback_icon.jsx";
import styles from "./FloatingBtn.module.css"
import Add_icon from "../icons/add_icon.jsx";

function FloatingBtn(){
    return (
        <div className={styles.btn_area}>
            <Add_icon/>
        </div>
    )
}

export default FloatingBtn;