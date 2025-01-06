import React, { useState } from 'react';
import './PetRegisteration.css';

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
        const { name, value } = e.target;
        setPetData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 폼제출
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Pet Data Submitted:', petData);
        // Here you can call an API to save the pet data
    };

    return (
        <div className="container">
            <button className="arrow-back" onClick={() => window.history.back()}>
                &#8592;
            </button>
            <form onSubmit={handleSubmit}>
                <label>
                    반려동물 이름
                    <br/>
                    <input
                        type="text"
                        name="name"
                        value={petData.name}
                        onChange={handleChange}
                        required
                    />
                    <br/>
                </label>
                <label>
                    나이
                    <br/>
                    <input
                        type="number"
                        name="age"
                        value={petData.age}
                        onChange={handleChange}
                        required
                    />
                    <br/>
                </label>
                <div className="radio-group">
                    <label>
                        성별
                        <div className="radio-container">
                        <input
                            type="radio"
                            name="gender"
                            value="M"
                            onChange={handleChange}
                            required
                        /> 남
                        <input
                            type="radio"
                            name="gender"
                            value="F"
                            onChange={handleChange}
                            required
                        /> 여
                        </div>
                    </label>
                    <label>
                        중성화여부
                        <div className="radio-container">
                            <input
                                type="radio"
                                name="neuteuring_yn"
                                value="Y"
                                onChange={handleChange}
                                required
                            /> 예
                            <input
                                type="radio"
                                name="neuteuring_yn"
                                value="N"
                                onChange={handleChange}
                                required
                            /> 아니오
                        </div>
                    </label>
                </div>
                <label>
                    등록번호
                    <br/>
                    <input
                        type="number"
                        name="animal_number"
                        value={petData.animal_number}
                        onChange={handleChange}
                        required
                    />
                    <br/>
                </label>
                <label>
                    품종
                    <br/>
                    <input
                        type="text"
                        name="type"
                        value={petData.type}
                        onChange={handleChange}
                        required
                    />
                    <br/>
                </label>
                <label>
                    체중
                    <br/>
                    <input
                        type="number"
                        name="weight"
                        value={petData.weight}
                        onChange={handleChange}
                        required
                    />
                    <br/>
                </label>
                <label>
                    수술이력
                    <br/>
                    <input
                        type="text"
                        name="surgery"
                        value={petData.surgery}
                        onChange={handleChange}
                        required
                    />
                    <br/>
                </label>
                <label>
                    질병
                    <br/>
                    <input
                        type="text"
                        name="disease"
                        value={petData.disease}
                        onChange={handleChange}
                        required
                    />
                    <br/>
                </label>
                <div className="button-container">
                    <button type="submit">반려동물 등록 완료</button>
                </div>
            </form>
        </div>
    );
}

export default PetRegistrationForm;