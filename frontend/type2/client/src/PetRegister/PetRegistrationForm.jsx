import { useState, useEffect } from 'react';
import styles from './PetRegisteration.module.css';
import Goback_icon from "../assets/icons/goback_icon.jsx";
import PetRegErrorPopup from './PetRegErrorPopup';
import { useNavigate } from "react-router-dom";

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
    const [user, setUser] = useState(null); // 사용자 정보
    const [petTypes, setPetTypes] = useState([]); // 품종 목록
    const [diseases, setDiseases] = useState([]); // 질병 목록
    const navigate = useNavigate();

    // 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/myinfo", {
                    method: "GET",
                    credentials: "include", // 세션 정보와 쿠키를 포함하여 요청
                });

                if (!response.ok) {
                    alert("로그인되지 않았습니다.");
                    window.location.href = "/login";
                    return;
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("유저 정보 로딩 중 오류 발생:", error);
            }
        };

        fetchUserData();
    }, []);

    // 품종 목록과 질병 목록 불러오기
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const petTypesResponse = await fetch("http://localhost:8080/api/get-list/pet_type", {
                    method: "GET",
                    credentials: "include",
                });
                const diseasesResponse = await fetch("http://localhost:8080/api/get-list/disease", {
                    method: "GET",
                    credentials: "include",
                });

                const petTypesData = await petTypesResponse.json();
                const diseasesData = await diseasesResponse.json();

                setPetTypes(petTypesData);
                setDiseases(diseasesData);
            } catch (error) {
                console.error("품종/질병 목록 로딩 중 오류 발생:", error);
            }
        };

        fetchDropdownData();
    }, []);

    // 뒤로가기
    const goBack = () => {
        navigate(-1);
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
    const handleSubmit = async (e) => {
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
            setErrorMessages(errors);
        } else {
            try {
                const response = await fetch("http://localhost:8080/api/pets", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // 세션 정보와 쿠키를 포함하여 요청
                    body: JSON.stringify({
                        userId: user?.id,  // 유저 ID
                        diseaseId: petData.disease,
                        petTypeId: petData.type,
                        name: petData.name,
                        age: petData.age,
                        gender: petData.gender,
                        neuteringYn: petData.neuteuring_yn,
                        animalNumber: petData.animal_number,
                        weight: petData.weight,
                        surgery: petData.surgery,
                    }),
                });

                if (!response.ok) {
                    // 예외를 던지는 대신 사용자에게 오류를 표시
                    const errorData = await response.json();
                    setErrorMessages([<span><span className={styles.highlight}>오류:</span> {errorData.message || "데이터 전송 실패"}</span>]);
                    return;
                }

                const result = await response.json();
                console.log("반려동물 등록 성공:", result);
                alert("반려동물을 등록했습니다.")
                navigate("/mypage");

            } catch (error) {
                console.error("반려동물 등록 중 오류 발생:", error);
                setErrorMessages([<span><span className={styles.highlight}>등록 중 오류 발생</span>했습니다. 다시 시도해주세요.</span>]);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.arrowBack} onClick={goBack}>
                    <Goback_icon />
                </div>
                <div className={styles.pageTitle}>반려동물 등록</div>
            </div>

            {errorMessages.length > 0 && (
                <PetRegErrorPopup messages={errorMessages} onClose={() => setErrorMessages([])} />
            )}

            <div className="formContainer">
                <form onSubmit={handleSubmit} className={styles.form}>
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
                        <select
                            name="type"
                            value={petData.type}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option value="">품종을 선택하세요</option>
                            {petTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
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
                        <select
                            name="disease"
                            value={petData.disease}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option value="">질병을 선택하세요</option>
                            {diseases.map((disease) => (
                                <option key={disease.id} value={disease.id}>{disease.name}</option>
                            ))}
                        </select>
                    </label>

                    <div className={styles.submitContainer}>
                        <button type="submit" className={styles.submitButton}>
                            반려동물 등록 완료
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PetRegistrationForm;
