import React from 'react';
import { getUserData } from '../../store/selector';
import { useSelector } from 'react-redux';
import { HOME_PAGE } from '../routes';

const PencilImg = () => {
    return (
        <span>
            <img className='pencilImg' src="https://m.media-amazon.com/images/G/01/Beerus-MY/pencil.png" />
        </span>
    )
}

const ProfilePage = () => {
    const userData = useSelector(getUserData)
    return (
        <div className="profilePage">
            <div className="profileTitle" >Manage your Profiles</div>
            <div className="boxCont" >
                <div className="userCont" >
                    <div className="userName" >{userData.name} <PencilImg /></div>
                    <div className="ggxq" >Account Holder</div>
                </div>
                <div className="box" >
                    <div className="line1" >Contact Detail</div>
                    <div className="line2" >Receive important alerts for your profile</div>
                    <div className="line3"><span>Mobile number</span> <PencilImg /></div>
                    <div className="line4">Not set</div>
                </div>
                <div className="box" >
                    <div className="line1" >Settings</div>
                    <div className="line2" >Some Amazon programs require a PIN for additional security.</div>
                    <div className="line3"><span>PIN</span> <PencilImg /></div>
                    <div className="line4">Not set</div>
                </div>
                    <button className="logOutBtn" onClick={() => {
                        window.location.replace(HOME_PAGE)
                        localStorage.removeItem("Token")
                    }} >Sign Out</button>
            </div>
        </div>
    );
};

export default ProfilePage;