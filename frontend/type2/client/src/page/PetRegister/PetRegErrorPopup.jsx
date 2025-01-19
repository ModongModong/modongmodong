import React from 'react';
import styles from './PetRegErrorPopup.module.css';

function PetRegErrorPopup({ messages, onClose }) {
    return (
        <div className={styles.errorPopup}>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
                <button onClick={onClose}>확인</button>
            </div>
        </div>
    );
}

export default PetRegErrorPopup;
