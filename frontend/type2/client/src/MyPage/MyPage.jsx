import React, {useEffect, useState} from 'react';
import styles from './MyPage.module.css';
import GobackIcon from "../assets/icons/goback_icon.jsx";
import MyPageIcon from "../assets/icons/mypage_icon.jsx"; // 유저이미지데이터 들어오면 삭제
import {useNavigate} from "react-router-dom";

function MyPage() {
    // 유저 정보와 반려동물 정보를 데이터로 처리
    const [user, setUser] = useState(null);
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    //뒤로가기 버튼
    const goBack = () => {
        navigate(-1);
    };

    // 등록페이지 이동
    const handlePetRegClick = () => {
        navigate('/petregister');  // 반려동물 등록 페이지로 이동
    };

    // 수정페이지 이동
    const handlePetModClick = (petId) => {
        navigate(`/petmodify/${petId}`);  // petId를 URL에 포함시켜 경로 변경
    };

    // 로그아웃
    const logoutHandler = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.redirected) {
                // 리다이렉트된 경로로 이동
                window.location.href = response.url;
            } else if (response.ok) {
                // 리다이렉트가 없는 경우
                console.log('로그아웃 성공');
                navigate('/login'); // 로그인페이지로 리다이렉트
            } else {
                console.error('로그아웃 실패: ', response.statusText);
            }
        } catch (error) {
            console.error('로그아웃 중 오류 발생: ', error);
        }
    };

    // 마이페이지 로드 시 로그인된 유저 정보 가져오기
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

    useEffect(() => {
        if (user) {
            const fetchPetData = async (userId) => {
                try {
                    const response = await fetch(`http://localhost:8080/api/pets/user/${userId}`, {
                        method: "GET",
                        credentials: "include",
                    });

                    if (response.ok) {
                        const petsData = await response.json();
                        console.log("반려동물 데이터:", petsData);  // API 응답을 확인
                        // 데이터 매핑
                        const mappedPets = petsData.map(pet => ({
                            ...pet
                        }));
                        // mappedPets 상태에 설정
                        setPets(mappedPets);
                    } else {
                        console.error("반려동물 정보를 가져오지 못했습니다.");
                    }
                } catch (error) {
                    console.error("반려동물 정보 로딩 중 오류 발생:", error);
                }
            };

            fetchPetData(user.id);
        }
    }, [user]); // user가 변경될 때마다 실행



    if (!user) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className={styles.container}>
            {/* 헤더 */}
            <div className={styles.headerContainer}>
                {/* 뒤로가기 버튼 */}
                <div className={styles.backButtonContainer} onClick={goBack}>
                    <GobackIcon className={styles.backButton}/>
                </div>

                {/* 마이페이지 제목 */}
                <div className={styles.pageTitle}>
                    마이페이지
                </div>
            </div>

            {/* 유저 정보 */}
            <div className={styles.userInfoContainer}>
                <div className={styles.userContent}>
                    {/* 유저이미지 */}
                    <div className={styles.userImageContainer}>
                        <MyPageIcon className={styles.userImage}/> {/* 향후 유저이미지로 대체*/}
                    </div>
                    {/* 유저이름 */}
                    <div className={styles.userNameContainer}>
                        <div>{user.nickname}</div>
                    </div>
                </div>
            </div>
            <div className={styles.LogoutCon}>
            <div className={styles.logoutEmpty}></div>
            <div className={styles.logoutButtonCon}>
                <button className={styles.logoutButton} onClick={logoutHandler}>로그아웃</button>
            </div>
            </div>
            <hr className={styles.divider}/>

            {/* 반려동물 정보 */}
            <div className={styles.petInfoSectionContainer}>
                <div className={styles.petInfoSection}>
                    <h2>반려동물 정보</h2>
                </div>
            </div>

            {/* 반려동물 목록 */}
            <div className={styles.petDetailsContainer}>
                {pets.length === 0 ? (
                    <div>등록된 반려동물이 없습니다. 반려동물을 새로 등록해보세요!</div>
                ) : (
                    pets.map((pet, index) => (
                        <div className={styles.petContainer} key={index}>
                            <h3>{pet.name}</h3>
                            <div className={styles.petDetails}>
                                <div className={styles.leftColumn}>
                                    <ul>
                                        <li><span className={styles.boldText}>나이</span> <span>{pet.age}세</span></li>
                                        <li><span className={styles.boldText}>성별</span>
                                            <span>{pet.gender === 'M' ? '남' : '여'}</span></li>
                                        <li><span className={styles.boldText}>등록번호</span>
                                            <span>{pet.animalNumber}</span></li>
                                        <li><span className={styles.boldText}>품종</span> <span>{pet.petType}</span></li>
                                        <li><span className={styles.boldText}>수술이력</span> <span>{pet.surgery}</span>
                                        </li>

                                    </ul>
                                </div>
                                <div className={styles.rightColumn}>
                                    <ul>
                                        <li><span className={styles.boldText}>체중</span> <span>{pet.weight}kg</span></li>
                                        <li><span className={styles.boldText}>중성화 여부</span>
                                            <span>{pet.neuteringYn === 'Y' ? '예' : '아니오'}</span></li>
                                        <li><span className={styles.boldText}>질병</span> <span
                                            className={styles.diseaseText}>{pet.disease}</span></li>
                                    </ul>
                                    <div className={styles.editInfoButtonContainer}>
                                        <button className={styles.editInfoButton}
                                                onClick={() => handlePetModClick(pet.petId)}>정보 수정
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 반려동물 추가등록 버튼 */}
            <div className={styles.addPetButtonContainer}>
                <button className={styles.addPetButton} onClick={handlePetRegClick}>반려동물 추가등록</button>
            </div>
        </div>
    );
}

export default MyPage;
