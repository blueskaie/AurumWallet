import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flex:1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    position: 'relative',
    marginTop: -20,
    textAlign: 'left',
    color:'white',
    fontFamily: 'unset',
    fontSize: 33,
    fontWeight: 100,
    lineHeight: '31px',
    fontWeight: '100',
    letterSpacing: '1px'
  },
}));

export default useStyles;
