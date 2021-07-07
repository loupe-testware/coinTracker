import { IonModal, IonButton } from "@ionic/react";
import { transactionsModalComponentInterface } from "../../interfaces/interfaces";

import "./TransactionsModal.css";

const TransactionsModal: React.FC<transactionsModalComponentInterface> = ({
  setShowTransactionsModal,
  showTransactionsModal,
}) => {
  return (
    <>
      <IonModal isOpen={showTransactionsModal} cssClass="my-custom-class">
        <p>This is modal content</p>
        <IonButton onClick={() => setShowTransactionsModal(false)}>
          Close Modal
        </IonButton>
      </IonModal>
    </>
  );
};

export default TransactionsModal;
