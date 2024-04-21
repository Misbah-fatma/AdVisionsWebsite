import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import News from './News';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
    var [frontends, setFrontends] = useState([])
    return (
        <>
        <Navbar/>
   {
                frontends.map((item, index) => {
                    console.log(item.des);
                    return <div key={index} className="container-fluid pt-5 bg-primary hero-header  mb-5" style={{ background: `url(/assets/img/${item.pic})`, backgroundSize: "cover" }}>
                        <div className="container pt-5">
                            <div className="row g-5 pt-5">
                                <div className="col-lg-6 align-self-center text-center text-lg-start mb-lg-5">
                                    <div className="btn btn-sm border rounded-pill text-white px-3 mb-3 animated slideInRight">AI.Tech</div>
                                    <h1 className="display-4 text-white mb-4 animated slideInRight">{item.des}</h1>
                                    <p className="text-white mb-4 animated slideInRight">Enhance Your Vision, Transform Your Life</p>
                                    {/* <a href="*" className="btn btn-light py-sm-3 px-sm-5 rounded-pill me-3 animated slideInRight">Read More</a> */}
                                    <a href="*" className="btn btn-outline-light py-sm-3 px-sm-5 rounded-pill animated slideInRight">Contact Us</a>
                                </div>
                                <div className="col-lg-6 align-self-end text-center text-lg-end">
                                    <img className="img-fluid" src="assets/img/hero-img.png" alt="*" />
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }


            <div className="modal fade" id="searchModal" tabIndex="-1">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content" style={{ background: "rgba(20, 24, 62, 0.7)" }}>
                        <div className="modal-header border-0">
                            <button type="button" className="btn btn-square bg-white btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex align-items-center justify-content-center">
                            <div className="input-group" style={{ maxWidth: "600px" }}>
                                <input type="text" className="form-control bg-transparent border-light p-3"
                                    placeholder="Type search keyword" />
                                <button className="btn btn-light px-4"><i className="bi bi-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Full Screen Search End --> */}


            {/* <!-- About Start --> */}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                            <div className="about-img">
                                <img className="img-fluid" src="assets/img/about-img.jpg" alt='*' />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <div className="btn btn-sm border rounded-pill text-primary px-3 mb-3">About Us</div>
                            <h1 className="mb-4">Leading tech firm pioneering innovative solutions in diverse domains.</h1>
                            <p className="mb-4">At Advisions R&D, we are a leading tech and research company dedicated to providing innovative services and solutions in various domains.</p>
                            <p className="mb-4">We specialize in.</p>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <ul>
                                        <li>Generative AI Development</li>
                                        <li>Tailored ChatGPT Development & Integration</li>
                                        <li>Advanced Large Language Models (LLMs) Development</li>
                                        <li>Custom Web Application Development</li>
                                        <li>Innovative Mobile App Development</li>
                                    </ul>
                                </div>
                                <div className="col-sm-6">
                                    <ul>
                                        <li>Secure Enterprise Software Development</li>
                                        <li>MVP Development & Strategic Consulting</li>
                                        <li>School Management Software</li>
                                        <li>STEM Programs & ATL Lab Setup</li>
                                        <li>Corporate Trainings</li>
                                        <li>Robotics Process Automation</li>
                                        <li>Digital Twins</li>
                                    </ul>
                                </div>
                                <div className="col-sm-6">
                                    <h6 className="mb-3"><i className="fa fa-check text-primary me-2"></i>Data Security</h6>
                                    <h6 className="mb-0"><i className="fa fa-check text-primary me-2"></i>Professional Developers</h6>
                                </div>
                                <div className="col-sm-6">
                                    <h6 className="mb-3"><i className="fa fa-check text-primary me-2"></i>24/7 Support</h6>
                                    <h6 className="mb-0"><i className="fa fa-check text-primary me-2"></i>Fair Prices</h6>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-4">
                                {/* <a className="btn btn-primary rounded-pill px-4 me-3" href="*">Read More</a> */}
                                <a className="btn btn-outline-primary btn-square me-3" href="mailto:advisions.ard@gmail.com" target="_blank" rel="noreferrer">
                                    <i className="fab fa-google"></i></a>
                                <a className="btn btn-outline-primary btn-square me-3" href="*"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-primary btn-square me-3" href="*"><i className="fab fa-instagram"></i></a>
                                <a className="btn btn-outline-primary btn-square" href="*"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- About End --> */}


            {/* <!-- Feature Start --> */}
            <div className="container-fluid bg-primary feature pt-5">
                <div className="container pt-5">
                    <div className="row g-5">
                        <div className="col-lg-6 align-self-center mb-md-5 pb-md-5 wow fadeIn" data-wow-delay="0.3s">
                            <div className="btn btn-sm border rounded-pill text-white px-3 mb-3">Why Choose Us</div>
                            <h1 className="text-white mb-4">We're Best in AI Industry with 5 Years of Experience</h1>
                            <p className="text-light mb-4">Choose us for AI tech and software: Expertise, innovation, proven track record, scalable solutions, customer-centric approach, robust support, cost-effectiveness, security, collaborative partnership.
                            </p>
                            <div className="d-flex align-items-center text-white mb-3">
                                <div className="btn-sm-square bg-white text-primary rounded-circle me-3">
                                    <i className="fa fa-check"></i>
                                </div>
                                <span>We boast a team of industry-leading professionals</span>
                            </div>
                            <div className="d-flex align-items-center text-white mb-3">
                                <div className="btn-sm-square bg-white text-primary rounded-circle me-3">
                                    <i className="fa fa-check"></i>
                                </div>
                                <span>Timely, precise solutions delivered comprehensively with efficacy</span>
                            </div>
                            <div className="d-flex align-items-center text-white mb-3">
                                <div className="btn-sm-square bg-white text-primary rounded-circle me-3">
                                    <i className="fa fa-check"></i>
                                </div>
                                <span>Innovative product development with maintenance and updates</span>
                            </div>
                            <div className="row g-4 pt-3">
                                <div className="col-sm-6">
                                    <div className="d-flex rounded p-3" style={{ background: "rgba(256, 256, 256, 0.1)" }}>
                                        <i className="fa fa-users fa-3x text-white"></i>
                                        <div className="ms-3">
                                            <h2 className="text-white mb-0" data-toggle="counter-up">73</h2>
                                            <p className="text-white mb-0">Happy Clients</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex rounded p-3" style={{ background: "rgba(256, 256, 256, 0.1)" }}>
                                        <i className="fa fa-check fa-3x text-white"></i>
                                        <div className="ms-3">
                                            <h2 className="text-white mb-0" data-toggle="counter-up">28</h2>
                                            <p className="text-white mb-0">Project Complete</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 align-self-end text-center text-md-end wow fadeIn" data-wow-delay="0.5s">
                            <img className="img-fluid" src="assets/img/feature.png" alt="*" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Feature End --> */}

            {/* <!-- Service Start --> */}
            <div className="container-fluid bg-light mt-5 py-5">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
                            <div className="btn btn-sm border rounded-pill text-primary px-3 mb-3">Our Services</div>
                            <h1 className="mb-4">Our Innovative Solutions for Your Business</h1>
                            <p className="mb-4">Elevate your business with personalized solutions crafted to precisely align with your requirements, maximizing your potential for success.</p>
                            {/* <a className="btn btn-primary rounded-pill px-4" href="*">Read More</a> */}
                        </div>
                        <div className="col-lg-7">
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="row g-4">
                                        <div className="col-12 wow fadeIn" data-wow-delay="0.1s">
                                            <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                                <div className="service-icon btn-square">
                                                    <i className="fa fa-brain fa-2x"></i>
                                                </div>
                                                <h5 className="mb-3">Advanced Generative AI Development</h5>
                                                <p>Train your dataset to generate original outputs such as images, text, or music using state-of-the-art generative AI techniques.</p>
                                                {/* <a className="btn px-3 mt-auto mx-auto" href="*">Read More</a> */}
                                            </div>
                                        </div>
                                        <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                                            <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                                <div className="service-icon btn-square">
                                                    <i className="fa fa-graduation-cap fa-2x"></i>
                                                </div>
                                                <h5 className="mb-3">Corporate Trainings</h5>
                                                <p>Boost team expertise with customized Corporate Training Solutions for colleges and startups. Enhance learning, drive innovation, and thrive in today's competitive industry.</p>
                                                {/* <a className="btn px-3 mt-auto mx-auto" href="*">Read More</a> */}
                                            </div>
                                        </div>
                                        <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                                            <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                                <div className="service-icon btn-square">
                                                    <i className="fa fa-code fa-2x"></i>
                                                </div>
                                                <h5 className="mb-3">Robotics Process Automation</h5>
                                                <p>Enhance business efficiency with RPA, employing software robots to automate repetitive tasks, streamlining processes with advanced automation technology for increased productivity.</p>
                                                {/* <a className="btn px-3 mt-auto mx-auto" href="*">Read More</a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 pt-md-4">
                                    <div className="row g-4">
                                        <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                                            <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                                <div className="service-icon btn-square">
                                                    <i className="fa fa-code fa-2x"></i>
                                                </div>
                                                <h5 className="mb-3">Custom Web Application Development</h5>
                                                <p>Leverage our tailor-made services to address your specific industry needs, cater to your target audience, and enhance operational efficiency.</p>
                                                {/* <a className="btn px-3 mt-auto mx-auto" href="*">Read More</a> */}
                                            </div>
                                        </div>
                                        <div className="col-12 wow fadeIn" data-wow-delay="0.7s">
                                            <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                                <div className="service-icon btn-square">
                                                    <i className="fa fa-brain fa-2x"></i>
                                                </div>
                                                <h5 className="mb-3">STEM Programs & ATL Lab Setup</h5>
                                                <p>Transform education with Revolutionizing Education, featuring STEM Programs and AI-Robotics Labs, empowering students for future tech challenges.</p>
                                                {/* <a className="btn px-3 mt-auto mx-auto" href="*">Read More</a> */}
                                            </div>
                                        </div>
                                        
                                        <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                                            <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                                <div className="service-icon btn-square">
                                                    <i className="fa fa-code fa-2x"></i>
                                                </div>
                                                <h5 className="mb-3">Digital Twins</h5>
                                                <p>Utilize digital twin technology to create virtual models of assets and processes, facilitating real-time monitoring and simulation for operational optimization, reduced downtime, and innovation.</p>
                                                {/* <a className="btn px-3 mt-auto mx-auto" href="*">Read More</a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <News/>
           <Footer/>
            
        </>
    )
}

export default Home
