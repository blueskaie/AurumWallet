import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: '#1e1d1d',
    boxShadow: '0px 3px 3px #000000c2',
    borderRadius: 8,
  }
});

const ARUCard = (props) => {
  const classes = useStyles(props);

  return (
    <Card className={`${classes.root} ${props.className}`} onClick={props.onClick}>{props.children}</Card>
  );
};

export default ARUCard;