import React from 'react';

import { Box, FormControl, FormHelperText, Icon, Snackbar } from '@material-ui/core'
import Layout from "../../components/layout";

import { useRecoilState, useRecoilValue } from 'recoil';
import { currentWallet, allWallets, networkProvider } from '../../store/atoms';

import {Alert} from '@material-ui/lab';
import { ARUBaseInput } from '../../components/fields';
import ARUButton from '../../components/buttons';
import ARUCard from '../../components/card';
import useStyles from "./style";

export default function ChangePassword() {
  const classes = useStyles( );

  const [passValid, setPassValid] = React.useState(false);
  const [error, setError] = React.useState();
  const [pass, setPass] = React.useState('');
  const [repass, setRePass] = React.useState('');
  const [helperText, setHelperText] = React.useState('');

  const wallet = useRecoilValue(currentWallet);
  const [, setWalletAtom] = useRecoilState(allWallets);

  const [checking, setChecking] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if(wallet.password !== pass) {
      setError(true);
      setHelperText('Invalid password');
      setPassValid(false);
      return false;
    }

    setError(false);
    setHelperText('');
    setPassValid(true);
    setPass('');

    return false;
  }

  const onChangePassword = () => {
    if (!pass || pass.length < 8) {
      setHelperText('Please enter more than 8 character.');
      return false;
    } else {
      if (pass !== repass) {
        setHelperText('Invalid confirm password.');
        return false;
      }
    }

    if (!checking) {
      setHelperText('Please check agreement.');
      return false;
    }

    setWalletAtom((items) => {
      const all = [...items];
      for(let i = 0; i < all.length; i++) {
        let si = {...all[i], password: pass};
        all[i] = si;
      }
      return all;
    });

    setHelperText("");
    setOpenSuccess(true);

    return false;
  }

  return (
    <Layout isShownWallet={false} isShownBackButton={true} varient='secondary'>
      <Box className={classes.root}>
        <h1 className={classes.wallettitle}>
          <Box>Change</Box>
          <Box>Password</Box>
        </h1>
        {
          !passValid 
          ? <form method="post" autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
            <ARUCard className={classes.card}>
              <Icon className={classes.warningIcon}>
                <img src="images/warning.svg" alt="AurumWallet" className="warning-image" style={{height: '100%'}} />
              </Icon>
              <Box className={classes.warningMessage}>
                Before continuing please confirm your current password.
              </Box>
            </ARUCard>
            <FormControl className={classes.fieldPassword} error={error}>
              <ARUBaseInput id="password" value={pass} onChange={e => setPass(e.target.value)}
                type="password" placeholder="Password"/>
              <FormHelperText>
                {helperText}
              </FormHelperText>
            </FormControl>
            <ARUButton className={classes.formButton} type='submit'>CONFIRM</ARUButton>
          </form>
          :<Box className={classes.secretPhraseSection}>
            <ARUCard className={classes.card}>
              <Icon className={classes.warningIcon}>
                <img src="images/warning.svg" alt="AurumWallet" className="warning-image" style={{height: '100%'}} />
              </Icon>
              <Box className={classes.warningMessage}>
                Choose a strong password. If you lose this password you will need to use your Recovery Phrase to re-import your wallet.
              </Box>
            </ARUCard>
            <FormControl className={classes.fieldPassword} error={error}>
              <ARUBaseInput id="password" value={pass} onChange={e => setPass(e.target.value)}
                type="password" placeholder="New Password"/>
            </FormControl>
            <FormControl className={classes.fieldPassword} error={error}>
              <ARUBaseInput id="repassword" value={repass} onChange={e => setRePass(e.target.value)}
                type="password" placeholder="Confirm Password"/>
              <FormHelperText style={{fontSize: 14, color: 'white'}}>
                {helperText}
              </FormHelperText>
            </FormControl>
            <ARUCard className={classes.alarmCard} onClick={() => setChecking(!checking)}>
              {!checking && <Icon className={classes.checkIcon}>
                <img src="images/unchecked-circle.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
              </Icon>}
              {checking && <Icon className={classes.checkIcon}>
                <img src="images/checked-circle.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
              </Icon>}
              <p>I understand that Aurum cannot recover this password.</p>
            </ARUCard>
            <ARUButton className={classes.formButton} onClick={onChangePassword}>RESET PASSWORD</ARUButton>
          </Box>
        }
      </Box>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity="success">
          Change password successfully!
        </Alert>
      </Snackbar>
    </Layout>
  )
}