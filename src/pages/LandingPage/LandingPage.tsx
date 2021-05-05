import { IonButton, IonIcon } from "@ionic/react";
import logo from '../../assets/logo.svg'

import './LandingPage.css'

function LandingPage({setAuthState}:any){

    return (
        <div className='landingPageContainer'>
            <div className='logoContainer'>
                <IonIcon src={logo} className='logo'></IonIcon>
            </div>
            <h1 className='title'>Coin<br/>Butler</h1>
            <div className='signUpInButtonContainer'>
                <div className='signUpButtonContainer'>
                    <IonButton onClick={()=>setAuthState('signUp')} className='signUpButton' fill='clear'>SIGN UP</IonButton>
                </div>
                <div className='signInButtonContainer'>
                    <IonButton onClick={()=>setAuthState('signIn')} className='signInButton' color='white'>SIGN IN</IonButton>
                </div>
            </div>
        </div>
    )
}

export default LandingPage