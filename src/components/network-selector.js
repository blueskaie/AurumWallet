import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Networks from '../config/networks'

import Select from '@material-ui/core/Select';
import { useRecoilState } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import { selectedNetworkId } from '../store/atoms';


const useStyles = makeStyles((theme) => ({
  menuItem: {
    '& img': {
      width: theme.spacing(2),
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1)
    },
    display:'flex',
    justifyContent:'space-between',
    '&.Mui-selected':{
      background:'black',
      '&:hover':{
        background:'#2d2d2d',
      }
    }
  },
  select: {
    padding:'3px 10px',
    border: '1px solid #777777',
    borderRadius:20,
    fontSize: 14,
    "&:hover:before":{
      borderBottom:'2px solid transparent!important',
    },
    "&:before":{
      borderBottomColor:'transparent',
    },
    "&:after":{
      borderBottomColor:'transparent',
    },
    '& .MuiSelect-root': {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(0),
      color:'#777777',
        },
    '& img': {
      width: theme.spacing(2),
      
      marginLeft: theme.spacing(1)
    },
    "& > div":{
      width:123,
      display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight:'0px!important',
    },
    "& svg":{
      display:'none',
    }
  },
  list:{
    backgroundColor:'#17191e',
    color:'#777777',
    '& li:hover':{
      background:'#2d2d2d'
    }
  },
  paper:{
    backgroundColor:'#17191e',

  }

}));


export default function NetworkSelector({className}) {

  const classes = useStyles();
  const [network, setNetwork] = useRecoilState(selectedNetworkId)

  const handleChange = (event) => {
    setNetwork(event.target.value);
  };

  return (
    <Select
      value={network}
      onChange={handleChange}
      className={classes.select}
      MenuProps={{
        anchorOrigin: {
          vertical: 35,
          horizontal: -5
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left"
        },
        getContentAnchorEl: null,
        classes: { list: classes.list, paper:classes.paper }
      }}
    >
      {Networks.map((option) => (
        <MenuItem value={option.id} key={option.id} className={classes.menuItem}>
          {option.name}
          <img src={option.icon} alt={option.name} />
        </MenuItem>
      ))}
    </Select>
  )
}