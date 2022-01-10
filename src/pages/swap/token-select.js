import React, { useState, useMemo, useEffect } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {tokenLogos} from "../../config/token-info";
import Jazzicon from 'react-jazzicon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentNetwork, tokenList, allTokens  } from '../../store/atoms'
import { getCoingeckoInfoByAddress } from '../../services/coingeco-utils';
import { getTokenInfoByAddress } from '../../services/token-utils';
import ARUButton from '../../components/buttons';
import { Box, Dialog, Icon } from '@material-ui/core';

const TokenSelect = (props) => {
    const network = useRecoilValue( currentNetwork );
    const availableTokenList = useRecoilValue(tokenList);
    const [curToken, setCurToken] = useState(null);

    const {isShown,exceptToken,onChange } = props;
    const classes = useStyles(useTheme());

    
    const [search, setSearch] = useState(null);
    const [checking, setChecking] = React.useState(false);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const selectToken = (token) => {
        setCurToken(token);
        if (onChange) {
            onChange(token);
        }
    }

    const [getResult, setGetResult] = useState(1);
    const [importAddress, setImportAddress] = useState('');
    const [vals, setVals] = useState({title: '', code: '', decimals: '', main: '', test: ''});
    const [openImportDlg, setOpenImportDlg] = useState(false);

    const setAllTokens = useSetRecoilState(allTokens);
    const tokens = useRecoilValue(allTokens);

    const onImportToken = async (event) => {

        event.preventDefault();
        if (!checking) return;
        setSearch('');
        setGetResult(0);
    
        const {main, test, title, code, decimals, coinId, image} = vals;
        if(!main && !test) {
            return;
        }

        let tokenInfo = {title, code, decimals, coinId: coinId, image: image};
        tokenInfo.contract = {
          "1": main,
          "2": test
        };
    
        setOpenImportDlg(false);
        setGetResult('');
    
        setAllTokens((tokens) => {
            const index = tokens.findIndex(token=>token.contract[network.id] === tokenInfo.contract[network.id]);
            const newTokens = [...tokens];
            if (index > -1) {
              tokenInfo.contract = {...tokens[index].contract, [network.id]: tokenInfo.contract[network.id]};
              newTokens.splice(index, 1, tokenInfo);
            } else {
              newTokens.push(tokenInfo);
            }
            return [...newTokens];
        });
    }

    useEffect(() => {
        const getTokenInfo = async ()=>{
            try {
                const tokenInfo = await getTokenInfoByAddress(network,search)
                let main='',test='';
                if(tokenInfo)
                {
                    for (let i = 0; i < tokens.length; i++) {
                        if (tokens[i].contract[1] === search) {
                            console.log("same");
                            return;
                        }
                    }
                    console.log("new");
                    setGetResult(2);
                    if(network.id === 1)
                        main = search
                    else
                        test = search
                    let {id, image} = await getCoingeckoInfoByAddress(main);
                    setVals({...vals,...{title: tokenInfo.name,decimals:tokenInfo.decimals,code:tokenInfo.symbol,main,test, coinId: id, image}})
                    let shortaddress = search.substring(0, 7) + '.....' + search.substring(search.length - 6, search.length);
                    setImportAddress(shortaddress);
                }
            } catch (e) {
                console.log(e);
            }
        }
        getTokenInfo();
    }, [search])

    useEffect(()=>{
        const token = availableTokenList.find((item)=>curToken && item.contract === curToken.contract);
        setCurToken(token)
        if (onChange) {
            onChange(token);
        }
    }, [availableTokenList])

    const filteredTokenList = useMemo(()=>{
        let result = availableTokenList;
        if (search) {
            setGetResult(1);
            result = result.filter(item=>item.code.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
            if (result && result.length) {
                return result;
            }
            setGetResult(3);
            return result;
        }
        if (exceptToken && exceptToken.contract) {
            setGetResult(1);
            result = result.filter(item=>item.contract!==exceptToken.contract);
            return result;
        }
        setGetResult(1);
        return result;
    }, [search, exceptToken, availableTokenList])

  return (isShown && 
    <Box className={classes.tokenSelect}>
        <Box className={classes.searchBox}>
            <input val={search} placeholder="Search for a token" onChange={onSearchChange}></input>
        </Box>
        { getResult =='1' && 
            <ul className={classes.tokenList}>
                {filteredTokenList.map((token, index)=>(
                    <li key={index} className={classes.tokenItem} onClick={()=>selectToken(token)}>
                        <Box className={classes.tokenImg}>
                        { token && token.image
                        ? <img src={token.image.large} alt={token.code} width={30} style={{borderRadius: '50%'}} />
                        : (token && tokenLogos[token.code.toUpperCase()] 
                            ? <img src={tokenLogos[token.code.toUpperCase()]} alt={token.code} width={30} style={{borderRadius: '50%'}} />
                            : <Jazzicon diameter={30} seed={token.contract[network.id]} />)
                        }
                        </Box>
                        <p className={classes.tokenName}>{token.code}</p>
                    </li>
                ))}
            </ul>  
        }     
        { getResult =='2' && 
            <ul className={classes.tokenList}>
                <li className={classes.importToken}>
                    <Box className={classes.tokenHeader}>
                        {/* <img src={tokenLogos[vals.code.toUpperCase()]} alt={vals.code} width={40} /> */}
                        <Box className={classes.tokenImg}>
                        { vals && vals.image
                        ? <img src={vals.image.large} alt={vals.code} width={30} style={{borderRadius: '50%'}} />
                        : (vals && tokenLogos[vals.code.toUpperCase()] 
                            ? <img src={tokenLogos[vals.code.toUpperCase()]} alt={vals.code} width={30} style={{borderRadius: '50%'}} />
                            : <Jazzicon diameter={30} seed={network.id == 1 ? vals.main : vals.test} />)
                        }
                        </Box>
                        <p className={classes.tokenName}>{vals.code}</p>
                    </Box>
                    <ARUButton className={classes.importButton} onClick={() => {setOpenImportDlg(true); setChecking(false);} }>IMPORT</ARUButton>
                </li>
            </ul>
        }
        {
            getResult == 3 && 
            <Box className={classes.noTokenList}> No Token List </Box> 
        }
        <Dialog
        classes={{paper: classes.importModal}}
        onClose={()=>setOpenImportDlg(false)} 
        aria-labelledby="import-modal" 
        open={openImportDlg}
        >
            <Box className={classes.dlgHeader}>
                <img src="images/warning.svg" style={{width: 36, height: 36}} />
                <img src="images/close.svg" onClick={() => setOpenImportDlg(false)} style={{color: 'white', width: 32, height: 32}} />
            </Box>
            <span style={{marginTop: 10, color: 'red'}}>
                Anyone can create a BEP20 token on Binance Smart Chain (BSC) with any name, 
                including fake versions of existing tokens and tokens that claim to represent 
                projects that do not have a token. If you purchase an arbitrary token you may not be able to sell it.
            </span>
            <Box style={{width: '100%', borderTop: '1px solid #333333', marginTop: 10}}></Box>
            <Box className={classes.dlgHeader} style={{marginTop: 10, fontSize: 14}}>
                <Box>
                    <Box>{vals.title}({vals.code})</Box>
                    <Box>{importAddress}</Box>
                </Box>
                <Box onClick={()=>{window.open(`${network.explore}/address/${search}`, "_blank");}} style={{cursor: 'pointer'}}>
                    <Box>View on</Box>
                    <Box>BSCSCAN</Box>
                </Box>
            </Box>
            <Box style={{width: '100%', borderTop: '1px solid #333333', marginTop: 10}}></Box>
            <Box className={classes.dlgHeader} style={{marginTop: 10}}>
                <Box className={classes.dlgHeader} onClick={() => setChecking(!checking)}>
                    {!checking && <Icon className={classes.checkIcon}>
                        <img src="images/unchecked-circle.svg" alt="AurumWallet" style={{width: 25, height: 25}} />
                    </Icon>}
                    {checking && <Icon className={classes.checkIcon}>
                        <img src="images/checked-circle.svg" alt="AurumWallet" style={{width: 25, height: 25}} />
                    </Icon>}
                    <span style={{marginLeft: 10}}>I understand</span>
                </Box>
                <ARUButton onClick={onImportToken}>IMPORT</ARUButton>
            </Box>
        </Dialog>
    </Box>);
};

const useStyles = makeStyles((theme) => ({
    dlgHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer'
    },
    tokenHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    importToken: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    importButton: {
        background: '#333333',
        border: 'none',
        color: 'white',
        padding: 5,
    },
    importModal: {
        width: '100%',
        borderRadius: 6,
        background: '#222222',
        padding: 20,
        color: 'white',
        fontSize: 15,
      },
    tokenSelect: {
        position: 'relative'
    },
    searchBox: {
        border: '1px solid white',
        borderRadius: '6px 6px 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 17,
        "& input": {
            color: 'white',
            height: 20,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            width: '100%'
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
        borderRadius: '0 0 6px 6px',
        border: '1px solid white',
        borderTop: 'none',
        zIndex: 10
    },
    noTokenList: {
        position: 'absolute',
        width: 'calc(100% - 42px)',
        overflow: 'auto',
        padding: 20,
        color: 'white',
        background: '#222222',
        borderRadius: '0 0 6px 6px',
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
        width: 30,
        height: 30,
        borderRadius: 6,
        overflow:'hidden',
        "&>img": {
            width: 30,
            height: 30
        }
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
