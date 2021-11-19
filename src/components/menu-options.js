import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Refresh from '@material-ui/icons/Refresh';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { allWallets, refreshCalled } from '../store/atoms';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  refreshBtn: {
    padding: 0
  },
  menuIcon: {
    width: 60,
    height: 60,
    color: 'white'
  },
  option:{
    background:'black',
    color:'white',
  },
  selectmenu:{
    left: '30px !important',
    maxHeight: ITEM_HEIGHT * 7.5,
    width: 160,
    background:'#222121',
  },
  listItemIcon: {
    minWidth: 50
  },
  menuItemIcon: {
    width: 25,
    height: 25,
    color: 'white'
  },  
  list:{
    background:'#222121',
    color:'white',
    '& li:hover':{
      background:'#1e1d1d'
    }
  }
}));

const KEY_HOME = 0;
const KEY_SWAP = 1;
const KEY_LOGOUT = 2;
const KEY_SEND = 3;
// const KEY_RECEIVE = 2;
// const KEY_REVEAL = 4;
const KEY_ACTIVITY = 5;
const KEY_ACTIVITY_LOCAL = 8;
const KEY_ACCOUNTS = 6;
const WALLET_SECURITY = 7;
// const KEY_SETTINGS = 4;
// const KEY_ABOUT_US = 5;
// const KEY_DEPLOY_CONTRACT = 7;

const options = [
  {id: KEY_HOME, name: 'Wallet', icon: 'wallet.svg'},
  {id: KEY_SWAP, name: 'Swap', icon: 'swap.svg'},
  {id: KEY_SEND, name: 'Send', icon: 'send.svg'},
  // {id: KEY_REVEAL, name: 'Reveal', icon: 'reveal.svg'},
  {id: WALLET_SECURITY, name: 'Security', icon: 'reveal.svg'},
  {id: KEY_ACTIVITY, name: 'Activity', icon: 'activity.svg'},
  {id: KEY_ACTIVITY_LOCAL, name: 'ActivityLocal', icon: 'activity.svg'},
  {id: KEY_ACCOUNTS, name: 'Accounts', icon: 'accounts.svg'},
  {id: KEY_LOGOUT, name: 'Logout', icon: 'logout.svg'}
];

const ITEM_HEIGHT = 48;

export default function MenuOptions({loggedIn}) {
  const history = useHistory();

  const classes = useStyles(useTheme());

  const [refresh, setRefresh] = useRecoilState(refreshCalled);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [,setAllWallets] = useRecoilState(allWallets);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = () => {
    const updR = refresh + 1;
    setRefresh(updR);
  }

  const handleMenuItemClick = (event, {id}) => {
    switch(id) {
      case KEY_HOME:
        history.push('/home');
        break;        
      case KEY_SWAP:
        history.push('/swap');
        break;
      case KEY_SEND:
        history.push('/send');
        break;
      // case KEY_SETTINGS:
      //   history.push('/settings');
      //   break;
      // case KEY_REVEAL:
      //   history.push('/reveal');
      //   break;
      case WALLET_SECURITY:
        history.push('/security');
        break;
      case KEY_ACTIVITY:
        history.push('/activity');
        break;
      case KEY_ACTIVITY_LOCAL:
        history.push('/activity-local');
        break;
        // case KEY_DEPLOY_CONTRACT:
      //   history.push('/deploy-contract');
      //   break;
      // case KEY_ABOUT_US:
      //   history.push('/about-us')
      //   break;
      case KEY_ACCOUNTS:
        history.push('/accounts');
        break;
      case KEY_LOGOUT:
        doLogout();
        break;
      default:
    }
    setAnchorEl(null);
  }

  const doLogout = () => {
    setAllWallets(wallets => {
      const all = [];
      for(let i = 0; i < wallets.length; i++) {
        const {password, ...rest} = wallets[i];
        all.push(rest);
      }
      return all;
    });
  }

  return (
    <>

      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        className={classes.refreshBtn}
        onClick={handleClick}
      >
        <Icon className={classes.menuIcon}>
          <img src="images/Menu icon v2.svg" alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
        </Icon>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
        classes={{paper:classes.selectmenu,list:classes.list}}
        // PaperProps={{
        //   style: {
        //     maxHeight: ITEM_HEIGHT * 4.5,
        //     width: '20ch',
        //     background:'black',
        //     color:'white'
        //   },
        // }}
      >
        {options.map((option) => (
          <MenuItem key={option.id}  onClick={(event) => handleMenuItemClick(event, option)}>
            
            <ListItemIcon className={classes.listItemIcon}>
              <Icon className={classes.menuItemIcon}>
                <img src={`images/${option.icon}`} alt="AurumWallet" className="logo-image" style={{height: '100%'}} />
              </Icon>
            </ListItemIcon>
            <ListItemText primary={option.name} style={{height: '20px'}} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}