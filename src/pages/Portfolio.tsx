import { IonContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';

import dummyData from '../test.json'

import './Portfolio.css';

const Portfolio: React.FC = () => {

  console.log(dummyData);
  

  return (
    <IonPage>
      <IonContent className='portfolioMainContainer'>
        <IonRefresher>
          <IonRefresherContent>
          </IonRefresherContent>
        </IonRefresher>
        <div className='portfolioTotalContainer'>
          <div className='portfolioName'>Main 1</div>
          <div className='portfolioSettings'>...</div>
          <div className='portfolioValue'>£10,000</div>
        </div>
        <div className='portfolioCoinsContainer'>
          {

          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Portfolio;