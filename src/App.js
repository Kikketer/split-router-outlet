import React from "react";
import { Route } from "react-router-dom";
import {
  IonApp,
  IonSplitPane,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonRouterOutlet,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon
} from "@ionic/react";
import { close } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Media from "react-media";

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

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        {/* Altering the contentId has no effect, it's always the first render */}
        <Media query={"(min-width: 735px)"}>
          {(isWide) => (
            <IonSplitPane
              contentId={isWide ? "detail" : "master"}
              when={"(min-width: 735px)"}
            >
              <IonRouterOutlet id="master">
                {/* Note to fix the issue I'd like to put id="master" on the route itself */}
                {/* But I can't since Ionic throws an error saying it can't find the master content */}
                <Route
                  path={"/"}
                  // Note that we don't want it to be exact if it's in large/wide since
                  // we need to show this AND the detail at the same time
                  exact={!isWide}
                  render={() => (
                    <IonPage>
                      <IonHeader>
                        <IonToolbar>
                          <IonTitle>Master Head</IonTitle>
                        </IonToolbar>
                      </IonHeader>
                      <IonContent>
                        <IonCard routerLink="/detail">
                          <IonCardContent>
                            <p>
                              Summary inside "master"{" "}
                              {isWide ? "isWide" : "notWide"}
                            </p>
                          </IonCardContent>
                        </IonCard>
                      </IonContent>
                    </IonPage>
                  )}
                />
                {/* We need to have all routes for mobile defined here since it's a single IonRouterOutlet */}
                {/* This is not something we want to do since the history stack is locked here */}
                {/* We also do not want this route to match when we are wide and fallback to the / route */}
                <Route
                  path={isWide ? "/bogus-non-matching" : "/detail"}
                  render={() => (
                    <IonPage>
                      <IonHeader>
                        <IonToolbar>
                          {/* This would be dynamic either a close or back button if it would be able to reuse the same component */}
                          <IonButtons slot="start">
                            <IonBackButton defaultHref={`/`} />
                          </IonButtons>
                          <IonTitle>Detail Master</IonTitle>
                        </IonToolbar>
                      </IonHeader>
                      <IonContent>
                        <IonCard routerLink="/detail">
                          <IonCardContent>
                            <p>
                              Detail inside "master"{" "}
                              {isWide ? "isWide" : "notWide"}
                            </p>
                          </IonCardContent>
                        </IonCard>
                      </IonContent>
                    </IonPage>
                  )}
                />
              </IonRouterOutlet>
              {/* We need another router outlet because of the contentId can't look deep */}
              {/* This also causes the effect that detail is in it's own history stack */}
              <IonRouterOutlet id="detail">
                <Route
                  path={"/detail"}
                  render={() => (
                    <IonPage>
                      <IonHeader>
                        <IonToolbar>
                          <IonButtons slot="end">
                            <IonButton routerLink={"/"}>
                              <IonIcon
                                ariaLabel={"Close"}
                                icon={close}
                                slot="icon-only"
                              />
                            </IonButton>
                          </IonButtons>
                          <IonTitle>Detail in Detail</IonTitle>
                        </IonToolbar>
                      </IonHeader>
                      <IonContent>
                        <p>Detail in Detail {isWide ? "isWide" : "notWide"}</p>
                      </IonContent>
                    </IonPage>
                  )}
                />
              </IonRouterOutlet>
            </IonSplitPane>
          )}
        </Media>
      </IonReactRouter>
    </IonApp>
  );
}
