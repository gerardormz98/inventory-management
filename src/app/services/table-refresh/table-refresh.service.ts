import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableRefreshService {
  dataChanged = new Subject<any>();

  constructor() { }

  refreshTablesByType(tableType: string) {
    this.dataChanged.next(tableType);
  }
}
