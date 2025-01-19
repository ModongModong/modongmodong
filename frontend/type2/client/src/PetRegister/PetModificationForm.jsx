import { useState, useEffect } from 'react';
import styles from './PetRegisteration.module.css';
import Goback_icon from "../assets/icons/goback_icon.jsx";
import PetRegErrorPopup from './PetRegErrorPopup';
import { useNavigate, useParams } from "react-router-dom";

function PetModificationForm() {
    const [petData, setPetData] = useState({
        petId: '',
        userId: '',
        diseaseId: '',
        disease: '',
        petTypeId: '',
        petType: '',
        name: '',
        age: '',
        gender: '',
        neuteuringYn: '',
        animalNumber: '',
        weight: '',
        surgery: ''
    });
    const [errorMessages, setErrorMessages] = useState([]);
    const [petTypes, setPetTypes] = useState([]); // 품종 목록
    const [diseases, setDiseases] = useState([]); // 질병 목록
    const navigate = useNavigate();
    const { petId } = useParams(); // URL에서 petId를 가져옵니다.

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

    // petId에 해당하는 반려동물 데이터 가져오기
    useEffect(() => {
        if (petId) {
            const fetchPetData = async (petId) => {
                try {
                    const response = await fetch(`http://localhost:8080/api/pets/${petId}`, {
                        method: "GET",
                        credentials: "include",  // 세션 쿠키 포함
                    });

                    if (response.ok) {
                        const petData = await response.json();  // 단일 반려동물 데이터
                        console.log("반려동물 데이터:", petData);  // API 응답 확인
                        setPetData(petData);  // 상태 업데이트
                    } else {
                        console.error("반려동물 정보를 가져오지 못했습니다.");
                    }
                } catch (error) {
                    console.error("반려동물 정보 로딩 중 오류 발생:", error);
                }
            };

            fetchPetData(petId);  // petId를 전달하여 데이터 가져오기
        }
    }, [petId]);  // petId가 변경될 때마다 실행

    // 뒤로가기
    const goBack = () => {
        navigate(-1);
    };

    // 입력 처리
    const handleChange = (e) => {
        const { name, value } = e.target;

        setPetData((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: value,
            };

            // petTypeId가 변경되었을 때 petType도 동기화
            if (name === "petTypeId") {
                const selectedPetType = petTypes.find((type) => type.id === parseInt(value));
                updatedData.petType = selectedPetType ? selectedPetType.name : "";
            }

            // diseaseId가 변경되었을 때 disease도 동기화
            if (name === "diseaseId") {
                const selectedDisease = diseases.find((type) => type.id === parseInt(value));
                updatedData.disease = selectedDisease ? selectedDisease.name : "";
            }

            console.log('Updated petData:', updatedData); // 상태 업데이트 후 출력
            return updatedData;
        });
    };

    // 폼 제출
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 유효성검사
        const errors = [];

        if (!petData.name) errors.push(<span><span className={styles.highlight}>반려동물 이름</span>을 입력하세요</span>);
        if (!petData.age) errors.push(<span><span className={styles.highlight}>나이</span>를 입력하세요</span>);
        if (!petData.gender) errors.push(<span><span className={styles.highlight}>성별</span>을 선택하세요</span>);
        if (!petData.neuteuringYn) errors.push(<span><span className={styles.highlight}>중성화 여부</span>를 선택하세요</span>);
        if (!petData.animalNumber) errors.push(<span><span className={styles.highlight}>등록번호</span>를 입력하세요</span>);
        if (!petData.petTypeId || !petData.petType) errors.push(<span><span className={styles.highlight}>품종</span>을 입력하세요</span>);
        if (!petData.weight) errors.push(<span><span className={styles.highlight}>체중</span>을 입력하세요</span>);
        if (!petData.surgery) errors.push(<span><span className={styles.highlight}>수술 이력</span>을 입력하세요</span>);
        if (!petData.diseaseId|| !petData.disease) errors.push(<span><span className={styles.highlight}>질병</span>을 입력하세요</span>);

        if (errors.length > 0) {
            setErrorMessages(errors);
            
        } else {
            try {
                const { petId, userId, disease, petType, ...petRequestData } = petData;
                const response = await fetch(`http://localhost:8080/api/pets/${petId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(petRequestData),
                });

                if (!response.ok) {
                    const errorDetails = await response.text();
                    console.error("응답 상태:", response.status, response.statusText);
                    console.error("응답 본문:", errorDetails);
                    alert("수정 실패");
                    return;
                }

                alert("수정 성공");
                navigate(`/mypage`);

            } catch (error) {
                console.error("수정 중 오류 발생:", error);
                alert("수정 중 오류 발생");
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.arrowBack} onClick={goBack}>
                    <Goback_icon />
                </div>
                <div className={styles.pageTitle}>반려동물 수정</div>
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

                    <div className={styles.radioGroup}>
                        <div className={styles.radioLabelContainer}>
                            <div className={styles.labelName}>성별</div>
                            <div className={styles.radioContainer}>
                                <div className={styles.radio}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="M"
                                        onChange={handleChange}
                                        checked={petData.gender === 'M'}
                                    /> 남
                                </div>
                                <div className={styles.radio}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="F"
                                        onChange={handleChange}
                                        checked={petData.gender === 'F'}
                                    /> 여
                                </div>
                            </div>
                        </div>


                        <div className={styles.radioLabelContainer}>
                            <div className={styles.labelName}>중성화여부</div>
                            <div className={styles.radioContainer}>
                                <div className={styles.radio}>
                                    <input
                                        type="radio"
                                        name="neuteuringYn"
                                        value="Y"
                                        onChange={handleChange}
                                        checked={petData.neuteuringYn === 'Y'} // 여기서 값을 확인하고 체크 상태를 설정
                                    /> O
                                </div>
                                <div className={styles.radio}>
                                    <input
                                        type="radio"
                                        name="neuteuringYn"
                                        value="N"
                                        onChange={handleChange}
                                        checked={petData.neuteuringYn === 'N'} // 여기서 값을 확인하고 체크 상태를 설정
                                    /> X
                                </div>
                                </div>
                            </div>
                        </div>

                        <label className={styles.label}>
                        <div className={styles.labelName}>등록번호</div>
                        <input
                            type="number"
                            name="animalNumber"
                            value={petData.animalNumber}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>

                    <label className={styles.label}>
                        <div className={styles.labelName}>품종</div>
                        <select
                            name="petTypeId"
                            value={petData.petTypeId}
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
                            name="diseaseId"
                            value={petData.diseaseId}
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
                            반려동물 수정 완료
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PetModificationForm;
