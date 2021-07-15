import { IonPage } from "@ionic/react";

//Styling
import "./Settings.css";

const Settings: React.FC = () => {

  function signOut(){
    localStorage.clear()
    window.location.reload()
  }
  return <IonPage><button onClick={()=> signOut()}>SIGN OUT</button></IonPage>;
}; 

export default Settings;
