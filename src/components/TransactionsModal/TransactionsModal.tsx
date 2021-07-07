import { IonModal, IonButton, IonIcon } from "@ionic/react";
import { transactionsModalComponentInterface } from "../../interfaces/interfaces";
import { cash } from "ionicons/icons"

import "./TransactionsModal.css";

const TransactionsModal: React.FC<transactionsModalComponentInterface> = ({
  setShowTransactionsModal,
  showTransactionsModal,
  coin,
  uniqueModalIndex,
}) => {


  return (
    <IonModal
    isOpen={showTransactionsModal === uniqueModalIndex}
    cssClass='transactionsModal'
    >
      <div className='transactionsModalContainer'>
        <div>{coin.coin_name} Transactions</div>
        {coin.transactions.map((item: any, index: number) => {
          return <div className="transactionModalContainer">
        
              <IonIcon size='large' className='transactionModalIcon' icon={cash}/>
        
            <div className='transactionModalType'>
              {item.type}
            </div>
            <div className='transactionModalDate'>
              {item.datetime}
            </div>
            <div className='transactionModalQuantity'>
              {item.quantity}
            </div>
            <div className='transactionModalCost'>
              ${item.quantity * item.costPer}
            </div>
          </div>;
        })}
        </div>
        <IonButton className='transactionsModalCloseButton' onClick={() => setShowTransactionsModal(false)}>
          Close Modal
        </IonButton>
      </IonModal>
  );
};

export default TransactionsModal;
