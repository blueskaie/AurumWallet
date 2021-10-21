import { withStyles } from '@material-ui/core/styles';
import { InputBase, OutlinedInput } from '@material-ui/core';

export const ARUBaseInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: '#161616',
    border: '1px solid #ffffff',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    color: '#ffffff',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `#ffffff 0 0 0 1px`,
      borderColor: '#ffffff',
    },
  },
}))(InputBase);

export const ARUBaseTextArea = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: '#161616',
    border: '1px solid #ffffff',
    fontSize: 16,
    width: '100%',
    height: '70px',
    padding: '10px 12px',
    color: '#ffffff',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `#ffffff 0 0 0 1px`,
      borderColor: '#ffffff',
    },
  },
}))(InputBase);

export const ARUOutlinedInput = withStyles({
    root: {
        color: '#ffffff',
        "& $notchedOutline": {
            borderColor: "#ffffff"
        },
        "&$focused $notchedOutline": {
            borderColor: "#ffffff"
        }
    },
    input: {
        height: 12
    },
    notchedOutline: {
        borderColor: "red",
        borderRadius: 8
    },
    focused: {}
})(OutlinedInput);
