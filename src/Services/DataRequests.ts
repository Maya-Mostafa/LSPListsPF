import { WebPartContext } from "@microsoft/sp-webpart-base";
import {sp, Web} from "@pnp/sp/presets/all";

import {IListItem} from '../webparts/lspListsPf/components/IListItem';
import {IState} from '../webparts/lspListsPf/components/IState';
import {ILspListsPfProps} from '../webparts/lspListsPf/components/ILspListsPfProps';

 
export const getLargeListItems = async (context: WebPartContext, listUrl: string, listName: string, pageSize: number) =>{
  sp.setup({
    spfxContext: context
  });
  const web = Web(listUrl);
  const results: IListItem [] = [];
  
  const response : any =  await web.lists.getByTitle(listName).items.top(pageSize).getPaged();

  response.results.map((item)=>{
    results.push({
      fullname: item.FullName,
      email: item.MMHubBoardEmail,
      jobTitle: item.JobTitle,
    });
  });
  console.log("first response", response);
  
  return [results, response];
};

export const getNextResults = async (response: any) =>{
  const nextResults: IListItem [] = [];
  let nextResponse: any;

  if (response.hasNext){
    nextResponse = await response.getNext();
    console.log("next response", nextResponse);
    nextResponse.results.map((item)=>{
      nextResults.push({
        fullname: item.FullName,
        email: item.MMHubBoardEmail,
        jobTitle: item.JobTitle,
      });
    });
  }

  return [nextResults, nextResponse];
};