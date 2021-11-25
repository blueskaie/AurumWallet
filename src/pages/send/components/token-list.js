import React, {useMemo} from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import OneToken from "./onetoken";
import OneToken from "../../../components/onetoken";
import { tokenList } from '../../../store/atoms'
import { useRecoilValue } from 'recoil';
import ScrollContainer from "react-indiana-drag-scroll";

const useStyles = makeStyles((theme) => ({
    tokenList: {
        marginTop: 10,
        height: 315,
        overflowY: 'auto',
    },
}));

export default function TokenList(props) {
    const classes = useStyles(useTheme());
    const history = useHistory();
    const list = useRecoilValue(tokenList);
    const {keyword} = props;

    const goToSendToken = (token) => {
        if (token && token.code) {
          history.push(`/send-token/${token.code}`);
        }
    }
    
    const filteredList = useMemo(()=>{
      if (keyword) {
        return list.filter(item=>item.code && item.code.toUpperCase().includes(keyword.toUpperCase()))
      } else {
        return list
      }
    }, [keyword, list]);

    return (
        <ScrollContainer className={classes.tokenList} vertical={true}>
            {filteredList.map((token, index) => {
              return <OneToken key={index.toString} {...token} onClick={()=>goToSendToken(token)}/>;
            })}
        </ScrollContainer>
    )
}