import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, []); // Empty dependency array to run only once on component mount


  const state = useSelector(state => state.cart);
  console.log(state)
  const user = useSelector(state => state.auth)
  console.log(user)
  const history = useNavigate();
  const dispatch = useDispatch();


  
  const [userData, setUserData] = useState(null);

  useEffect(() => {
      const userDataFromStorage = localStorage.getItem('user');
      console.log('Retrieved from storage:', userDataFromStorage); // This will show exactly what is being retrieved
  
      if (userDataFromStorage) {
          try {
              const parsedData = JSON.parse(userDataFromStorage);
              setUserData(parsedData);
          } catch (error) {
              console.error('Failed to parse user data:', error); // This will log parsing errors, if any
          }
      }
  }, []);
  
  


const handleLogout = () => {
  // Dispatch logout action
  localStorage.clear("user");
  localStorage.clear("auth_token");
  dispatch({ type: "CLEAR__USER" });
 history("/login")
};
  return (
    <>

      {/* <!-- Navbar Start --> */}
      <div className="container-fluid sticky-top bg-primary">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark p-0">
            <Link to="/" className="navbar-brand">
              <h1 className="text-white">
                <span className="text-dark">AD</span>VISIONS
              </h1>
            </Link>
            <button
              type="button"
              className="navbar-toggler ms-auto me-0"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto">
                <Link to="/" className="nav-item nav-link active">
                  Home
                </Link>
                <Link to="/about" className="nav-item nav-link">
                  About
                </Link>
                <Link to="/Services" className="nav-item nav-link">
                  Services
                </Link>
                <div className="nav-item dropdown">
                  <a
                    href="*#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Our Work
                  </a>
                  <div className="dropdown-menu bg-light mt-2">
                    <Link to="/blog" className="dropdown-item">
                      Blog
                    </Link>
                    <Link to="/product" className="dropdown-item">
                      Products
                    </Link>
                    <Link to="/new" className="dropdown-item">
                      New
                    </Link>
                    {/* <Link to="/features" className="dropdown-item">
                      Features
                    </Link> */}
                    <Link to="/team" className="dropdown-item">
                      Our Team
                    </Link>
                    {/* <Link to="/faq" className="dropdown-item">
                      FAQs
                    </Link> */}
                    {/* <Link to="/testimonial" className="dropdown-item">
                      Testimonial
                    </Link> */}
                  </div>
                </div>
                {/* <Link to="/admin" className="nav-item nav-link">Admin</Link> */}
                <Link to="/contact" className="nav-item nav-link">
                  Contact
                </Link>
              </div>
              <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                {
                  userData ?
                    <div className="nav-item dropdown">
                      <a href="/" className="nav-link dropdown-toggle text-dark" data-toggle="dropdown">{userData.userName} <i className="fa fa-user-cirle-o mt-1" aria-hidden="true"></i></a>
                      <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                        <Link to="/profile2" className="dropdown-item">Profile</Link>
                        <Link to="/cart" className="dropdown-item">Cart</Link>
                        <button className="dropdown-item"  onClick={handleLogout}>Logout</button>
                      </div>
                    </div> :
                    <Link to="/login" className="nav-item nav-link">Login</Link>
                }
              </div>
              <button
                type="button"
                className="btn text-white p-0 d-none d-lg-block"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </nav>
        </div>
      </div>
      {/* <!-- Navbar End --> */}
    </>
  );
}
