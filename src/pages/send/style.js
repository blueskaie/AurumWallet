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
    letterSpacing: '1px'
  },
  searchInput: {
    marginTop: 40,
  },
  tokenList: {
    marginTop: 10,
    height: 315,
    overflowY: 'auto',
    /* width */
    // "&::-webkit-scrollbar": {
    //   width: 10
    // },

    // /* Track */
    // "&::-webkit-scrollbar-track": {
    //   boxShadow: 'inset 0 0 5px grey', 
    //   borderRadius: 5
    // },
    
    // /* Handle */
    // "&::-webkit-scrollbar-thumb": {
    //   background: '#ffffff', 
    //   borderRadius: 5
    // },

    // /* Handle on hover */
    // "&::-webkit-scrollbar-thumb:hover": {
    //   background: "#f1f1f1"

    // }
  }
}));

export default useStyles;
