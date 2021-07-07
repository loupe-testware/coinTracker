import { useState } from "react";

import {
  IonContent,
  IonInput,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";

import { coinInterface, coinsStoreInterface } from "../interfaces/interfaces";

import { useSelector, useDispatch } from "react-redux";
import { getCoins } from "../redux/coinSlice";
import "./Markets.css";

const Markets: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { payload } = useSelector(
    (state: coinsStoreInterface) => state.coins.list
  );

  const dispatch = useDispatch();
  //filter the payload by the search coins value
  const filteredPayload = payload?.filter((coin: coinInterface) => {
    if (
      coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return coin;
    }
  });
  //function to be fired on refresh to update the redux store with up to date coins info
  function onRefresh(event: CustomEvent<RefresherEventDetail>) {
    dispatch(getCoins());
    event.detail.complete();
  }

  return (
    <IonPage className="marketsPage">
      <IonContent className="marketsContentContainer">
        <IonRefresher
          className="marketsRefresher"
          slot="fixed"
          onIonRefresh={onRefresh}
        >
          <IonRefresherContent className="marketsRefresherContent"></IonRefresherContent>
        </IonRefresher>
        <div className="searchInputContainer">
          <IonInput
            className="searchInput"
            value={searchValue}
            placeholder="Search coins..."
            onIonChange={(e) => {
              setSearchValue(e.detail.value!);
            }}
            clearInput
          ></IonInput>
        </div>
        <div className="marketTitleContainers">
          <div className="marketTitleRank">Rank</div>
          <div className="marketTitleName">Name</div>
          <div className="marketTitlePrice">Price</div>
          <div className="marketTitleAdd">Add</div>
        </div>
        <div className="coinsMarketDataContainer">
          {filteredPayload?.map((coin: coinInterface, x: number) => {
            const coin_price_change_percentage_24h =
              Math.round(
                (coin.price_change_percentage_24h + Number.EPSILON) * 100
              ) / 100;
            return (
              <div key={x} className="coinContainer">
                <div className="coinMarketCapRank">{coin.market_cap_rank}</div>
                <img className="coinLogo" src={coin.image} alt="coin logo" />
                <div className="coinName">{coin.name}</div>
                <div className="coinSymbol">{coin.symbol.toUpperCase()}</div>
                <div className="coinPrice">${coin.current_price}</div>
                <div
                  style={{
                    color:
                      coin_price_change_percentage_24h < 0
                        ? "var(--ion-color-danger)"
                        : "var(--ion-color-success)",
                  }}
                  className="coinPercentage"
                >
                  {coin_price_change_percentage_24h}%
                </div>
                <button className="addToPortfolioButton">+</button>
              </div>
            );
          })}
          {
            //if the filter running on payload returns nothing then display this section to allow this
            filteredPayload?.length !== 0 ? null : <div>NO COINS FOUND</div>
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Markets;
