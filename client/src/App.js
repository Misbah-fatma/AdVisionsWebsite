import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './i18n.js';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import DashBoard from "./pages/DashBoard/Dashboard.js";
import Settings from "./pages/Settings/Settings.js";
import Messages from "./pages/Messages/Messages.js";
import Grades from "./pages/Grades/Grades.js";
import CourseInfo from "./pages/CourseInfo/CourseInfo.js";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";
import Training from "./pages/Training/Training.js";
import Courses from "./pages/Courses/Courses.js";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard/TeacherDashboard.js";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard.js";
import StudentRoute from "./components/PrivateRoute/StudentRoute.js";
import TeacherRoute from "./components/PrivateRoute/TeacherRoute.js";
import AdminRoute from "./components/PrivateRoute/AdminRoute.js";
import AdminCourseInfo from "./pages/Admin/Course/AdminCourseInfo.js";
import StudentInfo from "./pages/Admin/Student/StudentInfo.js";
import TeacherInfo from "./pages/Admin/Teacher/TeacherInfo.js";
import AllCourses from "./pages/All-Courses/AllCourses.js";
import NotFound from "./pages/404NotFoud/NotFound.js";
import Libray from "./pages/Library/Libray.js";
import Ucam from "./pages/Ucam/Ucam.js";
import Home from "./pages/LandingPage/Land.js";
import Contact from "./pages/LandingPage/Contact.js";
import Services from "./pages/LandingPage/Services.js";
import About from "./pages/LandingPage/About.js";
import Courses1 from "./pages/LandingPage/Courses.js";
import Team from "./pages/LandingPage/Team.js";
import News from "./pages/LandingPage/News.js";
import Blog from "./pages/LandingPage/Blog.js"
import CourseInfoTable from "./pages/Admin/Course/AddCourse/CourseInfoTable/CourseInfoTable.js";
import AddtoCart from "./pages/AddToCart/AddtoCart.js"
import NoticeToggle from "./pages/CourseInfo/NoticeToggle/NoticeToggle.js";
import CheckOut from "./pages/AddToCart/Checkout.js"
import AdminFrontend from "./pages/Admin/Frontend/AdminFrontend.js"
import AdminCategory from "./pages/Admin/Subcategory/AdminFrontend.js"
import New1 from "./pages/LandingPage/New.js"
import { Products } from "./pages/LandingPage/Products.js";
import Profile from "./pages/LandingPage/Profile.js";

const Routing = () => {

  return (
    <Routes>
          <Route exact path="/"  element={<Home />}> 
      </Route>

      <Route path="/" element={<StudentRoute><Home /></StudentRoute>} />
        <Route path="/messages" element={<StudentRoute><Messages /></StudentRoute>} />
        <Route path="/dashboard" element={<StudentRoute><DashBoard /></StudentRoute>} />
        <Route path="/library" element={<StudentRoute><Libray /></StudentRoute>} />
        <Route path="/ucam" element={<StudentRoute><Ucam /></StudentRoute>} />

        <Route path="/teacher-dashboard" element={<TeacherDashboard /> } />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/admin/course-info" element={<AdminCourseInfo />} />
        <Route path="/admin/student-info" element={<StudentInfo />} />
        <Route path="/admin/teacher-info" element={<TeacherInfo />} />
        <Route path="/admin/frontend" element={<AdminFrontend />} />
        <Route path="/admin/categories" element={<AdminCategory />} />

      <Route exact path="/CourseInfoTable"  element={<CourseInfoTable />}>
     
      </Route>
      <Route exact path="/training"  element={<Training />}>
      
      </Route>
      <Route exact path="/courses"  element={<Courses />}>
  
      </Route>

      <Route exact path="/settings" element={<Settings />}>
     
      </Route>
      <Route exact path="/checkout" element={<CheckOut />}>
    
      </Route>
      <Route exact path="/grades"  element={<Grades />}>
       
      </Route>
      <Route exact path="/new"  element={<New1 />}>
       
       </Route>
      <Route exact path="/cart"  element={<AddtoCart />}>
        
          </Route>
          <Route exact path="/product"  element={<Products />}>
        
        </Route>
          <Route exact path="/NoticeToggle"  element={<NoticeToggle />}>
     
      </Route>
      <Route exact path="/CourseInfo"  element={<CourseInfo />}>
      
      </Route>
         
      <Route exact path="/login" element={<Login />}>
        
      </Route>
      <Route exact path="/register"  element={<Register />}>
       
      </Route>
      <Route exact path="/all-courses"  element={<AllCourses />}>
       
      </Route>

      <Route exact path="/home" element={<Home />}>
       
      </Route>
      <Route exact path="/team"  element={<Team />}>
     
        </Route>
        <Route exact path="/profile"  element={<Profile />}>
     
        </Route>

        <Route exact path="/About"element={<About />} ></Route>
        <Route exact path="/Services" element={<Services />}>  </Route>
        <Route exact path="/News" element={<News />}></Route>
        <Route exact path="/Courses1" element={<Courses1 />}> </Route> 
        <Route exact path="/Contact" element={<Contact />}> </Route>
        <Route exact path="/blog" element={<Blog />}> </Route>
      <Route  path="*" element={<NotFound />}>
        
      </Route>
  
       
      
    </Routes>
  );
};

function App() {

  return (
    <div className="App">
      
      <Router>
      {/* <Header /> */}

        <Routing />
      </Router>
    </div>
  );
}

export default App;
