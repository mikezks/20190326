import {
    RouteReuseStrategy,
    ActivatedRouteSnapshot,
    DetachedRouteHandle
} from "@angular/router";

export class CustomReuseStrategy implements RouteReuseStrategy {
    cache: {[key: string]: DetachedRouteHandle} = {};
    isAttachStep: boolean;
    
    getRouteKey(route: ActivatedRouteSnapshot): string {
        const get = (
            route &&
            route.children[0] &&
            route.children[0].url &&
            route.children[0].url[1]
            ) ?
            route.children[0].url[1].path :
            '';
        return get;
    }
        
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        this.isAttachStep = false;
        return false;
    }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }
    
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        this.isAttachStep = true;
        const isCached = !!this.cache[this.getRouteKey(route)];
        return this.isAttachStep && isCached;
    }
    
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        const handle = this.cache[this.getRouteKey(route)];
        return (this.isAttachStep && handle) || undefined;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        const key = this.getRouteKey(route);
        if (key && handle && key !== 'default') {
            this.cache[key] = handle;
        }
    }
}
