import React, { useState } from 'react';
import styles from './PetRegisteration.module.css';
import Goback_icon from "../assets/icons/goback_icon.jsx";

function PetRegistrationForm() {
    const [petData, setPetData] = useState({
        name: '',
        age: '',
        gender: '',
        neuteuring_yn: '',
        animal_number: '',
        type: '',
        weight: '',
        surgery: '',
        disease: ''
    });

    // 입력
    const handleChange = (e) => {
        const {name, value} = e.target;
        setPetData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 폼 제출
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Pet Data Submitted:', petData);
        // 여기서 API를 호출하여 반려동물 데이터를 저장할 수 있습니다.
    };

    return (
        <div className={styles.container}>
            {/*뒤로가기버튼*/}
            <button className={styles.arrowBack} onClick={() => window.history.back()}>
                <Goback_icon/>
            </button>

            {/* 폼 */}
            <form onSubmit={handleSubmit}>
                <label className={styles.label}>
                    <div className={styles.labelName}>반려동물 이름</div>
                    <input
                        type="text"
                        name="name"
                        value={petData.name}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    <div className={styles.labelName}>나이</div>
                    <input
                        type="number"
                        name="age"
                        value={petData.age}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </label>

                <label className={styles.radioGroup}>
                    <div className={styles.radioLabelContainer}>
                        <div className={styles.labelName}>성별</div>
                        <div className={styles.radioContainer}>
                            <input
                                type="radio"
                                name="gender"
                                value="M"
                                onChange={handleChange}
                                required
                                className={styles.radio}
                            /> 남
                            <input
                                type="radio"
                                name="gender"
                                value="F"
                                onChange={handleChange}
                                required
                                className={styles.radio}
                            /> 여
                        </div>
                    </div>

                    <div className={styles.radioLabelContainer}>
                        <div className={styles.labelName}>중성화여부</div>
                        <div className={styles.radioContainer}>
                            <input
                                type="radio"
                                name="neuteuring_yn"
                                value="Y"
                                onChange={handleChange}
                                required
                                className={styles.radio}
                            /> 예
                            <input
                                type="radio"
                                name="neuteuring_yn"
                                value="N"
                                onChange={handleChange}
                                required
                                className={styles.radio}
                            /> 아니오
                        </div>
                    </div>
                </label>

                <label className={styles.label}>
                    <div className={styles.labelName}>등록번호</div>
                    <input
                        type="number"
                        name="animal_number"
                        value={petData.animal_number}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    <div className={styles.labelName}>품종</div>
                    <input
                        type="text"
                        name="type"
                        value={petData.type}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    <div className={styles.labelName}>체중</div>
                    <input
                        type="number"
                        name="weight"
                        value={petData.weight}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    <div className={styles.labelName}>수술 이력</div>
                    <input
                        type="text"
                        name="surgery"
                        value={petData.surgery}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </label>

                <label className={styles.label}>
                    <div className={styles.labelName}>질병</div>
                    <input
                        type="text"
                        name="disease"
                        value={petData.disease}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </label>

            {/*폼 제출 버튼*/}
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.submitButton}>
                        반려동물 등록 완료
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PetRegistrationForm;
