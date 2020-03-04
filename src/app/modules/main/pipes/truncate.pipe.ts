import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, start: number, end?: number): string {
    if (!end) {
      return value.slice(start);
    }

    const suffix = end < value.length ? '...' : '';

    return `${value.slice(start, end)}${suffix}`;
  }

}


