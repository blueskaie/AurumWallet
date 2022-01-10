import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    marginTop: -50
  },

  logoImage: {
    width: 140,
    userSelect: 'none'
  },

  authTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    margin: 0,
    userSelect: 'none'
  },

  authSubTitle: {
    userSelect: 'none',
    margin: 0,
    color: 'white'
  },

  form: {
    margin: "40px auto 0 auto",
    width: 220,
    display: "flex",
    flexDirection: "column",
    position:'relative',
    zIndex:3
  },

  formARU: {
    margin: 5,
    marginBottom: 5,
  }
}));

export default useStyles;
