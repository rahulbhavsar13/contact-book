import ContactSaga from './ContactSaga';

/**
 * Registers all the sagas used within the app
 */
export default function* rootSaga() {
  yield [
    ContactSaga()
  ]
}
