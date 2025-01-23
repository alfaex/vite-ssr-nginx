import { createReducer, on } from '@ngrx/store';
import * as fromConfigActions from 'src/app/store/actions/config.action';


export interface State {
	title: string;

}

export const initialState: State = {
	title: 'initial',
};

export const reducer = createReducer(initialState,

on(fromConfigActions.InitialSuccess, (state, action) => {

    return {
      title: action.title
    }

  })
)
