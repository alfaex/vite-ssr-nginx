import { createReducer, on } from '@ngrx/store';
import * as fromSecaoActions from 'src/app/store/actions/servicos.action';


export interface State {
	primeiro: string[];

}

export const initialState: State = {
	primeiro: [],
};

export const reducer = createReducer(initialState,

on(fromSecaoActions.primeiroNivelSuccess, (state, action) => {

  // return {...state}

  // NÃO POR IFF EM REDUCER QUE O ANGULAR RECLAMA
    // console.log('state primeiro', action, state);
    return {
      ...state,
      ...action.payload
    }

  })
)
