import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  DefaultUrlSerializer,
  UrlSerializer,
  UrlTree
} from "@angular/router";

import { dynRoutes } from "./dyn-routes.config";

export interface UrlData {
  shortTree?: UrlTree;
  shortUrl?: string;
  fullTree?: UrlTree;
  fullUrl?: string;
  fullRouterLink?: any[];
  compLeft?: string;
  compRight?: string;
  dynLeft?: string;
  dynRight?: string;
}

@Injectable()
export class CustomUrlSerializerService implements UrlSerializer {
  private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

  generateUrlData(urlData: string | UrlTree): UrlData {
    const urlTree =
      (typeof urlData === 'string') ?
        this._defaultUrlSerializer.parse(urlData) :
        (urlData as UrlTree);

    const urlResult: UrlData = {};

    const defaultPath = (
        dynRoutes['**'] &&
        dynRoutes['**'].redirectTo
      ) || '';

    if (urlTree && urlTree.root && urlTree.root.children) {
      const outlets = urlTree.root.children;

      if (outlets.primary && outlets.primary.segments) {
        const getDynPath = segment => {
          const path = segment && segment.path;
          return dynRoutes.config[path] ? path : defaultPath;
        };

        urlResult.dynLeft = getDynPath(outlets.primary.segments[0]);
        urlResult.dynRight = getDynPath(outlets.primary.segments[1]);
        urlResult.compLeft = dynRoutes.config[urlResult.dynLeft].componentPath
        urlResult.compRight = dynRoutes.config[urlResult.dynRight].componentPath
      } else {
        const getPath = segment => segment && segment.path;        

        if (outlets.left && outlets.left.segments) {
          urlResult.compLeft = getPath(outlets.left.segments[0]);
          urlResult.dynLeft = getPath(outlets.left.segments[1]);
        }
        if (outlets.right && outlets.right.segments) {          
          urlResult.compRight = getPath(outlets.right.segments[0]);
          urlResult.dynRight = getPath(outlets.right.segments[1]);
        }
      }
    }

    urlResult.shortUrl =
      `/${urlResult.dynLeft}` + (
        (urlResult.dynRight) ? `/${urlResult.dynRight}` : ''
      );
    urlResult.fullUrl =
      '/(' + (
        (urlResult.compLeft && urlResult.dynLeft) ?
          `left:${urlResult.compLeft}/${urlResult.dynLeft}//` : ''
      ) + (
        (urlResult.compRight && urlResult.dynRight) ?
          `right:${urlResult.compRight}/${urlResult.dynRight}` : ''
      ) + ')';
    urlResult.fullRouterLink = [
      '/',
      { outlets: {
        left: `${ urlResult.compLeft }/${ urlResult.dynLeft }`,
        right: `${ urlResult.compRight }/${ urlResult.dynRight }`
      }}
    ];
    urlResult.shortTree =
      this._defaultUrlSerializer.parse(urlResult.shortUrl);
    urlResult.fullTree =
      this._defaultUrlSerializer.parse(urlResult.fullUrl);

    return urlResult;
  }

  getPathByRoute(route: ActivatedRoute): string {
    return Object.keys(route.snapshot.params)
      .map(key => route.snapshot.params[key])
      [0];
  }

  transformDynamicLink(route: ActivatedRoute, dynLink: string): any[] {
    const currentDynPath = this.getPathByRoute(route);      
    const url = `/${ currentDynPath }/${ dynLink }`;

    return this.generateUrlData(url).fullRouterLink;
  }

  parse(url: string): UrlTree {
    return this.generateUrlData(url).fullTree;
  }

  serialize(tree: UrlTree): string {
    return this.generateUrlData(tree).shortUrl;
  }
}