import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: (props) => props.varient === 'primary' ? '#ffffff' : 'transparent',
    color: (props) => props.varient === 'primary' ? '#000000' : '#ffffff',
    boxShadow: '0px 3px 3px #000000c2',
    border: '1px solid #bbbbbb',
    borderRadius: 8,
    height: 40,
    fontSize: 16,
  }
});

const ARUButton = (props) => {
  const classes = useStyles(props);

  return (
    <Button className={`${classes.root} ${props.className}`} type={props.type} onClick={props.onClick}>{props.children}</Button>
  );
};

ARUButton.defaultProps = {
  varient: 'primary',
  children: 'Button'
}

export default ARUButton;