import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: (props) => props.mode === 'filled' ? '#ffffff' : '#161616',
    color: (props) => props.mode === 'filled' ? '#000000' : '#ffffff',
    boxShadow: '0px 3px 3px #000000c2',
    border: '1px solid #ffffff',
    borderRadius: 12,
    minHeight: 40,
    fontSize: 16,
    textTransform: 'none',
    '&:hover': {
      background: (props) => props.mode === 'filled' ? '#ffffff' : '#161616',
      color: (props) => props.mode === 'filled' ? '#000000' : '#ffffff',
  }
  }
});

const ARUButton = (props) => {
  const classes = useStyles(props);

  return (
    <Button className={`${classes.root} ${props.className}`} type={props.type} onClick={props.onClick}>{props.children}</Button>
  );
};

ARUButton.defaultProps = {
  mode: 'filled',
  variant: 'contained',
  children: 'Button'
}

export default ARUButton;