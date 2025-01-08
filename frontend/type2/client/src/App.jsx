import './App.css';
import Navigation from "./common/Navigation/Navigation.jsx";
import Home from "./page/Home/Home.jsx";
import AddPost from "./page/Home/Add_post.jsx";
import PostDetail from "./page/Home/PostDetail.jsx";
import SearchPharmacy from "./page/Search/Search_pharmacy.jsx";

function App() {
    return (
       <>
           {/*<PostDetail/>*/}
           {/*<AddPost/>*/}
           <Home/>
           {/*<SearchPharmacy/>*/}
           <Navigation/>
       </>
    );
}

export default App;
