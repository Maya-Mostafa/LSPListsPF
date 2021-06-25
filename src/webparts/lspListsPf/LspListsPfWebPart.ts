import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'LspListsPfWebPartStrings';
import LspListsPf from './components/LspListsPf';
import { ILspListsPfProps } from './components/ILspListsPfProps';

export interface ILspListsPfWebPartProps {
  wpTitle: string;
  listUrl: string;
  listName: string;
  pageSize: number;
}

export default class LspListsPfWebPart extends BaseClientSideWebPart<ILspListsPfWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ILspListsPfProps> = React.createElement(
      LspListsPf,
      {
        wpTitle: this.properties.wpTitle,
        context: this.context,
        listUrl: this.properties.listUrl,
        listName: this.properties.listName,
        pageSize: this.properties.pageSize
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('wpTitle', {
                  label: 'Web part title',
                  value: this.properties.wpTitle
                }),
                PropertyPaneTextField('listUrl', {
                  label: 'List URL',
                  value: this.properties.listUrl
                }),
                PropertyPaneTextField('listName', {
                  label: 'List Name',
                  value: this.properties.listName
                }),
                PropertyPaneTextField('pageSize', {
                  label: 'Page Size',
                  value: this.properties.pageSize.toString()
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
