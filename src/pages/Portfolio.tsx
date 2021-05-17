import { IonContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';

import './Portfolio.css';

const Portfolio: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonRefresher>
          <IonRefresherContent>
          </IonRefresherContent>
        </IonRefresher>
        <div className='portfolioTotalContainer'>
          <div className='portfolioName'>Main 1</div>
          <div className='portfolioSettings'>...</div>
          <div className='portfolioValue'>£10,000</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Portfolio;