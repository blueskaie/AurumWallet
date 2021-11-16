
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    display:'flex',
    flexDirection: 'column',
    marginTop:30,
  },
  title: {
    position: 'relative',
    marginTop: -20,
    textAlign: 'left',
    color:'white',
    fontFamily: 'Montserrat',
    fontSize: 33,
    fontWeight: 100,
    lineHeight: '31px',
    fontWeight: '100',
    letterSpacing: '1px'
  },
  formWrap: {
    marginTop: 50
  },
  form: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  formControl: {
    marginBottom: '10px',
  },
  formButton: {
    marginBottom: '10px'
  },
  fullWidth: {
    width: '100%'
  }
}));

export default useStyles;