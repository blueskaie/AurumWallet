import React from 'react';
import { useRecoilValue } from 'recoil';
import { tokenList } from '../store/atoms';
import OneToken from "./onetoken";


export default function TokenList() {
  const list = useRecoilValue(tokenList);
  return (
    <>
      {list.map((item, index) => {
        return <OneToken {...item} key={`oneToken-${index}`} />;
      })}
    </>
  )
}