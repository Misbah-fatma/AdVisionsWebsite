import React from "react";
import Styles from "./SidebarAdmin.module.css";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

const SidebarAdmin = () => {
  return (
    <div className={Styles.sidebarAdmin}>
      <Sidebar title="Dashboard" link="/admin-dashboard" Icon={DashboardIcon} />
      <Sidebar
        title="Course"
        link="/admin/course-info"
        Icon={LocalLibraryIcon}
      />
      <Sidebar
        title="Student"
        link="/admin/student-info"
        Icon={GroupIcon}
      />
      <Sidebar
        title="Teacher"
        link="/admin/teacher-info"
        Icon={PersonIcon}
      />
            <Sidebar 
      title="Frontend" 
      link="/admin/frontend" 
      Icon={PersonIcon}
       />
             <Sidebar 
      title="Categories" 
      link="/admin/categories" 
      Icon={PersonIcon}
       />
      <Sidebar 
      title="Logout" 
      link="/admin/logout" 
      Icon={ExitToAppIcon}
       />
    </div>
  );
};

export default SidebarAdmin;
