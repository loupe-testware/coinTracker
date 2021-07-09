import { useState } from "react";
import { IonModal, IonButton, IonSelect, IonSelectOption } from "@ionic/react";

const SingleTransactionModal: React.FC<any> = ({
  selectedTransaction,
  setSelectedTransaction,
  index,
  item,
}) => {
  const [transactionType, setTransactionType] = useState(item.type);
  return (
    <div>
      <IonModal
        isOpen={selectedTransaction === index}
        backdropDismiss={true}
        onDidDismiss={() => setSelectedTransaction(null)}
      >
        <IonSelect
          value={transactionType}
          placeholder={item.type}
          onIonChange={(e) => setTransactionType(e.detail.value)}
        >
          <IonSelectOption value="transfer">Transfer</IonSelectOption>
          <IonSelectOption value="buy">Buy</IonSelectOption>
          <IonSelectOption value="sell">Sell</IonSelectOption>
        </IonSelect>
        <div>{transactionType}</div>
        <IonButton onClick={() => setSelectedTransaction(null)}>
          Close
        </IonButton>
      </IonModal>
    </div>
  );
};

export default SingleTransactionModal;
