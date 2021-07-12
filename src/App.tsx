import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonButton,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { settingsSharp, wallet, analyticsSharp } from "ionicons/icons";
import Settings from "./pages/Settings";
import Portfolio from "./pages/Portfolio";
import Markets from "./pages/Markets";

//Redux
import { useDispatch } from "react-redux";
import { getCoins } from "./redux/coinSlice";

import { Auth } from "aws-amplify";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./app.css";

// Components
import LandingPage from "./pages/LandingPage/LandingPage";
import Loading from "./components/Loading/Loading";

const App: React.FC = () => {
  //Create formState to handle the users authentication path
  const [authState, setAuthState] = useState<string>("loading");

  //Dispatch for redux
  const dispatch = useDispatch();

  fetch("https://30bglyrnxl.execute-api.eu-west-2.amazonaws.com/dev")
    .then((res) => res.json())
    .then((data) => console.log(data));

  //function to check the user is signed
  async function isUserSignedIn() {
    const userCredentials = await Auth.currentUserCredentials();
    if (userCredentials.authenticated) {
      setAuthState("signedIn");
      dispatch(getCoins());
    } else if (
      authState !== "signIn" &&
      authState !== "signUp" &&
      authState !== "confirmSignUp"
    ) {
      setAuthState("landingPage");
    }
  }

  useEffect(() => {
    isUserSignedIn();
  }, [authState]);

  function appRender() {
    if (authState === "loading") {
      return <Loading />;
    } else if (authState !== "signedIn") {
      return <LandingPage authState={authState} setAuthState={setAuthState} />;
    } else
      return (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Route exact path="/portfolio">
                <Portfolio />
              </Route>
              <Route path="/markets">
                <Markets />
              </Route>
              <Route exact path="/">
                <Redirect to="/portfolio" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="settings" href="/settings">
                <IonIcon icon={settingsSharp} />
                <IonLabel>Settings</IonLabel>
              </IonTabButton>
              <IonTabButton tab="portfolio" href="/portfolio">
                <IonIcon icon={wallet} />
                <IonLabel>Portfolio</IonLabel>
              </IonTabButton>
              <IonTabButton tab="markets" href="/markets">
                <IonIcon icon={analyticsSharp} />
                <IonLabel>Markets</IonLabel>
              </IonTabButton>
            </IonTabBar>
            <IonButton
              color="white"
              onClick={async () => {
                try {
                  await Auth.signOut({
                    global: true,
                  });
                  window.location.reload();
                } catch (error) {
                  console.log("error signing out: ", error);
                }
              }}
            >
              Sign Out
            </IonButton>
          </IonTabs>
        </IonReactRouter>
      );
  }

  return <IonApp>{appRender()}</IonApp>;
};

export default App;
