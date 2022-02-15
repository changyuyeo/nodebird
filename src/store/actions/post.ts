import * as actions from '@store/actions/actionTypes'

export const addPostAction = () => ({ type: actions.ADD_POST })

export type PostAction = ReturnType<typeof addPostAction>
