import { WebPartContext } from "@microsoft/sp-webpart-base";
import {sp, Web} from "@pnp/sp/presets/all";
 

const parseFilter = (filterStat: string, query: string, columnName: string) =>{
  filterStat === '' ? filterStat += `substringof('${query}', ${columnName})` : filterStat += ` and substringof('${query}', ${columnName})`;
  return filterStat;
};

export const getLargeListItems = async (context: WebPartContext, listUrl: string, listName: string, pageSize: number, filterFields?: any) =>{
  sp.setup({
    spfxContext: context
  });
  const web = Web(listUrl);
  const results:  any = [];
  let filterStat = '';
  
  if (!isObjectEmpty(filterFields)){
    if (filterFields.firstName){
      filterStat = parseFilter(filterStat, filterFields.firstName, 'FirstName');
    }
    if (filterFields.lastName){
      filterStat = parseFilter(filterStat, filterFields.lastName, 'LastName');
    }
    if (filterFields.location){
      filterStat = parseFilter(filterStat, filterFields.location, 'MMHubShoolName');
    }
    if (filterFields.jobTitle){
      filterStat = parseFilter(filterStat, filterFields.jobTitle, 'JobTitle');
    }
    if (filterFields.pNumber){
      filterStat = parseFilter(filterStat, '0'+filterFields.pNumber.substring(1), 'MMHubEmployeeNo');
    }
  }

  const response : any =  await web.lists
    .getByTitle(listName)
    .items
    .filter(filterStat)
    .top(pageSize)
    .getPaged();

  response.results.map((item: any)=>{
    results.push({
      // fullname: item.FullName,
      // email: item.MMHubBoardEmail,
      // jobTitle: item.JobTitle,
      Id: item.Id,
      firstName: item.FirstName || "",
      lastName: item.LastName,
      jobTitle: item.JobTitle,
      email: item.MMHubBoardEmail,
      empNo: item.MMHubEmployeeNo.charAt(3) == 0 ? 'P'+item.MMHubEmployeeNo.substring(2) : 'P'+item.MMHubEmployeeNo.substring(1),
      empGrp: item.MMHubEmployeeGroup,
      fullName: item.MMHubFullName,
      locNos: item.MMHubLocationNos,
      locNames: item.MMHubShoolName,
      photo: null,
      presence: null  
    });
  });
  
  return [results, response];
};

export const getNextResults = async (response: any) =>{
  const nextResults: any = [];
  let nextResponse: any;

  if (response.hasNext){
    nextResponse = await response.getNext();
    nextResponse.results.map((item)=>{
      nextResults.push({
        // fullname: item.FullName,
        // email: item.MMHubBoardEmail,
        // jobTitle: item.JobTitle,
        Id: item.Id,
        firstName: item.FirstName || "",
        lastName: item.LastName,
        jobTitle: item.JobTitle,
        email: item.MMHubBoardEmail,
        empNo: item.MMHubEmployeeNo,
        empGrp: item.MMHubEmployeeGroup,
        fullName: item.MMHubFullName,
        locNos: item.MMHubLocationNos,
        locNames: item.MMHubShoolName,
        photo: null,
        presence: null  
      });
    });
  }

  return [nextResults, nextResponse];
};


export const isObjectEmpty = (items: any): boolean=>{
  let isEmpty:boolean = true;
  for (const item in items){
    isEmpty = items[item] === "" && isEmpty ;
  }
  return isEmpty;
};