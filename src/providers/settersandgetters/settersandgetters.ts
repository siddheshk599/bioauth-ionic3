import { Injectable } from '@angular/core';

@Injectable()
export class SettersandgettersProvider {

  constructor() {
  }

  username: any;

  set UserName(val: any){
    this.username = val;
  }

  get UserName(): any {
    return this.username;
  }


}
