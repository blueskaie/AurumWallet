
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding:theme.spacing(2),
    display:'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 104px)',
    marginTop:30,
  },
  header:{
    marginTop:20,
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  formWrap: {
    flex: 1,
  },
  form: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  textfield:{
    
    '& label':{
      color:'white',
      "&.Mui-focused":{
        color: 'white',
      }
    },
    
    "& div":{
      "&:hover::before":{
       borderBottom:'1px solid white!important',
      },
      "&::before":{
        borderBottom:'1px solid white'
      },
      "&::after":{
        borderBottom:'1px solid white'
      },
    },
    '& input':{
      color:'white',
      
    }
  },
  formButton: {
    marginBottom: theme.spacing(2)
  },
  fullWidth: {
    width: '100%'
  }
}));

export default useStyles;