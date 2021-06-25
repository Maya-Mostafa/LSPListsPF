import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ILspListsPfProps {
  context: WebPartContext;
  wpTitle: string;
  listUrl: string;
  listName: string;
  pageSize: number;
  
}
