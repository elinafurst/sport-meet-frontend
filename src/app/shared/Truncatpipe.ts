import { Pipe } from '@angular/core';

@Pipe({
    name: 'listLimitTo'
  })
export class ListPipe {
    transform(value: string, args: string) : string {
    
      let limit = args ? parseInt(args, 170) : 170;
      let trail = '...';
  
      return value.length > limit ? value.substring(0, limit) + trail : value;
    }
  }


  @Pipe({
    name: 'requestLimitTo'
  })
export class RequestPipe {
    transform(value: string, args: string) : string {
    
      let limit = args ? parseInt(args, 70) : 70;
      let trail = '...';
  
      return value.length > limit ? value.substring(0, limit) + trail : value;
    }
  }