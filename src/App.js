import React from 'react';

import './App.css';
import CreateWallet from './pages/create-wallet'
import ImportWallet from './pages/import-wallet'
import Signin from './pages/signin'
import Home from './pages/home'
import AboutUs from './pages/about-us'
import PrivacyPolicy from './pages/privacy-policy'
import TermsOfUse from './pages/terms-of-use'
import Send from './pages/send'
import SendToken from './pages/send-token'
import SetupWallet from './pages/setup-wallet'
import Receive from './pages/receive'
import TransactionDetail from './pages/transaction-details';
import TransactionDetailLocal from './pages/transaction-local-details';
import WalletDetail from './pages/wallet-details';
import ExportKey from './pages/export-key';
import AddCustomToken from './pages/addtoken';
import ImportAccount from './pages/importaccount';
import DeployContract from './pages/deploy-contract';
//
import Swap from "./pages/swap";
import Nft from "./pages/nft";
import Reveal from "./pages/reveal";
import ShowPrivatekey from "./pages/show-privatekey";
import ChangePassword from "./pages/change-password";
import Security from "./pages/security";
import Buysell from "./pages/buysell";
import TokenDetail from "./pages/tokendetail";
import Activity from "./pages/activity";
import Accounts from "./pages/accounts";

import { useRecoilState, useRecoilValue } from 'recoil';
import { allTokens, currentWallet } from './store/atoms';

import {
  MemoryRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Settings from './pages/settings';
import ALL_TOKENS from './config/tokens';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
    ].join(',')
  },
  palette: {
    primary: {
      main: '#184c82'
    },
    secondary: {
      main: '#2196f3'
    }
  }
});

function App() {

  const wallet = useRecoilValue(currentWallet);
  let [currentTokens, setCurrentTokens] = useRecoilState(allTokens);
  
  React.useEffect(() => {
    if (!(wallet.address in currentTokens)) {
      // setCurrentTokens(ALL_TOKENS);
      currentTokens = {
        ...currentTokens,
        [wallet.address]: ALL_TOKENS
      };
      setCurrentTokens(currentTokens);
    }
  }, [currentTokens, wallet]); //eslint-disable-line react-hooks/exhaustive-deps

  return (

    <ThemeProvider theme={theme}>
      <ProvideAuth>
          <Router>
            <Switch>
              <PrivateRoute path="/send">
                <Send />
              </PrivateRoute>
              <PrivateRoute path="/send-token/:code" component={SendToken}>
              </PrivateRoute>
              <PrivateRoute path="/settings">
                <Settings />
              </PrivateRoute>
              <Route path="/receive">
                <Receive />
              </Route>
              <PrivateRoute path="/export-key">
                <ExportKey />
              </PrivateRoute>
              <PrivateRoute path="/reveal">
                <Reveal />
              </PrivateRoute>
              <PrivateRoute path="/show-privatekey">
                <ShowPrivatekey />
              </PrivateRoute>
              <PrivateRoute path="/change-password">
                <ChangePassword />
              </PrivateRoute>
              <PrivateRoute path="/security">
                <Security />
              </PrivateRoute>
              <PrivateRoute path="/settings">
                <Settings />
              </PrivateRoute>
              <PrivateRoute path="/accounts">
                <Accounts />
              </PrivateRoute>
              <PrivateRoute path="/add-token">
                <AddCustomToken />
              </PrivateRoute>
              <PrivateRoute path="/import-account">
                <ImportAccount />
              </PrivateRoute>
              <PrivateRoute path="/home">
                <Home />
              </PrivateRoute>
              <PrivateRoute path="/deploy-contract">
                <DeployContract />
              </PrivateRoute>
              <Route path="/activity">
                <Activity/>
              </Route>
              <Route path="/transaction/:hash" component={TransactionDetail}>
              </Route>
              <Route path="/transaction-local/:hash" component={TransactionDetailLocal}>
              </Route>
              <PrivateRoute path="/wallet/:address/:index" component={WalletDetail}>
              </PrivateRoute>
              <Route path="/about-us">
                <AboutUs />
              </Route>
              <Route path="/privacy-policy">
                <PrivacyPolicy />
              </Route>
              <Route path="/terms-of-use">
                <TermsOfUse />
              </Route>
              <Route path="/setup-wallet">
                <SetupWallet />
              </Route>
              <Route path="/create-wallet">
                <CreateWallet />
              </Route>
              <Route path="/import-wallet">
                <ImportWallet />
              </Route>
              <Route path="/signin">
                <Signin />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              {/* new_link */}
              <PrivateRoute path="/swap">
                <Swap />
              </PrivateRoute>
              <PrivateRoute path="/mynft">
                <Nft />
              </PrivateRoute>
              <PrivateRoute path="/buysell">
                <Buysell />
              </PrivateRoute>
              <PrivateRoute path="/token-detail/:address" component={TokenDetail}>
              </PrivateRoute>
            </Switch>
          </Router>
        </ProvideAuth>
    </ThemeProvider>
  );
}

/** For more details on
 * `AuthContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const AuthContext = React.createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

function useProvideAuth() {

  const [walletAtom] = useRecoilState(currentWallet);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if(walletAtom && walletAtom.address && walletAtom.password && walletAtom.keystore) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [walletAtom]);

  return {
    loggedIn
  };
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;