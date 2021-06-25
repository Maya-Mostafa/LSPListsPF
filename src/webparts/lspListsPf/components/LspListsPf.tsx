import * as React from 'react';
import styles from './LspListsPf.module.scss';
import { ILspListsPfProps } from './ILspListsPfProps';
import {PrimaryButton} from '@fluentui/react';
import IListItems from  '../components/IListItems/IListItems';
import {getLargeListItems, getNextResults} from  '../../../Services/DataRequests';

export default function LspListsPf (props: ILspListsPfProps){

    const [currListItems, setCurrListItems] = React.useState([]);
    const [nextObj, setNextObj] = React.useState([]);
    const [historyIndex, setHistoryIndex] = React.useState(0);
    const [historyItems, setHistoryItems] = React.useState([]);

    React.useEffect(()=>{
      getLargeListItems(props.context, props.listUrl, props.listName, props.pageSize).then( r =>{
        setCurrListItems(r[0]);
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
      }
    };

    const onPrevClick = () =>{
      if (historyIndex > 0){
        setHistoryIndex(historyIndex - 1);
        setCurrListItems(historyItems[historyIndex - 1]);
      }
    };

    return (
      <div className={ styles.lspListsPf }>
        
        <h2>{props.wpTitle}</h2>
        
        <PrimaryButton text="Previous" onClick={onPrevClick}/>  <PrimaryButton text="Next" onClick={onNextClick}/>
        
        <IListItems
          listItems = {currListItems}           
        />
      </div>
    );
}
