import { IonPage } from "@ionic/react";

//Styling
import "./Settings.css";

const Settings: React.FC = () => {
  return <IonPage><button onClick={()=> localStorage.clear()}>SIGN OUT</button></IonPage>;
};

export default Settings;
