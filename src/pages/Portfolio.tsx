import { IonContent, IonPage, IonRefresher, IonRefresherContent, IonSlides, IonSlide, IonReorder, IonReorderGroup } from '@ionic/react';
import { RefresherEventDetail, ItemReorderEventDetail } from '@ionic/core'
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
    initialSlide: 1,
    speed: 400
  };
  
  function onRefresh(event: CustomEvent<RefresherEventDetail>){
    dispatch(getCoins())
    event.detail.complete();
  }

  function doReorder(event: CustomEvent<ItemReorderEventDetail>) {
    event.detail.complete();
  }

  console.log(payload);

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
              return (
              <IonSlide className='portfolioSlideContainer'>
                <div className='portfolioSlide'>
                <div className='portfolioTotalContainer'>
                  <div className='portfolioName'>{item.portfolio_name}</div>
                  <div className='portfolioSettings'>...</div>
                  <div className='portfolioValue'>
                    £VALUE
                  </div>
                </div>
                <div className='portfolioCoinsContainer'>
                  <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
                    {
                      item.coins.map((coin, index)=>{
                        const coinData = payload.filter((item)=>{
                          if (coin.coin_name === item.id){
                            return item
                          }
                        })

                        const coinTotal = coin.transactions.reduce((prev, cur)=>{
                          return prev + cur.quantity;
                        }, 0)
                        
                        return(
                          <IonReorder>
                            <div className="portfolioCoinContainer">
                              <img className="portfolioCoinLogo" src={coinData[0].image} alt='coin logo'/>
                              <div className="portfolioCoinSymbol">
                              {coinData[0].symbol.toUpperCase()}
                              </div>
                              <div className="portfolioCoinCurrentPrice">
                                {coinData[0].current_price}
                              </div>
                              <div className="portfolioCoinValue">
                              {coinTotal}
                              </div>
                            </div>
                          </IonReorder>
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