import { useEffect, useState } from 'react';
import styles from './NsRecommendation.module.css';
import GobackIcon from "../../assets/Icons/goback_icon.jsx";
import {useNavigate} from "react-router-dom";

function NsRecommendation() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [nutritionalSupplementData, setNutritionalSupplementData] = useState([]);

    // 뒤로가기 동작
    const goBack = () => {
        navigate(-1);
    };

    // 유저 정보 불러오기
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

    // 유저 정보가 로드되었을 때 영양제 데이터 불러오기
    useEffect(() => {
        const fetchNutritionalSupplements = async () => {
            if (user) {
                try {
                    console.log("userid", user.id);
                    const response = await fetch(`http://localhost:8080/api/ns/recommend/${user.id}`, {
                        method: "GET",
                        credentials: "include",
                    });
                    const data = await response.json();

                    setNutritionalSupplementData(data || []);
                } catch (error) {
                    console.error("영양제 데이터 로딩 중 오류 발생:", error);
                }
            }
        };

        fetchNutritionalSupplements();
    }, [user]); // user 상태 변경 시마다 실행

    return (
        <div className={styles.container}>
            {/* 헤더 */}
            <div className={styles.headerContainer}>
                {/* 뒤로가기 버튼 */}
                <div className={styles.backButtonContainer} onClick={goBack}>
                    <GobackIcon className={styles.backButton} />
                </div>

                {/* 영양제 추천 제목 */}
                <div className={styles.title}>
                    영양제 추천
                </div>
            </div>

            {/* 영양제 목록 */}
            <div className={styles.supplementList}>
                {nutritionalSupplementData.length > 0 ? (
                    nutritionalSupplementData.map((item, index) => (
                        <div key={index} className={styles.supplementItem}>
                            {/* 이미지 */}
                            <div className={styles.imageContainer}>
                                <div className={styles.supplementImage}>{/* 추후 이미지로 대체 */}</div>
                            </div>

                            {/* 이름, 가격, 설명 */}
                            <div className={styles.detailsContainer}>
                                <div className={styles.supplementName}>{item.nsName}</div>
                                <div className={styles.supplementPrice}>{item.nsPrice}원</div>
                                <div className={styles.supplementDescription}>{item.nsEx}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div >추천 영양제가 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default NsRecommendation;
