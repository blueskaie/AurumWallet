import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    background: (props) => props.bgcolor === 'transparent'? 'transparent' : 'white',
    color: (props) => props.color === 'white'? 'white' : 'black',
    boxShadow: '0px 3px 3px #000000c2',
    border: '1px solid #bbbbbb',
    borderRadius: 5,
    height: 40,
    fontSize: 16,
    margin: '16px',
    marginBottom: '8px',
    padding: (props) => !props.padding? '' : '30px',
    margin: (props) => (!props.margin)? '16px' : props.margin
  }
});

const CustomButton = (props) => {
  const classes = useStyles(props);
  const history = useHistory();

  return (
    <Button className={classes.root} type={props.type} onClick={() => history.push(props.event)}>{props.caption}</Button>
  );
};

export default CustomButton;