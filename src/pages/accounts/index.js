import React from "react";
import { ethers } from 'ethers';
import { useTheme, Box, Icon, IconButton } from "@material-ui/core";
import ScrollContainer from "react-indiana-drag-scroll";
import { networkProvider, currentWallet, allWallets } from "../../store/atoms";
import Layout from "../../components/layout";
import AccountList from "./account-list";
import { useRecoilState, useRecoilValue } from "recoil";
import useStyles from "./style";
import { encryptKeyStore } from '../../utils/keystore';

export default function Accounts() {
  const classes = useStyles(useTheme());

  const wallet = useRecoilValue( currentWallet );
  const provider = useRecoilValue(networkProvider);
  const [showAccountInfo, setToggleAccountInfo] = React.useState(true);

  const [walletList, setWalletAtom] = useRecoilState(allWallets);

  const createAccount = () => { 

    const idx = walletList ? walletList.length : 0;
    let path = `m/44'/60'/${idx}'/0/0`;
    let account = ethers.Wallet.fromMnemonic(wallet.mnemonic, path);
    // const account = provider.eth.accounts.create();
    const keystore = encryptKeyStore(provider,  account.privateKey, wallet.password);

    setWalletAtom((items) => {
      const all = [...items];
      for(let i = 0; i < all.length; i++) {
        let si = {...all[i], current: false};
        all[i] = si;
      }
      all.push({
        address: account.address,
        password: wallet.password,
        mnemonic: wallet.mnemonic,
        keystore: keystore,
        current: true
      })
      return all;
    });
  };

  const onSelectWallet = (wallet) => {
    setWalletAtom((current) => {
      const all = [...current];
      for(let i = 0; i < all.length; i++) {
        let si = {...all[i]};
        if (wallet.address == all[i].address) {
          si = {...si, current: true};
        } else {
          si = {...si, current: false};
        }
        all[i] = si;
      }
      return all;
    });
  };

  const clicked = (showAccountInfo) => () => {
    setToggleAccountInfo(showAccountInfo)
  }
  return (
    <Layout isShownWallet = {false} varient = 'secondary'>
      <Box className={classes.root}>
        <Box className={classes.myaccount}>
          <Box className={classes.title}>
            <Box className={classes.description}>
              <h3>Accounts</h3>
              <IconButton
                className={classes.toggleButton}
                onClick={clicked(!showAccountInfo)}
              >
                <Icon className={classes.eyeIcon}>
                {
                  showAccountInfo 
                    ?<img src="images/hide.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
                    :<img src="images/show.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
                }
                </Icon>
              </IconButton>
            </Box>
            <p onClick={createAccount} style={{color: 'white', cursor: 'pointer'}}>Create Account</p>
            </Box>
          <ScrollContainer className={classes.accountlist} vertical={true}>
            <React.Suspense fallback={<Box>Loading...</Box>}>
              <AccountList
                list={walletList}
                onSelectWallet={onSelectWallet}
                showAccountInfo={showAccountInfo}
              />
            </React.Suspense>
          </ScrollContainer>
        </Box>
      </Box>
    </Layout>
  );
}
