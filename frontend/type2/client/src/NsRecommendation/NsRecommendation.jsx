import React from 'react';
import styles from './NsRecommendation.module.css';
import GobackIcon from "../assets/icons/goback_icon.jsx";

function NsRecommendation() {
    // 뒤로가기 동작
    const handleGoBack = () => {
        window.history.back();
    };

    // 영양제 데이터
    const nutritional_supplement = [
        {
            na_name: '영양제1',
            na_price: '15000',
            na_ex: '영양제 1 설명',
            ns_image: '',
        },
        {
            na_name: '영양제2',
            na_price: '20000',
            na_ex: '영양제 2 설명',
            ns_image: '',
        },
    ];

    return (
        <div className={styles.container}>
            {/* 뒤로가기 버튼 */}
            <div className={styles.backButtonContainer}>
                <GobackIcon className={styles.backButton}  onClick={handleGoBack}/>
            </div>

            <div className={styles.title}>
                <h1>영양제 추천</h1>
            </div>

            {/* 영양제 목록 */}
            <div className={styles.supplementList}>
                {nutritional_supplement.map((item, index) => (
                    <div key={index} className={styles.supplementItem}>
                        {/* 이미지 */}
                        <div className={styles.imageContainer}>
                            <div className={styles.supplementImage}>{/* 추후 이미지로 대체 */}</div>
                        </div>

                        {/* 이름, 가격, 설명 */}
                        <div className={styles.detailsContainer}>
                            <div className={styles.supplementName}>{item.na_name}</div>
                            <div className={styles.supplementPrice}>{item.na_price}원</div>
                            <div className={styles.supplementDescription}>{item.na_ex}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NsRecommendation;