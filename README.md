# 9사일생조

## 프로젝트 개요
- **프로젝트명**: 모두의 동물 정보 (모동모동)
- **기획 의도**: 야간 동물병원 및 약국 정보 제공, 사료 및 영양제 추천 서비스

## 주요 기능
- 자유게시판 (게시판과 댓글)
- 실시간 병원 운영 여부 확인
- 야간 동물약국 정보 제공
- 반려동물에 맞춘 사료 및 영양제 추천

## 기술 스택
- **Frontend**: React, Axios
- **Backend**: Java, Spring Boot
- **Database**: MySQL
- **Version Control**: Git, GitHub

## 프로젝트 구조
    - npx create-vite@latest
        - Project name: client
        - Select a framework: › React 선택
        - Select a variant: › JavaScript 선택
    - cd client
    - npm install
    - vite.config.js 오픈
        - 다음 내용 추가
            ```
                ,
                build: {
                    outDir: '../../../backend/server/src/main/resources/static',  // 빌드 결과물이 생성될 위치, 상대경로로 서버 위치 저장
                },

            ```
        - 저장
    - npm run build 
        - ~/backend/server/src/main/resources/static/*.* : 리소스들이 위치됨
        - ~/backend/server/src/main/resources/static/index.html -> ~/backend/server/src/main/resources/templates/index.html 이동(매번 처리)
    - 백엔드 서버 가동 하여 확인



## 개발 환경 구축
### 1. 데이터베이스를 백엔드의 entity 파일에 맞게 생성
### 2. 다음 SQL문을 데이터베이스에서 실행한다.
```sql
USE modongmodong;

-- 품종 목록 추가
INSERT INTO pet_type (type_pk, pet_type_name)
VALUES
(1, '개'),
(2, '고양이');

-- 질병 목록 추가
INSERT INTO disease (disease_pk, pet_disease__name)
VALUES
(1, '피부 질환'),
(2, '관절염'),
(3, '소화 문제'),
(4, '안구 질환'),
(5, '심장 질환');

-- 영양제 목록 추가
INSERT INTO Nutritional_Supplement (disease_pk, type_name, ns_name, ns_price, ns_ex)
VALUES
(1, 1, '닥터바이 강아지 오메가3', 60000, '강아지를 위한 오메가-3는 피부 건강과 염증 완화에 도움을 주는 필수 지방산입니다. EPA와 DHA가 포함되어 피부 건강 증진과 털 윤기 증대에 효과적입니다.'),
(1, 2, '마싯츄 리포좀 고양이 오메가3', 32000, '고양이를 위한 오메가-3는 피부 건강과 면역력 강화에 도움이 되는 지방산입니다. EPA와 DHA가 포함되어 피부 염증 완화, 건조 예방, 털 윤기 증진에 효과적입니다.'),
(2, 1, '닥터바이 조인트 강아지 관절 영양제', 24900, '강아지 관절 영양제는 보스웰리아와 글루코사민을 포함하여 관절 염증 완화와 통증 감소에 효과적입니다. 운동 범위 개선과 관절 기능 유지를 돕습니다.'),
(2, 2, '본아페티 조인트캡스포캣 고양이 관절 영양제', 23900, '고양이 관절 영양제는 N-아세틸 글루코사민을 포함해 관절 건강을 지원하고 연골 재생과 염증 완화에 효과적입니다. 관절 통증을 줄이고 운동 범위를 개선합니다.'),
(3, 1, '닥터바이 엔자임 강아지 소화 효소 소화불량 췌장영양제', 28900, '아밀라이제, 리파이제, 프로테아제를 포함한 소화 영양제는 강아지 소화 기능을 개선하고, 소화 불량이나 장 문제를 예방합니다. 탄수화물, 지방, 단백질 분해를 돕습니다.'),
(3, 2, '본아페티 헤어볼캡스 고양이 헤어볼 구토 영양제', 23900, '본아페티 헤어볼캡스는 키토산과 콜라겐을 포함하여 고양이 소화 건강을 개선하고 헤어볼 문제를 완화하는 영양제입니다. 헤어볼 배출을 촉진하고 소화관 보호에 도움을 줍니다.'),
(4, 1, '아이즈 강아지 눈 영양제', 35000, '루테인과 비타민 A가 포함된 강아지 눈 영양제는 망막 건강을 보호하고, 시력 저하를 예방합니다. 루테인은 눈의 노화 방지와 빛에 대한 민감도 개선에 효과적입니다.'),
(4, 2, '아이즈 고양이 눈 영양제', 35000, '루테인과 비타민 A가 포함된 고양이 눈 영양제는 망막 건강을 보호하고 시력 저하를 예방합니다. 루테인은 눈의 노화 방지와 빛에 대한 민감도 개선에 효과적입니다.'),
(5, 1, '댕이수랏간 침향 심장튼튼', 99000, 'L-카르니틴과 코엔자임 Q10이 포함된 강아지 심장 영양제는 심장 기능 개선과 혈액 순환 촉진에 도움을 줍니다. L-카르니틴은 에너지 생성을 돕고, 코엔자임 Q10은 심장 건강을 유지합니다.'),
(5, 2, '헤파카디오 Q10', 18900, 'L-카르니틴과 비타민 E가 포함된 고양이 심장 영양제는 심장 기능 강화와 심혈관 건강을 유지하는 데 도움을 줍니다. L-카르니틴은 에너지 생성을 돕고, 비타민 E는 항산화 작용을 합니다.');