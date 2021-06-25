import * as React from 'react';
import styles from '../LspListsPf.module.scss';
import { IListItemsProps } from './IListItemsProps';
import {DetailsList, PrimaryButton} from '@fluentui/react';


export default function IListItems (props: IListItemsProps){

    let listItems = props.initListItems;
    let nextListItems = props.nextListItems;

    return(
        <div>
            <DetailsList 
                items={listItems}
            />
        </div>
    );
}