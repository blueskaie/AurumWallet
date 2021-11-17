import { makeStyles } from "@material-ui/core/styles";

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
        flexDirection: 'column',
        paddingTop: 10
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
        marginBottom: 10
    },
    secretPhraseSection: {
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'column'
    },
    secretPhrase: {
        border: '1px solid red',
        marginBottom: 10,
        borderRadius: 8,
        padding: 12,
        color: 'white',
        fontSize: 14
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
    },
    alarmCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        "& p": {
            margin: '0 0 0 12px',
            color: '#ffffff',
            fontSize: 14,
            lineHeight: '18px'
        }
    },
    circleIcon: {
        width: 26,
        height: 18,
        borderRadius: 15,
        margin: 3,
        border: '3px solid white',
    },
    checkIcon: {
        width: 30,
        height: 30
    },
}));

export default useStyles;
