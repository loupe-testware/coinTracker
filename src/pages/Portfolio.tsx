import { IonContent, IonPage, IonRefresher, IonRefresherContent, IonSlides, IonSlide, IonReorder, IonReorderGroup } from '@ionic/react';
import { RefresherEventDetail, ItemReorderEventDetail } from '@ionic/core'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getCoins} from '../redux/coinSlice'

import { coinInterface, coinsStoreInterface } from '../interfaces/interfaces'

import dummyData from '../test.json'

import './Portfolio.css';

const Portfolio: React.FC = () => {
  const { payload } = useSelector((state: coinsStoreInterface) => state.coins.list)
  const dispatch = useDispatch()

  //slide options and speed
  const slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  
  function onRefresh(event: CustomEvent<RefresherEventDetail>){
    dispatch(getCoins())
    event.detail.complete();
  }

  function doReorder(event: CustomEvent<ItemReorderEventDetail>) {
    event.detail.complete();
  }

  const totalCoinValueArray: any = []
  const [test, setTest] = useState([])
  console.log(test);
  useEffect(()=>{
    setTest(totalCoinValueArray)
  },[])
  
  return (
    <IonPage>
      <IonContent className='portfolioMainContainer'>
        <IonRefresher slot='fixed' onIonRefresh={onRefresh}>
          <IonRefresherContent>
          </IonRefresherContent>
        </IonRefresher>
        <IonSlides pager={true} options={slideOpts}>
          {
            dummyData.portfolios.map((item, index)=>{
              let portfolioCoinIndex =  index
              return (
              <IonSlide className='portfolioSlideContainer'>
                <div className='portfolioSlide'>
                <div className='portfolioTotalContainer'>
                  <div className='portfolioName'>{item.portfolio_name}</div>
                  <div className='portfolioSettings'>...</div>
                  <div className='portfolioValue'>
                    {test[portfolioCoinIndex]}
                  </div>
                </div>
                <div className='portfolioCoinsContainer'>
                  <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
                    {
                     item.coins.map((coin, index)=>{
                      const coinData = payload?.filter((item)=>{
                          if (coin.coin_name === item.id){
                            return item
                          }
                        })
                        
                        const coinTotal = coin.transactions.reduce((prev, cur)=>{
                          return prev + cur.quantity;
                        }, 0)

                        if (coinData) {                   
                          console.log(index);
                          if (index === 0){
                            totalCoinValueArray[portfolioCoinIndex] = 0
                          }
                          totalCoinValueArray[portfolioCoinIndex] += parseInt((Math.round((coinTotal*coinData[0].current_price) * 100) / 100).toFixed(2))
                          console.log(totalCoinValueArray)
                        }
                        return(
                        <>
                        {
                          coinData ? <IonReorder>
                          <div className="portfolioCoinContainer">
                            <img className="portfolioCoinLogo" src={coinData[0].image} alt='coin logo'/>
                            <div className="portfolioCoinSymbol">
                            {coinData[0].symbol.toUpperCase()}
                            </div>
                            <div className="portfolioCoinCurrentPrice">
                              ${coinData[0].current_price}
                            </div>
                            <div className="portfolioCoinPercentChange">
                            <div style={{color: coinData[0].price_change_percentage_24h < 0 ? 'var(--ion-color-danger)' : 'var(--ion-color-success)'}} className='portfolioCoinPercentChange'>
                              {coinData[0].price_change_percentage_24h}%
                            </div>
                            </div>
                            <div className="portfolioCoinValue">
                            ${(Math.round((coinTotal * coinData[0].current_price) * 100) / 100).toFixed(2)}
                            </div>
                          </div>
                        </IonReorder>
                        :
                        'LOADING COIN DATA'
                        }
                          </>
                        )
                      })
                    }
                  </IonReorderGroup>
                </div>
                </div>
              </IonSlide>
              )
              
            })
          }
         
        </IonSlides>


       
      </IonContent>
    </IonPage>
  );
};

export default Portfolio;