import styles from "./Keyword_btn.module.css";

const KeywordBtn = ({keyword, activeKeywordId,searchPlaces}) => {
    return (
        <button
            className={`${styles.keyword_btn} ${activeKeywordId === keyword.id ? styles.active : ""}`}
            onClick={() => searchPlaces(keyword.value, keyword.id)}>
            {keyword.value} {keyword.emoji}
        </button>
    )
}

export default KeywordBtn;