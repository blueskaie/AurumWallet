import React from "react";


import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as LatomicNumber from '../utils/big.number'

import "keen-slider/keen-slider.min.css";

const Slidering = (props) => {
  const { active, balance, code,decimals } = props;
  return (
    <>
    <div className={`slideItem `}>
      <div className={`slide_container ${active?'':'inactive'}`}>
        <div className="main_content">
          <h3>{code}</h3>
          <span>
            <FontAwesomeIcon icon={faCaretDown} className="arrowicon"/>
            <input type="text" value={LatomicNumber.toDecimal(balance,decimals)}/>
          </span>
          {/* <p>
           {`${balance}`} <FontAwesomeIcon icon={faCaretDown} />{" "}
          </p> */}
        </div>
        <div className="sub_content">
          <p id="total">Todays PNL</p>
          <p id="totalValue">
            {`$ ${150}`}
            <a>
              {`${15} %`}
              <FontAwesomeIcon icon={faCaretDown} />
            </a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Slidering