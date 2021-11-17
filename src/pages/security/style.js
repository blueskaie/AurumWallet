import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flex:1,
        display: 'flex',
        flexDirection: 'column'
    },
    wallettitle: {
        marginBottom: '45px',
        fontWeight: 300,
        fontSize: 33,
        lineHeight: 0.98,
        color: 'white',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 18,
        marginBottom: 10,
        color: 'white',
        fontSize: 20,
        cursor: 'pointer'
    },
}));

export default useStyles;
