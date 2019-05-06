import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CustomUrlSerializerService } from './custom-url-serializer.service';

@Pipe({
  name: 'dynLink'
})
export class RouterDynLinkTransformPipe implements PipeTransform {

  constructor(
    private route: ActivatedRoute,
    private urlService: CustomUrlSerializerService) {}

  transform(value: string, returnType?: string): any[] {
    return this.urlService.transformDynamicLink(this.route, value);
  }
}
