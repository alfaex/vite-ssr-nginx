import { createAction, props } from '@ngrx/store'

/**
 * action disparada para pegar itens da seção baseado em id
 */
export const initial = createAction(
  '[CONFIG] Initial'
);

export const InitialSuccess = createAction(
	'[CONFIG] Initial Success',
	props<{ title: string }>()
);
