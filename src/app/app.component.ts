import { Component, OnInit } from '@angular/core';
import * as fromRoot from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '4300';


  title$: Observable<string>;

  constructor(
    private store: Store<fromRoot.State>
  ){
    this.title$ = this.store.select(state => state.config.title)
  }

}
