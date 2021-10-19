import React from 'react';

import { Box, Container, Typography, FormControl, TextField, FormHelperText, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { decryptKeyStore } from '../../utils/keystore';
import Layout from "../../components/layout";

import { useRecoilValue } from 'recoil';
import { currentWallet, networkProvider } from '../../store/atoms';

import {Alert} from '@material-ui/lab';
import Clipboard from 'react-clipboard.js';
import { useHistory } from 'react-router-dom';
import ARUCard from '../../components/card';

import useStyles from "./style";

export default function ExportKey() {
  const classes = useStyles( );

  const [passValid, setPassValid] = React.useState(1);
  const [error, setError] = React.useState();
  const [pass, setPass] = React.useState('');
  const [helperText, setHelperText] = React.useState('');
  const [privateKey, setPrivateKey] = React.useState('');

  const wallet = useRecoilValue(currentWallet);
  const provider = useRecoilValue(networkProvider);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    if(wallet.password !== pass) {
      setError(true);
      setHelperText('Invalid password');
      setPassValid(1);
      return false;
    }

    setError(false);
    setHelperText('');
    
    try {
      const {privateKey} = decryptKeyStore(provider, wallet.keystore, wallet.password)
      setPrivateKey(privateKey);
      setPassValid(2);
      
      return false;
    } catch(e) {
      console.error(e);
      setPassValid(1);
      setHelperText('Unable to decrypt keystore');
      setError(true);
    }
    

    return false;
  }

  const copyConfirmed = (event) => {
    event.preventDefault();
  
    history.push('/');

    return false;
  }

  const confirmPhrase = (val) => {
    setPassValid(val);
  }

  return (<Layout isNarrowMargin={true} isShownBackButton={true} isShownWallet={false} isShownNetworkSelector={false} varient="secondary">
      <Box className={classes.root}>
        {
        passValid === 1 && 
          <form method="post" autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
            
            <Typography as="body1" style={{fontSize: '30px'}}>
              Confirm <br/> Password
            </Typography>

            <FormControl className={classes.fieldPassword} error={error}>
              <TextField id="password" value={pass} onChange={e => setPass(e.target.value)}
                aria-describedby="password_helper" type="password" placeholder="Password"
                InputProps={{ disableUnderline: true }}
              />
              <FormHelperText>
                {helperText}
              </FormHelperText>
            </FormControl>

            <Button variant="contained" color="primary" type="submit" className={classes.formButton} style={{background: 'white', color: 'black', borderRadius: '5px'}}>CONFIRM PASSWORD</Button>
          </form>
        }

        {
          passValid === 2 && 
          <Box className={classes.flexBox}>
            <Box as="body1" style={{fontSize: '30px', color: 'white', marginBottom: '30px'}}>
              <Box>Secure</Box>
              <Box>Wallet</Box>
            </Box>
            <Alert severity="error" className={classes.important}>
              <span style={{color: 'white'}}>This is your Secret Recovery Phrase. Write it down and keep it in a safe place. You'll be asked to re-enter this phrase in the next step - in the same order.</span>
            </Alert>

            <Box className={classes.copyGroup}>
              <ARUCard style={{border: '1px solid red', background: '#222222', color: 'white', height: '70px'}}>
                <span style={{padding: '0 10px', width: '90%', height: '100%', display: 'flex', wordBreak: 'break-word', textAlign: 'center', alignItems: 'center'}}>
                  {privateKey}
                </span>
              </ARUCard>
              <ARUCard style={{border: '1px solid red', marginTop: '15px', background: '#222222', color: 'white', height: '40px'}}>
                <Button variant="contained" color="primary" onClick={() => confirmPhrase(3)} style={{width: '100%', height: '100%', background: 'transparent', color: 'white', border: 'none', outline: 'none'}}>
                  View my Secret Recovery Phrase
                </Button>
              </ARUCard>
            </Box>

            <Button variant="contained" color="primary" onClick={copyConfirmed} style={{background: 'white', color: 'black', borderRadius: '5px', marginTop: '15px'}}>I WROTE DOWN MY PHRASE</Button>
          </Box>
        }

        {
          passValid === 3 && 
          <Box className={classes.flexBox} style={{marginTop: '20px'}}>
            <Box as="body1" style={{fontSize: '30px', color: 'white', marginBottom: '20px'}}>
              <Box>Confirm</Box>
              <Box>Recovery Phrase</Box>
            </Box>

            <Box className={classes.copyGroup}>
              <ARUCard style={{border: '1px solid white', background: 'transparent', color: 'white', height: '60px'}}>
                <span style={{padding: '0 10px', width: '90%', height: '100%', display: 'flex', wordBreak: 'break-word', textAlign: 'center', alignItems: 'center'}}>
                  {privateKey}
                </span>
              </ARUCard>
              <ARUCard style={{marginTop: '15px', background: '#222222', color: '#555555', height: '70px'}}>
                <span style={{padding: '0 15px', width: '90%', height: '100%', fontSize: '14px', display: 'flex', alignItems: 'center'}}>
                  Select each word in the same order that you previously wrote down.
                </span>
              </ARUCard>
              <Box style={{marginTop: '15px', display: 'flex', flexDirection: 'column'}}>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                  <Button onClick={copyConfirmed} style={{marginBottom: '5px', borderRadius: '5px', background: 'transparent', width: '100%', color: 'white', border: '1px solid white'}}>
                    leopard
                  </Button>
                  <Button onClick={copyConfirmed} style={{marginBottom: '5px', borderRadius: '5px', background: 'transparent',marginLeft: '10px', width: '100%', color: 'white', border: '1px solid white'}}>
                    must
                  </Button>
                  <Button onClick={copyConfirmed} style={{marginBottom: '5px', borderRadius: '5px', background: 'transparent',marginLeft: '10px', width: '100%', color: 'white', border: '1px solid white'}}>
                    family
                  </Button>
                </Box>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                  <Button onClick={copyConfirmed} style={{marginBottom: '5px', borderRadius: '5px', background: 'transparent', width: '100%', color: 'white', border: '1px solid white'}}>
                    cave
                  </Button>
                  <Button onClick={copyConfirmed} style={{marginBottom: '5px', borderRadius: '5px', background: 'transparent',marginLeft: '10px', width: '100%', color: 'white', border: '1px solid white'}}>
                    buzz
                  </Button>
                  <Button onClick={copyConfirmed} style={{marginBottom: '5px', borderRadius: '5px', background: 'transparent',marginLeft: '10px', width: '100%', color: 'white', border: '1px solid white'}}>
                    convince
                  </Button>
                </Box>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                  <Button onClick={copyConfirmed} style={{marginBottom: '5px', borderRadius: '5px', background: 'transparent', width: '100%', color: 'white', border: '1px solid white'}}>
                    resemble
                  </Button>
                  <Button onClick={copyConfirmed} style={{marginBottom: '5px', borderRadius: '5px', background: 'transparent',marginLeft: '10px', width: '100%', color: 'white', border: '1px solid white'}}>
                    parrot
                  </Button>
                  <Button onClick={copyConfirmed} style={{marginBottom: '5px', borderRadius: '5px', background: 'transparent',marginLeft: '10px', width: '100%', color: 'white', border: '1px solid white'}}>
                    asthma
                  </Button>
                </Box>
                <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                  <Button onClick={copyConfirmed} style={{marginBottom: '5px', borderRadius: '5px', background: 'transparent', width: '100%', color: 'white', border: '1px solid white'}}>
                    option
                  </Button>
                  <Button onClick={copyConfirmed} style={{marginBottom: '5px', borderRadius: '5px', background: 'transparent',marginLeft: '10px', width: '100%', color: 'white', border: '1px solid white'}}>
                    thrive
                  </Button>
                  <Button onClick={copyConfirmed} style={{marginBottom: '5px', borderRadius: '5px', background: 'transparent',marginLeft: '10px', width: '100%', color: 'white', border: '1px solid white'}}>
                    game
                  </Button>
                </Box>
              </Box>
            </Box>

            <Button variant="contained" color="primary" onClick={() => confirmPhrase(4)} style={{background: 'white', color: 'black', borderRadius: '5px', marginTop: '15px'}}>
              CREATE WALLET
            </Button>
          </Box>
        }

        {
          passValid === 4 && 
          <Box className={classes.flexBox}>
            <Box as="body1" style={{fontSize: '30px', color: 'white', marginBottom: '30px'}}>
              <Box>Secure</Box>
              <Box>Wallet</Box>
            </Box>
            <Alert severity="error" className={classes.important}>
              <span style={{color: 'white'}}>This is your Secret Recovery Phrase. Write it down and keep it in a safe place. You'll be asked to re-enter this phrase in the next step - in the same order.</span>
            </Alert>

            <Box className={classes.copyGroup}>
              {/* <textarea type="text" rows="3" readOnly value={privateKey} style={{border: '1px solid red'}}></textarea>
              <Clipboard component="button" button-href="#" data-clipboard-text={privateKey}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="icon"><path d="M6 6V2c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h4zm2 0h4a2 2 0 0 1 2 2v4h4V2H8v4zM2 8v10h10V8H2z"/></svg>
              </Clipboard> */}
              <ARUCard style={{border: '1px solid red', background: '#222222', color: 'white', height: '70px'}}>
                <span style={{padding: '0 10px', width: '90%', height: '100%', display: 'flex', wordBreak: 'break-word', textAlign: 'center', alignItems: 'center'}}>
                  {privateKey}
                </span>
              </ARUCard>
              <ARUCard style={{border: '1px solid red', marginTop: '15px', background: '#222222', color: 'white', height: '40px'}}>
                <Button variant="contained" color="primary" style={{width: '100%', height: '100%', background: 'transparent', color: 'white', border: 'none', outline: 'none'}}>
                  View my Secret Recovery Phrase
                </Button>
              </ARUCard>
            </Box>

            {/* <Box className={classes.keyInfo}>
              <p><strong>Do not lose it!</strong> It can't be recovered if you lose it.</p>
              <p><strong>Do not share it!</strong> Your funds will be stolen if you use it on a malicious site.</p>
              <p><strong>Make a backup!</strong> Just in case your laptop is set on fire.</p>
            </Box> */}
            <Button variant="contained" color="primary" onClick={copyConfirmed} style={{background: 'white', color: 'black', borderRadius: '5px', marginTop: '15px'}}>I WROTE DOWN MY PHRASE</Button>
          </Box>
        }
      </Box>
  </Layout>)
}