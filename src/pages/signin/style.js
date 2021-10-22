import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    marginTop: -50
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
