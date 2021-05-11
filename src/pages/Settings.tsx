import { IonPage } from '@ionic/react';
import { useDispatch } from 'react-redux';
import {getCoins} from '../redux/coinSlice'

import './Settings.css';
import { useEffect } from 'react';

const Settings: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCoins())
  }
  ,[dispatch])
  return (
    <IonPage>
      <div className='settingsContainer'>
      </div>
    </IonPage>
  );
};

export default Settings;
