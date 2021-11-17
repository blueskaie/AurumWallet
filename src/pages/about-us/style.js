import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.8em'
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: '#333333',
        borderRadius: 5,
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'white',
        borderRadius: 5,
        width: 10,
        outline: '1px solid slategrey'
      }
    },
    root: {
      flex:1,
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      position: 'relative',
      marginTop: -20,
      marginBottom: 20,
      textAlign: 'left',
      color:'white',
      fontFamily: 'Montserrat',
      fontSize: 33,
      fontWeight: 400,
      lineHeight: '31px',
      letterSpacing: '1px'
    },
    links: {
      marginTop: 30
    },
    subtitle: {
      position: 'relative',
      marginTop: -20,
      marginBottom: 20,
      textAlign: 'left',
      color:'white',
      fontFamily: 'Montserrat',
      fontSize: 33,
      fontWeight: 400,
      lineHeight: '31px',
      letterSpacing: '1px'
    },
    card: {
      padding: 20,
      marginTop: 10,
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
      cursor: 'pointer',
    },
    content: {
      padding: 20,
      marginTop: 10,
      color: 'white',
      fontSize: 14,
      height: 370,
      '& div': {
  
      }
    }
}));

export default useStyles;
