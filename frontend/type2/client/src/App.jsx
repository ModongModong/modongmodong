import './App.css';
import Login from "./page/Login/jsx/Login.jsx";
import Signup from "./page/Login/jsx/Signup.jsx";
import Navigation from "./common/Navigation/Navigation.jsx";
import Home from "./page/Home/Home.jsx";
import AddPost from "./page/Home/AddPost.jsx";
import PostDetail from "./page/Home/PostDetail.jsx";
import SearchPharmacy from "./page/Search/SearchPharmacy.jsx";
import NsRecommendation from "./page/NsRecommendation/NsRecommendation.jsx";
import MyPage from "./page/MyPage/MyPage.jsx";
import {Route, Routes} from "react-router-dom";
import UpdatePost from "./page/Home/UpdatePost.jsx";
import PetRegistrationForm from "./page/PetRegister/PetRegistrationForm.jsx";
import PetModificationForm from "./page/PetRegister/PetModificationForm.jsx";

function App() {
    return (
       <>
           <div>
               <Routes>
                   {/*<Route path="/" element={<Login />} />*/}
                   <Route path="/login" element={<Login />} />
                   <Route path="/signup" element={<Signup />} />
                   <Route path="/search" element={<SearchPharmacy/>} />
                   <Route path="/mypage" element={<MyPage />} />
                   <Route path="/petregister" element={<PetRegistrationForm/>}/>
                   <Route path="/petmodify/:petId" element={<PetModificationForm/>}/>
                   <Route path="/recommend/:userPk" element={<NsRecommendation />} />
                   <Route path="/" element={<Home/>} />
                   <Route path="/post" element={<AddPost/>} />
                   <Route path="/post/update/:postId" element={<UpdatePost/>} />
                   <Route path="/post/:postId" element={<PostDetail/>} />
               </Routes>
           </div>
           <Navigation/>
       </>
    );
}

export default App;
