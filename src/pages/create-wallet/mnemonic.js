import React from 'react'

import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    marginTop: 6
  },
  button: {
    border: '1px solid white',
    borderRadius: 12,
    color: 'white',
    background: '#161616',
    width: '100%',
    height: 30,
    textTransform: 'none',
    '&:hover': {
        background: '#161616'
    }
  }
});

const ARUMnemonic = (props) => {
  const classes = useStyles(props);
  const [selectedWords, setSelectedWords] = React.useState([]);

  const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const clickWord = (e) => {
    const word = e.target.innerText;
    const index = selectedWords.findIndex(item=>word==item);
    if (index > -1) {
        selectedWords.splice(index, 1);
        e.target.style.color='white';
    } else {
        selectedWords.push(word);
        e.target.style.color='gray';
    }
    setSelectedWords(selectedWords);

    if(props.onChange) {
        props.onChange(selectedWords.join(' '))
    }
  }

  const mnemonicArray = React.useMemo(()=>{
    return props.mnemonic ? shuffle(props.mnemonic.split(" ")): [];
  }, props.mnemonic);
  
  return (
    <Grid className={classes.root} container spacing={1}>
    {mnemonicArray.map((word, index)=>{ 
        const selected =selectedWords.findIndex(item=>word==item) > -1;
        console.log('selected', selected);
        return <Grid item xs={4} key={index.toString()}>
            <Button
                className={classes.button}
                varient='contained'
                onClick={clickWord}
                style={{color: selected ? 'gray' : 'white'}}
            >
                {word}
            </Button>
        </Grid>})}
    </Grid>
  );
};

export default ARUMnemonic;