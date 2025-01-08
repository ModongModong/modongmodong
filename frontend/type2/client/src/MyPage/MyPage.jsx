import React from 'react';
import styles from './MyPage.module.css';
import GobackIcon from "../assets/icons/goback_icon.jsx";
import MyPageIcon from "../assets/icons/mypage_icon.jsx"; // 유저이미지데이터 들어오면 삭제

function MyPage() {
    // 유저 정보와 반려동물 정보를 데이터로 처리
    const user = {
        name: '유저 이름',
        image: 'user-image-url',
    };

    const pets = [
        {
            name: '이름1',
            age: '1',
            gender: '남',
            neuteuring_yn: 'Y',
            animal_number: '34221324',
            type: '고양이',
            weight: '5.3'
        },
        {
            name: '이름2',
            age: '2',
            gender: '여',
            neuteuring_yn: 'N',
            animal_number: '45746745',
            type: '강아지',
            weight: '8.8'
        },
    ];

    return (
        <div className={styles.container}>
            {/* 뒤로가기 버튼 */}
            <div className={styles.backButtonContainer}>
                <GobackIcon className={styles.backButton}/>
            </div>

            {/* 유저 정보 */}
            <div className={styles.userInfoContainer}>
                <div className={styles.userContent}>
                    {/* 유저이미지 */}
                    <div className={styles.userImageContainer}>
                        <MyPageIcon className={styles.userImage} /> {/* 향후 유저이미지로 대체*/}
                    </div>

                    {/* 유저이름 */}
                    <div className={styles.userNameContainer}>
                        <div className={styles.userName}>{user.name}</div>
                    </div>
                </div>
            </div>
            <hr className={styles.divider}/>

            {/* 반려동물 정보 */}
            <div className={styles.petInfoSectionContainer}>
                <div className={styles.petInfoSection}>
                    <h2>반려동물 정보</h2>
                </div>
            </div>

            {/* 유저가 등록한 반려동물 목록 */}
            <div className={styles.petDetailsContainer}>
                {pets.map((pet, index) => (
                    <div className={styles.petContainer} key={index}>
                        <h3>{pet.name}</h3>
                        <div className={styles.petDetails}>

                            <div className={styles.leftColumn}>
                                <ul>
                                    <li><span className={styles.boldText}>나이</span> <span>{pet.age}세</span></li>
                                    <li><span className={styles.boldText}>성별</span> <span>{pet.gender}</span></li>
                                    <li><span className={styles.boldText}>등록번호</span> <span>{pet.animal_number}</span>
                                    </li>
                                    <li><span className={styles.boldText}>품종</span> <span>{pet.type}</span></li>
                                </ul>
                            </div>

                            <div className={styles.rightColumn}>
                                <ul>
                                    <li><span className={styles.boldText}>체중</span> <span>{pet.weight}kg</span></li>
                                    <li><span className={styles.boldText}>중성화 여부</span>
                                        <span>{pet.neuteuring_yn === 'Y' ? '예' : '아니오'}</span></li>
                                </ul>
                                <div className={styles.editInfoButtonContainer}>
                                    <button className={styles.editInfoButton}>정보 수정</button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>


            {/* 반려동물 추가등록 버튼 */}
            <div className={styles.addPetButtonContainer}>
                <button className={styles.addPetButton}>반려동물 추가등록</button>
            </div>
        </div>
    );
}

export default MyPage;
