import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flex:1,
        display: 'flex',
        flexDirection: 'column'
    },
    wallettitle: {
        fontWeight: "500",
        fontSize: 33,
        lineHeight: 0.98,
        color: 'white',
    },
    form: {
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(2)
    },
    fieldPassword: {
        marginBottom: theme.spacing(1),
    },
    formButton: {
        marginBottom: theme.spacing(2)
    },
    copyButton: {
        border: '1px solid red',
        marginBottom: theme.spacing(2)
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 24,
        marginBottom: theme.spacing(2)
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
        background: '#ffffff',
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
