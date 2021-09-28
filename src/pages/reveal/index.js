import * as React from "react";
// get our fontawesome imports
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import useStyles from "./style";

const Reveal = () => {
  const classes = useStyles();
  const history = useHistory();
  const goWallet = ()=>{
    console.log('goto Create');
    history.push('/createwallet');
  }
  
  return (
    <div className={classes.root}>
      
      <div className={classes.lock}>
        <div className={classes.lockimage}>
          <img src="images/lock.png"/>
        </div>
        <span className={classes.reveal} onClick={goWallet}>
          Reveal seedphrase
        </span>
      </div>

      <div className={classes.footer}>
        <p className={classes.terms}>Terms of service</p>
      </div>
      <img src="images/wave.png" className={classes.bottomimg}/>
    </div>
  );
};

export default Reveal;
