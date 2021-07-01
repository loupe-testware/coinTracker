import { IonContent, IonPage, IonRefresher, IonRefresherContent, IonSlides, IonSlide } from '@ionic/react';

import dummyData from '../test.json'

import './Portfolio.css';

const Portfolio: React.FC = () => {

  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  

  return (
    <IonPage>
      <IonContent className='portfolioMainContainer'>
        <IonRefresher slot='fixed'>
          <IonRefresherContent>
          </IonRefresherContent>
        </IonRefresher>
        <IonSlides pager={true} options={slideOpts}>
          {
            dummyData.portfolios.map((item, index)=>{
              
              return (
              <IonSlide>
                <div className='portfolioTotalContainer'>
                  <div className='portfolioName'>{item.portfolio_name}</div>
                  <div className='portfolioSettings'>...</div>
                  <div className='portfolioValue'>{item.coins.map((coin, index)=>{
                      
                  })}</div>
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