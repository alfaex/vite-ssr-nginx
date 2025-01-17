import { ActionReducerMap } from "@ngrx/store"
import * as fromXis from 'src/app/store/reducers/xis.reducers'


export interface State {
  xis: fromXis.State
}

export const appReducer: ActionReducerMap<State> = {
  xis: fromXis.reducer
}
