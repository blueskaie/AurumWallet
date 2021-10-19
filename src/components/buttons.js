import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export const ARUButton = withStyles((theme) => ({
  root: {
    background: 'transparent',
    boxShadow: '0px 3px 3px #000000c2',
    color: 'white', 
    border: '1px solid #bbbbbb',
    borderRadius: 5,
    height: 40
  },
}))(Button);