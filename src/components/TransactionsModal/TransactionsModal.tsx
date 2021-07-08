import { useState } from "react";

import {
  IonModal,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";
import { transactionsModalComponentInterface } from "../../interfaces/interfaces";
import { cash } from "ionicons/icons";

import "./TransactionsModal.css";

const TransactionsModal: React.FC<transactionsModalComponentInterface> = ({
  setShowTransactionsModal,
  showTransactionsModal,
  coin,
  uniqueModalIndex,
}) => {
  const [selectedSegment, setSelectedSegment] = useState<any>("transactions");

  console.log(showTransactionsModal);
  
  return (
    <IonModal
      isOpen={showTransactionsModal === uniqueModalIndex}
      cssClass="transactionsModal"
      backdropDismiss={true}
      onDidDismiss={()=> setShowTransactionsModal(false)}
    >
      <IonSegment
        onIonChange={(e) => setSelectedSegment(e.detail.value)}
        value={selectedSegment}
      >
        <IonSegmentButton value="transactions">
          <IonLabel>Transactions</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="other">
          <IonLabel>Other</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      {selectedSegment === "transactions" ? (
        <div className="transactionsModalContainer">
          <div>{coin.coin_name}</div>
          {coin.transactions.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="transactionModalContainer"
                onClick={() => {
                  console.log(item.quantity);
                }}
              >
                <IonIcon
                  size="large"
                  className="transactionModalIcon"
                  icon={cash}
                />
                <div className="transactionModalType">{item.type}</div>
                <div className="transactionModalDate">{item.datetime}</div>
                <div className="transactionModalQuantity">{item.quantity}</div>
                <div className="transactionModalCost">
                  ${item.quantity * item.costPer}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>OTHER</div>
      )}

      <IonButton
        className="transactionsModalCloseButton"
        onClick={() => setShowTransactionsModal(false)}
      >
        Close
      </IonButton>
    </IonModal>
  );
};

export default TransactionsModal;
