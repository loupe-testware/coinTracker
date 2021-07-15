import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSlides,
  IonSlide,
  IonReorder,
  IonReorderGroup,
  IonSkeletonText,
} from "@ionic/react";
import { RefresherEventDetail, ItemReorderEventDetail } from "@ionic/core";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCoins } from "../redux/coinSlice";

import TransactionsModal from "../components/TransactionsModal/TransactionsModal";

import { coinsStoreInterface } from "../interfaces/interfaces";

import dummyData from "../test.json";

import "./Portfolio.css";

const Portfolio: React.FC = () => {
  const { payload } = useSelector(
    (state: coinsStoreInterface) => state.coins.list
  );
  const customerDetails = useSelector(
    (state: any) => state.customerDetails.list.payload
  );
  console.log(customerDetails);

  if (customerDetails) {
  }

  const totalCoinValueArray: any = [];
  const [totalPortfolioValue, setTotalPortfolioValue] = useState([]);
  const [showTransactionsModal, setShowTransactionsModal] = useState("");
  const dispatch = useDispatch();

  //slide options and speed
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  function onRefresh(event: CustomEvent<RefresherEventDetail>) {
    dispatch(getCoins());
    event.detail.complete();
  }

  function doReorder(event: CustomEvent<ItemReorderEventDetail>) {
    event.detail.complete();
  }

  useEffect(() => {
    setTotalPortfolioValue(totalCoinValueArray);
  }, [payload]);
  console.log(customerDetails);

  return (
    <IonPage>
      <IonContent className="portfolioMainContainer">
        <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonSlides pager={true} options={slideOpts}>
          {customerDetails
            ? JSON.parse(customerDetails[0][4].stringValue).portfolios.map(
                (item: any, index: any) => {
                  let portfolioCoinIndex = index;
                  return (
                    <IonSlide key={index} className="portfolioSlideContainer">
                      <div className="portfolioSlide">
                        <div className="portfolioTotalContainer">
                          <div className="portfolioName">
                            {item.portfolio_name}
                          </div>
                          <div className="portfolioSettings">...</div>
                          <div className="portfolioValue">
                            ${totalPortfolioValue[portfolioCoinIndex]}
                          </div>
                        </div>
                        <div className="portfolioCoinsContainer">
                          <IonReorderGroup
                            disabled={true}
                            onIonItemReorder={doReorder}
                          >
                            {item.coins.map((coin: any, index: any) => {
                              const coinData = payload?.filter((item) => {
                                if (coin.coin_name === item.id) {
                                  return item;
                                }
                              });

                              const coinTotal = coin.transactions.reduce(
                                (prev: any, cur: any) => {
                                  return prev + cur.quantity;
                                },
                                0
                              );

                              var uniqueModalIndex = "";

                              if (coinData) {
                                if (index === 0) {
                                  totalCoinValueArray[portfolioCoinIndex] = 0;
                                }
                                totalCoinValueArray[portfolioCoinIndex] +=
                                  parseInt(
                                    (
                                      Math.round(
                                        coinTotal *
                                          coinData[0].current_price *
                                          100
                                      ) / 100
                                    ).toFixed(2)
                                  );
                                uniqueModalIndex =
                                  coinData[0].id + portfolioCoinIndex;
                              }

                              return (
                                <>
                                  {coinData ? (
                                    <>
                                      <IonReorder key={index}>
                                        <div
                                          className="portfolioCoinContainer"
                                          onClick={() =>
                                            setShowTransactionsModal(
                                              uniqueModalIndex
                                            )
                                          }
                                        >
                                          <img
                                            className="portfolioCoinLogo"
                                            src={coinData[0].image}
                                            alt="coin logo"
                                          />
                                          <div className="portfolioCoinSymbol">
                                            {coinData[0].symbol.toUpperCase()}
                                          </div>
                                          <div className="portfolioCoinCurrentPrice">
                                            ${coinData[0].current_price}
                                          </div>
                                          <div className="portfolioCoinPercentChange">
                                            <div
                                              style={{
                                                color:
                                                  coinData[0]
                                                    .price_change_percentage_24h <
                                                  0
                                                    ? "var(--ion-color-danger)"
                                                    : "var(--ion-color-success)",
                                              }}
                                              className="portfolioCoinPercentChange"
                                            >
                                              {coinData[0].price_change_percentage_24h.toFixed(
                                                2
                                              )}
                                              %
                                            </div>
                                          </div>
                                          <div className="portfolioCoinValue">
                                            $
                                            {(
                                              Math.round(
                                                coinTotal *
                                                  coinData[0].current_price *
                                                  100
                                              ) / 100
                                            ).toFixed(2)}
                                          </div>
                                          <div className="portfolioCoinQuantity">
                                            {coinTotal}
                                          </div>
                                        </div>
                                      </IonReorder>
                                      <IonContent>
                                        <TransactionsModal
                                          uniqueModalIndex={uniqueModalIndex}
                                          showTransactionsModal={
                                            showTransactionsModal
                                          }
                                          setShowTransactionsModal={
                                            setShowTransactionsModal
                                          }
                                          coin={coin}
                                        />
                                      </IonContent>
                                    </>
                                  ) : (
                                    <div className="portfolioSkeletonText">
                                      <div>
                                        <IonSkeletonText
                                          animated
                                          style={{ width: "40%" }}
                                        />
                                        <IonSkeletonText
                                          animated
                                          style={{ width: "60%" }}
                                        />
                                        <IonSkeletonText
                                          animated
                                          style={{ width: "60%" }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </>
                              );
                            })}
                          </IonReorderGroup>
                        </div>
                      </div>
                    </IonSlide>
                  );
                }
              )
            : null}
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Portfolio;
