import { createAction, props } from '@ngrx/store'

/**
 * action disparada para pegar itens da seção baseado em id
 */
export const primeiroNivel = createAction(
  '[Menu] Primeiro Nivel'
);

export const primeiroNivelSuccess = createAction(
	'[Menu API] Primeiro Nivel Success',
	props<{ payload: string[] }>()
);
