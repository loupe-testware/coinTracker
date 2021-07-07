import { IonModal, IonButton } from "@ionic/react";
import { transactionsModalComponentInterface } from "../../interfaces/interfaces";

import "./TransactionsModal.css";

const TransactionsModal: React.FC<transactionsModalComponentInterface> = ({
  setShowTransactionsModal,
  showTransactionsModal,
  coin,
  uniqueModalIndex,
}) => {
  console.log(coin);

  return (
    <>
      <IonModal
        isOpen={showTransactionsModal === uniqueModalIndex}
        cssClass="my-custom-class"
      >
        <div>{coin.coin_name} Transactions</div>
        {coin.transactions.map((item: any, index: number) => {
          return <div className="transactionModalContainer">
            <div>
              {item.quantity}
            </div>
          </div>;
        })}
        <IonButton onClick={() => setShowTransactionsModal(false)}>
          Close Modal
        </IonButton>
      </IonModal>
    </>
  );
};

export default TransactionsModal;
