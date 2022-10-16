import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/SpotsBrowser";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    < div >
    <Navigation isLoaded={isLoaded}/>
    <SpotsBrowser/>

    {/* {isLoaded && (
      // <Switch>
      //   <Route path="/login">
      //     <LoginFormPage />
      //   </Route>
      //   <Route path="/signup">
      //     <SignupFormPage />
      //   </Route>
      // </Switch>
    )} */}
  </ div>
  );
}

export default App;
