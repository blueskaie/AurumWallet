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
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tokenRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  tokenLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    color: 'white',
    marginLeft: '5px',
  },
  tokenIcon: {
    width:'50px', 
    height: '50px',
    margin: '5px',
  }
}));

export default useStyles;
