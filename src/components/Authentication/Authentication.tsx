import {useState} from 'react'
//Ion imports
import { IonCard, IonToast } from '@ionic/react';
// AWS imports for user authentication
import { Auth } from 'aws-amplify'

// import awsconfig from './aws-imports'
import { AuthenticationProps, ErrorToast } from '../../interfaces/interfaces'

// style import
import './Authentication.css'

// You can get the current config object
Auth.configure();


function Authentication({authState, setAuthState, setSignedIn}: AuthenticationProps){
let formInputState = {email: '', password: '', verificationCode: ''};
const [showErrorToast, setShowErrorToast] = useState<ErrorToast>({show: false, message:''});

/* onChange handler for form inputs */
function onChange(e: any) {
  formInputState = { ...formInputState, [e.target.name]: e.target.value };
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
    /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
    setAuthState("confirmSignUp");
  } catch (err) { console.log({ err }); }
}

/* Confirm sign up function for MFA */
async function confirmSignUp() {
  try {
    await Auth.confirmSignUp(formInputState.email, formInputState.verificationCode);
    /* Once the user successfully confirms their account, update form state to show the sign in form*/
    setAuthState("signIn");
  } catch (err) { console.log({ err }); }
}

/* Sign in function */
async function signIn() {
  try {
    await Auth.signIn(formInputState.email, formInputState.password);
    /* Once the user successfully signs in, update the form state to show the signed in state */
    setAuthState("signedIn");
  } catch (err) { console.log({ err }); setShowErrorToast({show: true, message: err.message}) }
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
            onChange={onChange}
          />
          <input
            name="verificationCode"
            placeholder="code"
            onChange={onChange}
          />
          <button onClick={confirmSignUp}>Confirm Sign Up</button>
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
              placeholder="password"
              onChange={onChange}
            />
            <button onClick={signIn}>SIGN IN</button>
          </div>
        );
      default:
        return null
  }
}

  return(
  <div className='backgroundFilter'>
      <IonCard className='authCard'>
      <h1 className='authTitle'>COIN <br/> BUTLER</h1>
      {authRenderSwitch()}
      <IonToast
         isOpen={showErrorToast.show}
         onDidDismiss={() => setShowErrorToast({...showErrorToast, show: false})}
         message={showErrorToast.message}
         duration={2000}
         color='danger'
      />
      </IonCard>
   </div>
  )
    }

export default Authentication
 