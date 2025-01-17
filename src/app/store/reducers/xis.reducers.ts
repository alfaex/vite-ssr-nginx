import { createReducer, on } from '@ngrx/store';
import * as fromXisAction from 'src/app/store/actions/xis.actions';

export interface State {
  xis: string
}



export const initialState: State = {
  xis: 'de'
}


export const reducer = createReducer(initialState,

  on(fromXisAction.login, state => {
    return {
      ...state
    }
  })
)
