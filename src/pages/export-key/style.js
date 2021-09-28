import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding:theme.spacing(2),
        flex:1,
        display: 'flex',
        flexDirection: 'column'
    },
    header:{
        marginTop:20,
    },
    form: {
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(2)
    },
    fieldPassword: {
        // marginTop: theme.spacing(2),
        // color: 'white'
        marginTop: theme.spacing(2),
        "& input": {
          padding: "12px 10px",
          color: "white",
          border: "1px solid #9c9c9c",
          marginBottom: 10,
          marginTop: 15,
          background: "transparent",
          "&::placeholder": {
            color: "#9c9c9c",
          },
          "&:focus": {
            border: "1px solid #9c9c9c",
          },
          "&::before":{
            display:'none',
          }
        },
    },
    formButton: {
        marginTop: theme.spacing(2)
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'column'
    },
    important: {
        marginBottom: theme.spacing(2)
    },
    copyGroup: {
        display: 'flex',
        '& textarea': {
            width: '100%',
            border: '1px solid #ffffff',
            borderRight: 'none',
            background: '#fafafa',
            borderRadius: '2px 0 0 2px',
            '&:focus': {
            outline: 'none',
            background: 'transparent'
        }
    },
    '& button': {
        cursor: 'pointer',
        width: '50px',
        background: '#f1f1f1',
        border: '1px solid #ccc',
        borderLeft: 'none',
        borderRadius: '0 2px 2px 0',
        '& svg': {
            width: '15px'
        }
    }
    },
    keyInfo: {
        textAlign: 'left',
        color: '#ffffff'
    }
}));

export default useStyles;
