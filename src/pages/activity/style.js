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
    fontFamily: 'Montserrat',
    fontSize: 33,
    fontWeight: 400,
    lineHeight: '31px',
    letterSpacing: '1px',
  },
  transactions: {
    marginTop: 15
  }
}));

export default useStyles;
