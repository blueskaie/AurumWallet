import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding:theme.spacing(2),
    flex:1,
    display: 'flex',
    flexDirection: 'column'
  },
  header:{
    marginTop:20,
  }
}));

export default useStyles;
