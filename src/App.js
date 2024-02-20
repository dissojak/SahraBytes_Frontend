import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./home/Home";

import Ban from "./shared/components/Pages/Ban";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import Signup from "./user/pages/Signup";
import RegisterHackatons from "./register/Page/RegisterHackatons";
import Profile from "./profile/Profile";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [ban, setBan] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [teamId, setTeamId] = useState();
  const [profileImage, setProfileImage] = useState();

  const login = useCallback(
    (userId, userName, teamId, isAdmin = false, ban = false) => {
      setIsLoggedIn(true);
      setUserId(userId);
      setUserName(userName);
      setIsAdmin(isAdmin);
      setTeamId(teamId);
      setBan(ban);
    },
    []
  );

  const updateUsername = useCallback((userName) => {
    setUserName(userName);
  }, []);

  const updateProfilePicture = useCallback((URLimage) => {
    setProfileImage(URLimage);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserName(null);
    setIsAdmin(false);
    setTeamId(null);
    setBan(null);
  }, []);

  let routes;

  if (isLoggedIn && !isAdmin && !ban) {
    routes = (
      <Switch>
        <Route path="/" exact>
          {/* <Hackatons /> */}
          <Home />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        {/* ----------ADEM IS HERE---------- */}
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Route path="/registred-hackatons" exact>
          <RegisterHackatons />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (isLoggedIn && !isAdmin && ban) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Ban />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (isLoggedIn && isAdmin) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          {/* --------------- */}
          {/* <Hackatons /> */}
          {/* <Profile/> */}
          {/* ---------------- */}

          <Home />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/signup">
          <Signup />
          {/* <Users /> */}
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        userName: userName,
        ban: ban,
        teamId: teamId,
        isAdmin: isAdmin,
        profileImage: profileImage,
        login: login,
        logout: logout,
        updateUsername: updateUsername,
        updateProfilePicture: updateProfilePicture,
      }}
    >
      <Router>
        <MainNavigation />
        <main style={{ marginTop: 0 }}>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
