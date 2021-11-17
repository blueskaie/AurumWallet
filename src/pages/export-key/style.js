import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flex:1,
        display: 'flex',
        flexDirection: 'column'
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
          border: "1px solid #ffffff",
          marginBottom: 10,
          marginTop: 15,
          background: "transparent",
          "&::placeholder": {
            color: "#ffffff",
          },
          "&:focus": {
            border: "1px solid #ffffff",
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
            borderRadius: '12px 0 0 12px',
            '&:focus': {
            outline: 'none',
            background: 'transparent'
        }
    },
    '& button': {
        cursor: 'pointer',
        width: '50px',
        background: '#ffffff',
        border: '1px solid #ccc',
        borderLeft: 'none',
        borderRadius: '0 12px 12px 0',
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
