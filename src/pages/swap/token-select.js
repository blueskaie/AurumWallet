import React, { useState, useMemo } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {tokenLogos} from "../../config/token-info";
import Jazzicon from 'react-jazzicon';
import { useRecoilValue } from 'recoil';
import { networkProvider, currentWallet, currentNetwork, tokenList  } from '../../store/atoms'

const TokenSelect = (props) => {
    const network = useRecoilValue( currentNetwork );
    const availableTokenList = useRecoilValue(tokenList);

    const {isShown,exceptToken,onChange} = props;
    const classes = useStyles(useTheme());

    
    const [search, setSearch] = useState(null);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const selectToken = (token) => {
        if (onChange) {
            onChange(token);
        }
    }

    const filteredTokenList = useMemo(()=>{
        let result = availableTokenList;
        if (search) {
            result = result.filter(item=>item.code.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        }
        if (exceptToken && exceptToken.code) {
            result = result.filter(item=>item.code!==exceptToken.code);
        }
        return result;
    }, [search, exceptToken, availableTokenList])

  return (isShown && <div className={classes.tokenSelect}>
        <div className={classes.searchBox}>
            <input placeholder="Search for a token" onChange={onSearchChange}></input>
        </div>
        { filteredTokenList && filteredTokenList.length 
            ? <ul className={classes.tokenList}>
                {filteredTokenList.map((token, index)=>(
                    <li key={index} className={classes.tokenItem} onClick={()=>selectToken(token)}>
                        { token && (tokenLogos[token.code.toUpperCase()]
                            ? <img src={tokenLogos[token.code.toUpperCase()]} alt={token.code} width={30} />
                            : <Jazzicon diameter={30} seed={token.contract[network.id]} />
                        )}
                        <p className={classes.tokenName}>{token.code}</p>
                    </li>
                ))}
            </ul>  
            : <div className={classes.noTokenList}> No Token List </div> 
        }     
    </div>);
};

const useStyles = makeStyles((theme) => ({
    tokenSelect: {
        position: 'relative'
    },
    searchBox: {
        border: '1px solid white',
        borderRadius: '13px 13px 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 17,
        "& input": {
            color: 'white',
            height: 20,
            border: 'none',
            outline: 'none',
            background: 'transparent'
        }
    },
    tokenList: {
        position: 'absolute',
        width: 'calc(100% - 2px)',
        maxHeight: 200,
        overflow: 'auto',
        padding: 0,
        margin: 0,
        listStyleType: 'none',
        color: 'white',
        background: '#222222',
        borderRadius: '0 0 16px 16px',
        border: '1px solid white',
        borderTop: 'none',
        zIndex: 10
    },
    noTokenList: {
        position: 'absolute',
        width: 'calc(100% - 2px)',
        overflow: 'auto',
        padding: '20px 0',
        color: 'white',
        background: '#222222',
        borderRadius: '0 0 16px 16px',
        border: '1px solid white',
        borderTop: 'none',
        zIndex: 10
    },
    tokenItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 10px',
        borderBottom: '1px solid white',
        "&:hover": {
            cursor: 'pointer'
        },
        "&:last-child": {
            border: 'none'  
        }
    },
    tokenImg:{
        width: 40,
        height: 40,
        borderRadius: 23,
        overflow:'hidden',
    },
    tokenName: {
        color: "white",
        marginLeft: 10,
        fontSize: 14,
    },
    tokenprice: {
        color: "#bcc5e1",
        fontSize: 12,
        margin: '5px 0px',
    },
    pricechart: {
        position: "relative",
        color: "white",
        marginLeft: "auto",
        "& img": {
        width: 97,
        transform: "translateX(10px)",
        },
    },
}));

export default TokenSelect;
