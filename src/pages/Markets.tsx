import { useState } from 'react'

import { IonContent, IonInput, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core'


import './Markets.css';
import { useSelector, useDispatch } from 'react-redux';
import {getCoins} from '../redux/coinSlice'


const Markets: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('')
//tech debt: fix the any state
  const { payload } = useSelector((state: any) => state.coins.list)
  const dispatch = useDispatch()

  const filteredPayload = payload?.filter((coin: any)=>{
     if (coin.name.toLowerCase().includes(searchValue.toLowerCase()) || coin.symbol.toLowerCase().includes(searchValue.toLowerCase())){
      return coin
    }
  })

  function onRefresh(event: CustomEvent<RefresherEventDetail>){
    console.log('Begin async operation');
    dispatch(getCoins())
    event.detail.complete();
    console.log('Async operation has ended');

  }

  return (
    <IonPage className='marketsPage'>
      <IonContent className='marketsContentContainer'>
      <IonRefresher className='marketsRefresher' slot='fixed' onIonRefresh={onRefresh} >
        <IonRefresherContent className='marketsRefresherContent'>
        </IonRefresherContent>
      </IonRefresher>
            <div className='searchInputContainer'>
              <IonInput className='searchInput' value={searchValue} placeholder='Search coins...' onIonChange={(e)=>{setSearchValue(e.detail.value!)}}></IonInput>
            </div>
            <div className='coinsMarketDataContainer'>
              {/* payload interface */}
              {
                filteredPayload?.map((coin: any, x: number)=>{
                  const coin_price_change_percentage_24h = Math.round((coin.price_change_percentage_24h + Number.EPSILON) * 100) / 100 
                  return(
                    <div key={x} className='coinContainer'>
                      <div className='coinMarketCapRank'>
                        {coin.market_cap_rank}
                      </div>
                        <img className='coinLogo' src={coin.image} alt='coin logo'/>
                      <div className='coinName'>
                        {coin.name}
                      </div>
                      <div className='coinSymbol'>
                        {coin.symbol.toUpperCase()}
                      </div>
                      <div className='coinPrice'>
                        ${coin.current_price}
                      </div>
                      <div style={{color: coin_price_change_percentage_24h < 0 ? 'var(--ion-color-danger)' : 'var(--ion-color-success)'}} className='coinPercentage'>
                        {coin_price_change_percentage_24h}%
                      </div>
                      <button className='addToPortfolioButton'>
                        +
                      </button>
                    </div>
                  )
                })
              }
            </div>
      </IonContent>
    </IonPage>
  );
};

export default Markets;
