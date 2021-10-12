import { withStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

const ARUCard = withStyles((theme) => ({
  root: {
    background: '#1e1d1d',
    boxShadow: '0px 3px 3px #000000c2',
    borderRadius: 8,
  },
}))(Card);

export default ARUCard;