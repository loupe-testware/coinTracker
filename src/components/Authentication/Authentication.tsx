import React from 'react'
import {IonItem} from '@ionic/react'

// AWS imports for user authentication
import Amplify, { Auth } from 'aws-amplify'
// import awsconfig from './aws-imports'

interface AuthenticationProps {
  authState: string,
  setAuthState: any
}

function Authentication({authState, setAuthState}: AuthenticationProps){
let formInputState = { username: '', password: '', email: '', verificationCode: '' };

/* onChange handler for form inputs */
function onChange(e: any) {
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
    authState = "confirmSignUp";
  } catch (err) { console.log({ err }); }
}

/* Confirm sign up function for MFA */
async function confirmSignUp() {
  try {
    await Auth.confirmSignUp(formInputState.username, formInputState.verificationCode);
    /* Once the user successfully confirms their account, update form state to show the sign in form*/
    authState = "signIn";
  } catch (err) { console.log({ err }); }
}

/* Sign in function */
async function signIn() {
  try {
    await Auth.signIn(formInputState.username, formInputState.password);
    /* Once the user successfully signs in, update the form state to show the signed in state */
    authState = "signedIn";
  } catch (err) { console.log({ err }); }
}
        if (authState === "signUp") {
            return (
              <div>
                <h1>Sign Up</h1>
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
          if (authState === "confirmSignUp") {
            return (
              <div>
                <h1>Confirm Sign Up</h1>
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
          if (authState === "signIn") {
            return (
            <div>
              <h1>Sign In</h1>
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
          if (authState === "signedIn") {
            return (
              <div>
                <h1>Signed In</h1>
                <h1>Welcome to my app!</h1>
              </div>
            )
        }   else return null
    }



export default Authentication
 