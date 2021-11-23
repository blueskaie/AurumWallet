import React from 'react';
import { useRecoilValue } from 'recoil';
import { tokenList } from '../store/atoms';
import OneToken from "./onetoken";


export default function TokenList(props) {
  const list = useRecoilValue(tokenList);
  console.log(list);
  return (
    <>
      {list.map((item, index) => {
        return <OneToken {...props} {...item} key={`oneToken-${index}`} />;
      })}
    </>
  )
}