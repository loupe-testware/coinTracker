import {useState} from 'react'
//Ion imports
import { IonCard, IonToast } from '@ionic/react';
// AWS imports for user authentication
import { Auth } from 'aws-amplify';

// import awsconfig from './aws-imports'
import  awsmobile  from '../../aws-exports.js';

import { AuthenticationProps, ErrorToast } from '../../interfaces/interfaces';

// style import
import './Authentication.css';


//Interface Imports
import {formInputState} from '../../interfaces/interfaces'

// Configure Userpool for Auth
Auth.configure(awsmobile);

function Authentication({authState, setAuthState}: AuthenticationProps){
const [formInputState, setFormInputState] = useState<formInputState>({email: '', password: '', verificationCode: ''})
const [authToast, setAuthToast] = useState<ErrorToast>({
  errorToast: false,
  signUpSuccessToast: false,
  authSuccessToast:false,
  message: ''
});

/* onChange handler for form inputs */
function onChange(e: any) {
  setFormInputState({ ...formInputState, [e.target.name]: e.target.value })
}

/* Sign up function */
async function signUp() {
  try {
    await Auth.signUp({
      username: formInputState.email,
      password: formInputState.password,
      attributes: {
        email: formInputState.email
      }});
    /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA  and clear the relevant inputs*/
    setFormInputState({...formInputState, password: '', verificationCode: ''})
    setAuthToast({...authToast, signUpSuccessToast: true, message: 'Please check your email to get verification code'})
    setAuthState("confirmSignUp");
  } catch (err) { console.log({ err }); setAuthToast({...authToast, errorToast: true, message: err.message})}
}

/* Confirm sign up function for MFA */
async function confirmSignUp() {
  try {
    await Auth.confirmSignUp(formInputState.email, formInputState.verificationCode);
    /* Once the user successfully confirms their account, update form state to show the sign in form*/
    setAuthToast({...authToast, authSuccessToast: true, message: 'Success! please sign in'})
    setAuthState("signIn");
  } catch (err) { console.log({ err }); setAuthToast({...authToast, errorToast: true, message: err.message})}
}

/* Sign in function */
async function signIn() {
  try {
    await Auth.signIn(formInputState.email, formInputState.password);
    /* Once the user successfully signs in, update the form state to show the signed in state*/
    setAuthState("signedIn");
  } catch (err) { console.log({ err }); setAuthToast({...authToast, errorToast: true, message: err.message})}
  }


function authRenderSwitch(){
  switch(authState) {
    case 'signUp':
      return(
        <div className='authContainer'>
        <input
          placeholder="email"
          name="email"
          onChange={onChange}
        />
        <input
          placeholder="password"
          name="password"
          type="password"
          value={formInputState.password}
          onChange={onChange}
        />
        <button onClick={signUp}>SIGN UP</button>
      </div>
      );
    case 'confirmSignUp':
      return (
        <div className='authContainer'>
          <input
            name="email"
            placeholder="email"
            value={formInputState.email}
            onChange={onChange}
          />
          <input
            name="verificationCode"
            placeholder="code"
            value={formInputState.verificationCode}
            onChange={onChange}
          />
          <button onClick={confirmSignUp}>VERIFY EMAIL</button>
        </div>
      );
    case 'signIn':
      return (
        <div className='authContainer'>
            <input
              name="email"
              placeholder="email"
              onChange={onChange}
            />
            <input
              name="password"
              type="password"
              value={formInputState.password}
              placeholder="password"
              onChange={onChange}
            />
            <button onClick={signIn}>SIGN IN</button>
          </div>
        );
      default: setAuthState('landingPage')  
  }
}

  return(
  <div className='backgroundFilter'>
      <IonCard className='authCard'>
      <h1 className='authTitle'>COIN <br/> BUTLER</h1>
      {authRenderSwitch()}
      <IonToast
         isOpen={authToast.errorToast}
         onDidDismiss={() => setAuthToast({...authToast, errorToast: false})}
         message={authToast.message}
         duration={3000}
         color='danger'
      />
      <IonToast
         isOpen={authToast.signUpSuccessToast}
         onDidDismiss={() => setAuthToast({...authToast, signUpSuccessToast: false})}
         message={authToast.message}
         duration={3000}
         color='success'
      />
      <IonToast
         isOpen={authToast.authSuccessToast}
         onDidDismiss={() => setAuthToast({...authToast, authSuccessToast: false})}
         message={authToast.message}
         duration={3000}
         color='success'
      />
      </IonCard>
   </div>
  )
    }

export default Authentication
 