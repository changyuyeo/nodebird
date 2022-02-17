import { all, fork } from 'redux-saga/effects'

import userSaga from '@store/sagas/user'
import postSaga from '@store/sagas/post'

export default function* rootSaga() {
	yield all([fork(userSaga), fork(postSaga)])
}
