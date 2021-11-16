import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: -20
  },
  header:{
    marginTop:20,
  },
  deleteBtn: {
    color: '#ff0000',
    marginBottom: 5,
    cursor: 'pointer'
  },
  tokenInfo: {
    marginTop: '10px',
    height: '50px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tokenRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'calc(100% - 45px)',
  },
  tokenLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    color: 'white',
    marginLeft: '5px',
  },
  tokenImg: {
    width: 40, 
    height: 40,
    borderRadius: 12,
    overflow:'hidden',
  }
}));

export default useStyles;
