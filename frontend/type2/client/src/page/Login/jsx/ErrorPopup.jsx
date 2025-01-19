import React from "react";
import styles from "../css/ErrorPopup.module.css";

function ErrorPopup({ message, onClose }) {
    return (
        <div className={styles.popupBackdrop}>
            <div className={styles.popupContainer}>
                <div className={styles.popupMessage}>{message}</div>
                <button className={styles.closeButton} onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
}

export default ErrorPopup;
