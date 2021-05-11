import { IonHeader, IonPage } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../redux/counter';
import {getCoins} from '../redux/coinSlice'

import './Settings.css';
import { useEffect } from 'react';

const Settings: React.FC = () => {

  const { count } = useSelector( (state: any) => state.counter )
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCoins())
  }
  ,[dispatch])

  return (
    <IonPage>
      <div className='settingsContainer'>
        <IonHeader>TESTS</IonHeader>
        <div>
          <div>{count}</div>
          <button onClick={()=> dispatch(increment())}>ADD</button>
          <button onClick={()=> dispatch(decrement())}>SUBTRACT</button>
        </div>


      </div>
    </IonPage>
  );
};

export default Settings;
