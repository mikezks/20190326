import {
    UrlSerializer,
    DefaultUrlSerializer,
    UrlTree
} from "@angular/router";
import { urlMapping } from "./url-mapping.config";

export interface UrlData {
    shortTree?: UrlTree;
    fullTree?: UrlTree;
    shortUrl?: string;
    fullUrl?: string;
    compLeft?: string;
    compRight?: string;
    dynLeft?: string;
    dynRight?: string;
}

export class StandardUrlSerializer implements UrlSerializer {
    private static _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

    static generateUrlData(urlData: string | UrlTree): UrlData {
        const urlTree =
            	(typeof urlData === 'string') ?
                StandardUrlSerializer._defaultUrlSerializer.parse(urlData) :
                (urlData as UrlTree);
        
        const urlResult: UrlData = {};

        if (urlTree && urlTree.root && urlTree.root.children) {
            if (urlTree.root.children.primary && urlTree.root.children.primary.segments) {
                urlResult.dynLeft =
                    urlTree.root.children.primary.segments[0] &&
                    urlTree.root.children.primary.segments[0].path;
                urlResult.dynLeft =
                    urlMapping[urlResult.dynLeft] ?
                    urlResult.dynLeft :
                    'default';
                urlResult.dynRight =
                    urlTree.root.children.primary.segments[1] &&
                    urlTree.root.children.primary.segments[1].path;
                urlResult.dynRight =
                    urlMapping[urlResult.dynRight] ?
                    urlResult.dynRight :
                    'default';
                urlResult.compLeft = urlMapping[urlResult.dynLeft].component
                urlResult.compRight = urlMapping[urlResult.dynRight].component
            } else {
                if (urlTree.root.children.left && urlTree.root.children.left.segments) {
                    urlResult.compLeft =
                        urlTree.root.children.left.segments[0] &&
                        urlTree.root.children.left.segments[0].path;
                    urlResult.dynLeft =
                        urlTree.root.children.left.segments[1] &&
                        urlTree.root.children.left.segments[1].path;
                }
                if (urlTree.root.children.right && urlTree.root.children.right.segments) {
                    urlResult.compRight =
                        urlTree.root.children.right.segments[0] &&
                        urlTree.root.children.right.segments[0].path;
                    urlResult.dynRight =
                        urlTree.root.children.right.segments[1] &&
                        urlTree.root.children.right.segments[1].path;
                }
            }
        }

        urlResult.shortUrl = 
            `/${ urlResult.dynLeft }` + (
                (urlResult.dynRight) ? `/${ urlResult.dynRight }` : ''
            );
        urlResult.fullUrl =
            '/(' + (
                (urlResult.compLeft && urlResult.dynLeft) ?
                `left:${ urlResult.compLeft}/${ urlResult.dynLeft }//` : ''
            ) + (
                (urlResult.compRight && urlResult.dynRight) ?
                `right:${ urlResult.compRight }/${ urlResult.dynRight }` : ''
            ) + ')';
        urlResult.shortTree =
            StandardUrlSerializer._defaultUrlSerializer.parse(urlResult.shortUrl);
        urlResult.fullTree =
            StandardUrlSerializer._defaultUrlSerializer.parse(urlResult.fullUrl);

        return urlResult;
    }

    parse(url: string): UrlTree {
        return StandardUrlSerializer.generateUrlData(url).fullTree;
    }

    serialize(tree: UrlTree): string {
        return StandardUrlSerializer.generateUrlData(tree).shortUrl;
    }
}