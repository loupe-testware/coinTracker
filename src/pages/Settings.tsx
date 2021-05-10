import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Settings.css';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <div className='settingsContainer'>
        <IonHeader></IonHeader>
      </div>
    </IonPage>
  );
};

export default Settings;
