import React from 'react';
import { Box, Icon, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function ARUNumberInput(props) {
  const { label, value, onChange} = props;
  const classes = useStyles();

  const onDecreasement = () => {
    if (value, onChange) {
      onChange(parseInt(value) - 1);
    }
  }

  const onIncreasement = () => {
    if (value, onChange) {
      onChange(parseInt(value) + 1);
    }
  }
  return (
      <Box className={classes.root}>
        <Box className={classes.label}>
          {label}
        </Box>
        <Box className={classes.input}>
          <Box>
            <IconButton className={classes.button} onClick={onDecreasement}>
              <Icon className={classes.icon}>
                <img src="images/minus.svg" alt="AurumWallet" style={{height: '100%'}} />
              </Icon>
            </IconButton>
          </Box>
          <Box style={{fontSize: 14}}>{value}</Box>
          <Box>
            <IconButton className={classes.button} onClick={onIncreasement}>
              <Icon className={classes.icon}>
                <img src="images/plus.svg" alt="AurumWallet" style={{height: '100%'}} />
              </Icon>
            </IconButton>
          </Box>
        </Box>
      </Box>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 12,
    color: 'white',
    border: '1px solid #ffffff',
    borderRadius: 6,
    fontSize: 12
  },
  label: {
    width: 70
  },
  input: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'calc(100% - 70px)'
  },
  button: {
    padding: 0
  },
  icon: {
    marginLeft: 10,
    width: 25
  }
}));