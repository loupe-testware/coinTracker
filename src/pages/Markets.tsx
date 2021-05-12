import { useState } from 'react'

import { IonInput, IonPage } from '@ionic/react';


import './Markets.css';
import { useSelector } from 'react-redux';

const Markets: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('')
//tech debt: fix the any state
  const { payload } = useSelector((state: any) => state.coins.list)

  console.log(payload);
  

  return (
    <IonPage>
      <div className='marketsContainer'>
        <div className='searchInputContainer'>
          <IonInput className='searchInput' value={searchValue} placeholder='Search coins...' onIonChange={(e)=>{setSearchValue(e.detail.value!)}}></IonInput>
        </div>
        <div className='coinsMarketDataContainer'>
  {/* payload interface */}
          {
            payload?.map((coin: any, x: number)=>{
              const coin_price_change_percentage_24h = Math.round((coin.price_change_percentage_24h + Number.EPSILON) * 100) / 100 

              return(
                <div className='coinContainer'>
                  <div className='coinMarketCapRank'>
                    {coin.market_cap_rank}
                  </div>
                    <img className='coinLogo' src={coin.image} alt='coin logo'/>
                  <div className='coinName'>
                    {coin.name}
                  </div>
                  <div className='coinSymbol'>
                    {coin.symbol}
                  </div>
                  <div className='coinPrice'>
                    ${coin.current_price}
                  </div>
                  <div style={{color: coin_price_change_percentage_24h < 0 ? 'red' : 'green'}} className='coinPercentage'>
                    {coin_price_change_percentage_24h}%
                  </div>
                  <button className='addToPortfolio'>
                    +
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
    </IonPage>
  );
};

export default Markets;
