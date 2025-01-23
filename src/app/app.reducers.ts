import { ActionReducerMap } from "@ngrx/store"
import * as fromConfig from 'src/app/store/reducers/config.reducer'


export interface State {
  config: fromConfig.State
}

export const appReducer: ActionReducerMap<State> = {
  config: fromConfig.reducer
}
