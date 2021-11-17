import { makeStyles } from "@material-ui/core/styles";
import { ImportantDevices } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flex:1,
        display: 'flex',
        flexDirection: 'column'
    },
    wallettitle: {
        margin: 0,
        fontWeight: 400,
        fontSize: 33,
        lineHeight: 0.98,
        color: 'white',
    },
    warningIcon: {
        width: 30,
        height: 30
    },
    warningMessage: {
        marginLeft: 15, 
        color: 'white', 
        fontSize: 14, 
        fontWeight: 400, 
        lignHeight: '20px'
    },
    form: {
        color: 'white',
        display: 'flex',
        flexDirection: 'column'
    },
    fieldPassword: {
        marginBottom: 10,
    },
    formButton: {
        marginBottom: 10
    },
    copyButton: {
        border: '1px solid red',
        marginBottom: 10
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 18,
        marginTop: 20,
        marginBottom: 10
    },
    secretPhraseSection: {
        display: 'flex',
        flexDirection: 'column'
    },
    privatekey: {
        fontSize: 16,
        border: '1px solid red',
        wordBreak: 'break-word',
        padding: 10,
        marginBottom: 10,
        color: 'white'
    },
    clipboardButton: {
        background: 'transparent',
        border: '1px solid red',
        borderRadius: 10,
        color: 'white',
        padding: 12,
        fontSize: 14,
        fontWeight: 700,
        cursor: 'pointer',
        marginBottom: 10
    }
}));

export default useStyles;
