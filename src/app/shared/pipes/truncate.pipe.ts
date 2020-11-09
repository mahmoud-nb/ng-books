import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length: number, suf:string = '...'): string {
    if ( length === null ) return value;
    return value.substring(0, length) + (value.length > length ? suf : '' ) ;
  }

}
