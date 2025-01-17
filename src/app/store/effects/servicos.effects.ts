import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from "@ngrx/effects";
import * as fromSecaoActions from 'src/app/store/actions/servicos.action';
import { map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ServicosEffects {

  private actions$ = inject(Actions);

  // constructor() {}

	loadSecoes$ = createEffect(() => {

    return this.actions$.pipe(
      ofType(fromSecaoActions.primeiroNivel),
      map( x => fromSecaoActions.primeiroNivelSuccess({
        payload: ['aurora']
      }))

    )
  })








}
