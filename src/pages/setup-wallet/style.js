import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flex:1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    position: 'relative',
    textAlign: 'left',
    color:'white',
    fontFamily: 'unset',
    fontSize: 35,
    fontWeight: 100,
    lineHeight: '31px',
    letterSpacing: '1px'
  },
  groupbutton: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  linkbtn: {
    marginTop: 12
  },
}));

export default useStyles;
