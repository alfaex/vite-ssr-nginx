import { Component } from '@angular/core';
import { PageInfo } from "candle-types";
import * as fromRoot from './app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'v19-module';


  pageInfo: PageInfo = {
    resultsPerPage: 10,
    totalResults: 70
  }

  jiba$: Observable<string>;

  constructor(
    private store: Store<fromRoot.State>
  ){
    this.jiba$ = this.store.select(state => state.xis.xis)
  }
}
