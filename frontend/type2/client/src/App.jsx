import './App.css';
import Login from "./login/jsx/login.jsx";
import Signup from "./login/jsx/signup.jsx";
import Navigation from "./common/Navigation/Navigation.jsx";
import Home from "./page/Home/Home.jsx";
import AddPost from "./page/Home/Add_post.jsx";
import PostDetail from "./page/Home/PostDetail.jsx";
import SearchPharmacy from "./page/Search/Search_pharmacy.jsx";
import NsRecommendation from "./NsRecommendation/NsRecommendation.jsx";
import MyPage from "./MyPage/MyPage.jsx";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
       <>
           <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/search" element={<SearchPharmacy/>} />
               <Route path="/mypage" element={<MyPage />} />
               <Route path="/recommend" element={<NsRecommendation />} />
               <Route path="/" element={<Home/>} />
               <Route path="/post" element={<AddPost/>} />
               <Route path="/post/:postId" element={<PostDetail/>} />
           </Routes>
           <Navigation/>
       </>
    );
}

export default App;
