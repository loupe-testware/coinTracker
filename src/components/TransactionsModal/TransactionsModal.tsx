import { IonModal, IonButton } from "@ionic/react";
import { transactionsModalComponentInterface } from "../../interfaces/interfaces";

import "./TransactionsModal.css";

const TransactionsModal: React.FC<transactionsModalComponentInterface> = ({
  setShowTransactionsModal,
  showTransactionsModal,
  transactions,
  uniqueModalIndex
}) => {
    
  return (
    <>
      <IonModal isOpen={showTransactionsModal===uniqueModalIndex} cssClass="my-custom-class">
        <p>TYPE: {transactions.length}</p>
        <IonButton onClick={() => setShowTransactionsModal(false)}>
          Close Modal
        </IonButton>
      </IonModal>
    </>
  );
};

export default TransactionsModal;
