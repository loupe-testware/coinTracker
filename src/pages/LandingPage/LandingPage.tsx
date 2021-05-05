import { IonButton, IonIcon } from "@ionic/react";
import logo from '../../assets/logo.svg'

import Authentication from '../../components/Authentication/Authentication'

import { AuthenticationProps } from '../../interfaces/interfaces'

import './LandingPage.css'

function LandingPage({authState, setAuthState, setSignedIn}:AuthenticationProps){

 return (
     <div className='landingPageContainer'>
            <div className='logoContainer'>
                <IonIcon src={logo} className='logo'></IonIcon>
            </div>
            <h1 className='title'>COIN<br/>BUTLER</h1>
            <div className='signUpInButtonContainer'>
                <div className='signUpButtonContainer'>
                    <IonButton onClick={()=>setAuthState('signUp')} className='signUpButton' fill='clear'>SIGN UP</IonButton>
                </div>
                <div className='signInButtonContainer'>
                    <IonButton onClick={()=>setAuthState('signIn')} className='signInButton' color='white'>SIGN IN</IonButton>
                </div>
            </div>
        {authState === 'landingPage' ? 
        null 
    :
    <>
    <div className='blur' onClick={()=>setAuthState('landingPage')}> </div>
    <Authentication authState={authState} setAuthState={setAuthState} setSignedIn={setSignedIn}/>
    </>
    }
    </div>
    )
}

export default LandingPage