import React,{ useState } from 'react'
import Layout from "../../components/layout";

import { Box, Icon, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import ARUCard from '../../components/card';
import useStyles from './style';
import ARUButton from '../../components/buttons';
import { ARUBaseInput } from '../../components/fields';
import { allWallets, networkProvider, currentWallet } from '../../store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { encryptKeyStore } from '../../utils/keystore';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ImportAccount() {
  const classes = useStyles( );

  const [privateKey, setPrivateKey] = useState('');
  const web3 = useRecoilValue(networkProvider)
  const [, setWalletAtom] = useRecoilState(allWallets)
  const wallet = useRecoilValue( currentWallet );
  const [helperKeyText, setHelperKeyText] = React.useState('');
  const [openSuccess, setOpenSuccess] = useState(false);

  const importAccount = () => {
    try {
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const keystore = encryptKeyStore(web3, privateKey, wallet.password);
      setWalletAtom((item) => {
        let all = [...item];
        let exist = false;
        for(let i = 0; i < all.length; i++) {
          let si = {...all[i], current: false};
          if (si.address === account.address) {
            exist = true;
            continue;
          }
          all[i] = si;
        }
        if (!exist) {
          const wal = {
            address: account.address,
            mnemonic: wallet.mnemonic,//this is wallet info
            password: wallet.password,//this is wallet info
            keystore: keystore,
            current: true
          };
          setOpenSuccess(true);
          all.push(wal);
        } else {
          setHelperKeyText("This account already exists!");
        }
        return all;
      });
    } catch(error) {
      setHelperKeyText(error.message);
    }
}

  return (
    <Layout isShownWallet={false} isShownBackButton={true} varient="secondary">
      <Box className={classes.root}>
        <Box className={classes.title}>
          Import Account
        </Box>
        <Box className={classes.formWrap}>
          <ARUCard className={classes.alarmCard}>
            <Icon className={classes.checkIcon}>
              <img src="images/warning.svg" alt="AurumWallet"/>
            </Icon>
            <p style={{textAlign: 'left'}}>
              Imported accounts are viewable in your wallet but are not recoverable with your Aurum Secret Recovery Phrase.
            </p>
          </ARUCard>
          <ARUBaseInput
            className={classes.privateKey}
            id="privateKey" 
            value={privateKey}
            onChange={e => setPrivateKey(e.target.value)}
            type="text"
            multiline="true"
            rows="3"
            placeholder="Paste your private key string..."
          />
          <span className={classes.helptext}>{helperKeyText}</span>
          <ARUButton onClick={importAccount} className={classes.buttonImport}>IMPORT</ARUButton>
        </Box>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
          <Alert onClose={() => setOpenSuccess(false)} severity="success">
            Imported successfully
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  )
}