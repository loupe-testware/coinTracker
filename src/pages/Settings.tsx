import { IonHeader, IonPage } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../redux/counter';

import './Settings.css';

const Settings: React.FC = () => {

  const { count } = useSelector( (state: any) => state.counter )
  const dispatch = useDispatch()
console.log(count);

  return (
    <IonPage>
      <div className='settingsContainer'>
        <IonHeader></IonHeader>
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
