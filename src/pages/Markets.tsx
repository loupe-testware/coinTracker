import { useState } from 'react'

import { IonInput, IonPage } from '@ionic/react';


import './Markets.css';

const Markets: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('')

  return (
    <IonPage>
      <div className='marketsContainer'>
        <div className='searchInputContainer'>
          <IonInput className='searchInput' value={searchValue} placeholder='searchcoins' onIonChange={(e)=>{setSearchValue(e.detail.value!)}}>

          </IonInput>
        </div>
      </div>
    </IonPage>
  );
};

export default Markets;
