import { useState } from 'react'
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonItem,
  IonButton,
  IonInput,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

// AWS imports for user authentication
import Amplify, { Auth } from 'aws-amplify'
// import awsconfig from './aws-imports'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


const App: React.FC = () => {
/* Create the form state and form input state */
let formState = "signUp";
let formInputState = { username: '', password: '', email: '', verificationCode: '' };

/* onChange handler for form inputs */
function onChange(e) {
  formInputState = { ...formInputState, [e.target.name]: e.target.value };
}

/* Sign up function */
async function signUp() {
  try {
    await Auth.signUp({
      username: formInputState.username,
      password: formInputState.password,
      attributes: {
        email: formInputState.email
      }});
    /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
    formState = "confirmSignUp";
  } catch (err) { console.log({ err }); }
}

/* Confirm sign up function for MFA */
async function confirmSignUp() {
  try {
    await Auth.confirmSignUp(formInputState.username, formInputState.verificationCode);
    /* Once the user successfully confirms their account, update form state to show the sign in form*/
    formState = "signIn";
  } catch (err) { console.log({ err }); }
}

/* Sign in function */
async function signIn() {
  try {
    await Auth.signIn(formInputState.username, formInputState.password);
    /* Once the user successfully signs in, update the form state to show the signed in state */
    formState = "signedIn";
  } catch (err) { console.log({ err }); }
}

  return (
  <IonApp>
  {
  if (formState === "signUp") {
  return (
    <div>
      <input
        name="username"
        onChange={onChange}
      />
      <input
        name="password"
        type="password"
        onChange={onChange}
      />
      <input
        name="email"
        onChange={onChange}
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  )
}

/* If the form state is "confirmSignUp", show the confirm sign up form */
if (formState === "confirmSignUp") {
  return (
    <div>
      <input
        name="username"
        onChange={onChange}
      />
      <input
        name="verificationCode"
        onChange={onChange}
      />
      <button onClick={confirmSignUp}>Confirm Sign Up</button>
    </div>
  )
}

/* If the form state is "signIn", show the sign in form */
if (formState === "signIn") {
  return (
  <div>
      <input
        name="username"
        onChange={onChange}
      />
      <input
        name="password"
        onChange={onChange}
      />
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}

/* If the form state is "signedIn", show the app */
if (formState === "signedIn") {
  return (
    <div>
      <h1>Welcome to my app!</h1>
    </div>
  )
}
    }</IonApp>
  )
};

 {/* <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter> */}

export default App;
