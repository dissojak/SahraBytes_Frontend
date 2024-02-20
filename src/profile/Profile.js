import React, { useContext, useState } from "react";
import "./style_profile.css";
import "./Popup_Profile.css";

import ImageUpload from "../shared/components/FormElements/ImageUpload";
import { AuthContext } from "../shared/context/auth-context";
import PopupPw from "./PopupPw";
import PopupUsername from "./PopupUsername";
import PopupEmail from "./PopupEmail";

const Profile = () => {
  const auth = useContext(AuthContext);

  const [showChangePw,setShowChangePw]=useState(false);
  const [showChangeUsername,setShowChangeUsername]=useState(false);
  const [showChangeEmail,setShowChangeEmail]=useState(false);

  const showChangePwHandler = () => {
    setShowChangePw((prevMode) => !prevMode);
  };
  const showChangeUsernameHandler = () => {
    setShowChangeUsername((prevMode) => !prevMode);
  };
  const showChangeEmailHandler = () => {
    setShowChangeEmail((prevMode) => !prevMode);
  };

  const changeUsernameHandler = (username) => {
    auth.updateUsername(username);
  };

  return (
    <div id="bg">
      <div id="sahara">s a h a r a</div>
      <div className="container">
        <div id="member">
          <ImageUpload/>
          <div className="user-info">
            <h1 className="name_member">{auth.userName}</h1>
            <h3 className="word_member">member</h3>
          </div>
        </div>
        <div id="divs3">
          <button className="btn2" onClick={showChangePwHandler}>
            <div className="l">
              <img src="elements/password.svg" alt="" />
            </div>
            <h2 className="ch">Change Password</h2>
          </button>
          {showChangePw &&<PopupPw showChangePwHandler={showChangePwHandler} userId={auth.userId}/>}
          <button className="btn2" onClick={showChangeUsernameHandler}>
            <div className="l">
              <img src="elements/username_shape.svg" alt="" />
            </div>
            <h2 className="ch">Change Username</h2>
          </button>
          {showChangeUsername &&<PopupUsername showChangeUsernameHandler={showChangeUsernameHandler} changeUsername={changeUsernameHandler} username={auth.userName} userId={auth.userId}/>}
          <button className="btn23" onClick={showChangeEmailHandler}>
            <div className="l">
              <img src="elements/email.svg" alt="" />
            </div>
            <h2 className="ch">Change Email</h2>
          </button>
          {showChangeEmail &&<PopupEmail showChangeEmailHandler={showChangeEmailHandler} username={auth.userName} userId={auth.userId}/>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
