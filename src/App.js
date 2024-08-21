import { BrowserRouter,Route,Routes } from "react-router-dom";
import { useState } from "react";



import LoginPanel from "./Pages/Header/LoginPanel"
import Navbar from "./Pages/Header/Navbar";
import HomeLayout from "./Layout/HomeLayout";
import AdminLayout from "./Layout/AdminLayout";
import Home from "./Pages/Home/Home";
import NgosList from "./Pages/NgosList/NgosList";
import Food from "./Pages/Food/Food";
import DetailPage from "./Pages/DetailPage/DetailPage";
import RForm from "./Pages/Ngo Form/RForm";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Feedback from "./Pages/Feedback/Feedback";
import PopupButton from "./Pages/pop-up Form/popForm";
import LoginNgo from "./Pages/Login Ngo/LoginNgo";
import HomeNgo from "./Pages/NGOportal/HomePage/HomeNgo";
import PolicyPage from "./Pages/Website Policy/WebsitePolicy";
import HelpPage from "./Pages/Help/Help";
import SiteMap from "./Pages/Site-Map/SiteMap";
import Category from "./Pages/Category/Category";
import EditNgo from "./Pages/NGOportal/EditNgo/EditNgo";
import ChangePassword from "./Pages/NGOportal/ChangePassword/ChangePassword";

import ProtectedRoute from "./ProtectedRoute/protectedRoute";

function App(){
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
   
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeLayout/>}>
                    <Route index element={<Home handleCategoryClick={handleCategoryClick}/>}></Route>
                    <Route path="/:category" element={<NgosList/>}></Route>
                    {/* <Route path="/:category" element={<Category/>}></Route> */}
                    <Route path="/:category/city/:city" element={<Category/>}></Route>
                    <Route path="/:category/detailpage/:id" element={<DetailPage/>}></Route>
                    <Route path="/:category/city/:city/detailpage/:id" element={<DetailPage/>}></Route>

                    
                    <Route path="/rform" element={<RForm/>}></Route>
                    <Route path="/loginNgo" element={<LoginNgo/>}></Route>
                    <Route path="/about" element={<About/>}></Route>
                    <Route path="/contact" element={<Contact/>}></Route>
                    <Route path="/feedback" element={<Feedback/>}></Route>
                    <Route path="/websitePolicy" element={<PolicyPage/>}></Route>
                    <Route path="/help" element={<HelpPage/>}></Route>
                    <Route path="/sitemap" element={<SiteMap/>}></Route>
                    <Route path="/pop" element={<PopupButton/>}></Route>
                    
                </Route>
                <Route path="/ngopage" element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
                    <Route index element={<HomeNgo/>}></Route>
                    <Route path="editNgo" element={<EditNgo/>}></Route>
                    <Route path="changePassword" element={<ChangePassword/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>        
    </>
    )
}
export default App;