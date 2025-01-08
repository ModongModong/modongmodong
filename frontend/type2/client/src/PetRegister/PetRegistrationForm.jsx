import React, { useState } from 'react';
import styles from './PetRegisteration.module.css';
import Goback_icon from "../assets/icons/goback_icon.jsx";
import PetRegErrorPopup from './PetRegErrorPopup';

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

    const [errorMessages, setErrorMessages] = useState([]);

    // 뒤로가기
    const handleGoBack = () => {
        window.history.back();
    };

    // 입력 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 폼 제출
    const handleSubmit = (e) => {
        e.preventDefault();
        // 유효성검사
        const errors = [];

        if (!petData.name) errors.push(<span><span className={styles.highlight}>반려동물 이름</span>을 입력하세요</span>);
        if (!petData.age) errors.push(<span><span className={styles.highlight}>나이</span>를 입력하세요</span>);
        if (!petData.gender) errors.push(<span><span className={styles.highlight}>성별</span>을 선택하세요</span>);
        if (!petData.neuteuring_yn) errors.push(<span><span className={styles.highlight}>중성화 여부</span>를 선택하세요</span>);
        if (!petData.animal_number) errors.push(<span><span className={styles.highlight}>등록번호</span>를 입력하세요</span>);
        if (!petData.type) errors.push(<span><span className={styles.highlight}>품종</span>을 입력하세요</span>);
        if (!petData.weight) errors.push(<span><span className={styles.highlight}>체중</span>을 입력하세요</span>);
        if (!petData.surgery) errors.push(<span><span className={styles.highlight}>수술 이력</span>을 입력하세요</span>);
        if (!petData.disease) errors.push(<span><span className={styles.highlight}>질병</span>을 입력하세요</span>);

        if (errors.length > 0) {
            setErrorMessages(errors);  // 오류 메시지 상태 업데이트
        } else {
            console.log('Pet Data Submitted:', petData);
        }
    };

    return (
        <div className={styles.container}>
            {/* 뒤로가기 버튼 */}
            <button className={styles.arrowBack} onClick={handleGoBack}>
                <Goback_icon />
            </button>

            {/* 오류메시지 팝업 */}
            {errorMessages.length > 0 && (
                <PetRegErrorPopup messages={errorMessages} onClose={() => setErrorMessages([])} />
            )}

            {/* 폼 */}
            <form onSubmit={handleSubmit}>
                <label className={styles.label}>
                    <div className={styles.labelName}>반려동물 이름</div>
                    <input
                        type="text"
                        name="name"
                        value={petData.name}
                        onChange={handleChange}
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
                                className={styles.radio}
                            /> 남
                            <input
                                type="radio"
                                name="gender"
                                value="F"
                                onChange={handleChange}
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
                                className={styles.radio}
                            /> 예
                            <input
                                type="radio"
                                name="neuteuring_yn"
                                value="N"
                                onChange={handleChange}
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
                        className={styles.input}
                    />
                </label>

                {/* 폼 제출 버튼 */}
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
