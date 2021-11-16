import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flex:1,
        display: 'flex',
        flexDirection: 'column'
    },

    title: {
        position: 'relative',
        marginTop: -20,
        marginBottom: 20,
        textAlign: 'left',
        color:'white',
        fontFamily: 'Montserrat',
        fontSize: 33,
        fontWeight: 100,
        lineHeight: '31px',
        letterSpacing: '1px'
    },

    detail: {
        padding: 20,
        marginBottom: 10
    },

    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },

    icon: {
        padding: 0
    },

    infoIcon: {
        width: 28,
        height: 28,
    },

    label: {
        color: '#ffffff',
        fontSize: 14
    },

    value: {
        color: '#999',
        fontSize: 14
    },

    amount: {
        fontSize: 16,
        textAlign: 'right',
        paddingLeft: 15,
        width: '60%'
    },
}));

export default useStyles;
