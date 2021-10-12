import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export const ARUButton = withStyles((theme) => ({
  root: {
    background: '#ffffff',
    boxShadow: '0px 3px 3px #000000c2',
    color: '#000000', 
    borderRadius: 8,
    height: 40
  },
}))(Button);