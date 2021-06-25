import * as React from 'react';
import styles from './LspListsPf.module.scss';
import { ILspListsPfProps } from './ILspListsPfProps';
import {PrimaryButton} from '@fluentui/react';
import IListItems from  '../components/IListItems/IListItems';

import {getLargeListItems, getNextResults} from  '../../../Services/DataRequests';

export default function LspListsPf (props: ILspListsPfProps){

    const [currListItems, setCurrListItems] = React.useState([]);
    const [nextListItems, setNextListItems] = React.useState([]);
    const [nextObj, setNextObj] = React.useState([]);
    const [prevArrs, setPrevArrs] = React.useState([]);
    const [nextArrs, setNextArrs] = React.useState([]);
    
    const [historyIndex, setHistoryIndex] = React.useState(0);
    const [historyItems, setHistoryItems] = React.useState([]);

    React.useEffect(()=>{
      getLargeListItems(props.context, "https://pdsb1.sharepoint.com/sites/contentTypeHub/", "Employees", 10).then( r =>{
        setCurrListItems(r[0]);
        //setPrevArrs([r[0]]);
        setNextObj(r[1]);        
        setHistoryItems([r[0]]);
        setHistoryIndex(0);
      });
    }, []);

    const onNextClick = () =>{

      if (historyItems.length - 1 === historyIndex){
        getNextResults(nextObj).then( r =>{
          setCurrListItems(r[0]);
          setNextObj(r[1]);
          
          let historyArr = historyItems;
          historyArr.push(r[0]);
          setHistoryItems(historyArr);

          setHistoryIndex(historyIndex + 1);
        });
      }else{
        setHistoryIndex(historyIndex + 1);
        setCurrListItems(historyItems[historyIndex + 1]);
        console.log(historyIndex, historyItems);
      }
    };

    const onPrevClick = () =>{
      if (historyIndex > 0){
        setHistoryIndex(historyIndex - 1);
        setCurrListItems(historyItems[historyIndex - 1]);
        console.log(historyIndex, historyItems);
      }
    };

    /*
    const onNextClick = () =>{
      if (nextArrs.length > 1){
        let prevArr = prevArrs;
        let nextArr = nextArrs;
        prevArr.push(nextArr.pop());
        setNextArrs(nextArr);
        setPrevArrs(prevArr);
        setCurrListItems(nextArr[nextArr.length - 1]);
      }else{
        getNextResults(nextObj).then( r =>{
          setCurrListItems(r[0]);
          let prevArr = prevArrs;
          prevArr.push(r[0]);
          setPrevArrs(prevArr);
          setNextObj(r[1]);
        });
      }
    };

    const onPrevClick = () =>{
      if (prevArrs.length > 1){
        let prevArr = prevArrs;
        let nextArr = nextArrs;
        nextArr.push(prevArr.pop());
        setPrevArrs(prevArr);
        setNextArrs(nextArr);
        setCurrListItems(prevArr[prevArr.length - 1]);
      }
    };
    */

    return (
      <div className={ styles.lspListsPf }>
        <PrimaryButton text="Previous" onClick={onPrevClick}/>  <PrimaryButton text="Next" onClick={onNextClick}/>
        
        <IListItems
          initListItems = {currListItems} 
          nextListItems = {nextListItems}
        />
      </div>
    );
}
