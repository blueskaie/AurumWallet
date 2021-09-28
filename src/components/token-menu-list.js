import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { useRecoilValue } from 'recoil';
import { precisionFormat } from '../utils/format-utils'

import { tokenList } from '../store/atoms'

export default function TokenMenuItems({value, setValue}) {
  const classes = useStyles();

  const tokenListItems = useRecoilValue(tokenList);

  const handleSetValue = (e) => {
    let [selected] = tokenListItems;

    for( let i = 0; i < tokenListItems.length; i++) {
      const single = tokenListItems[i];
      if(single.code === e.target.value) {
        selected = single;
      }
    }
    setValue(val => {
      return {...val, token: selected};
    })
  }

  return (
    <Select id="token" value={value.code} label="Token"
      onChange={handleSetValue}
      className={classes.select}
      MenuProps={{
        anchorOrigin: {
          vertical: 40,
          horizontal: -5
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left"
        },
        getContentAnchorEl: null,
        classes: { list: classes.list, paper:classes.paper, root:classes.select }
      }}>
    {tokenListItems.map((item) => {
      return <MenuItem key={item.code} value={item.code}>{precisionFormat(item.decimals)(item.balance)} {item.code}</MenuItem>
    })}
  </Select>)
}

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
    padding:'5px 5px',
    border: '1px solid #9c9c9c',
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
      color:'white',
        },
    '& img': {
      width: theme.spacing(2),

      marginLeft: theme.spacing(1)
    },
    '& .MuiSelect-icon':{
      color: '#9c9c9c',
    }

  },
  list:{
    backgroundColor:'#17191e',
    color:'white',
    '& li:hover':{
      background:'#2d2d2d'
    }
  },
  paper:{
    backgroundColor:'#17191e',

  }

}));
