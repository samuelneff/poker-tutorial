import { types } from './actions';

/*
      Tutorial: HTTP API Call 2


      A better way to make API calls is to use Redux middleware.

      middleware are functions that are called as part of Redux action propagation and can perform any type
      of manipulation of, or processing on, those actions.

      Middleware is written as a series of functions that return other functions, all of which take one
      argument. It's a weird syntax but it works and you rarely need to do anything except in the innermost
      function.
 */


/*
      Endpoints

      For our middleware we're going to create a mapping of action types to URLs. If we
      get an action for the desired URL, then we'll dispatch a few related actions.

      Start by filling in the mapping for PLAYER_NAMES_LOAD to https://jsonplaceholder.typicode.com/users
 */
const endpoints = {

};

export default store => next => action => {

  /*
        FYI: Arguments

        Middleware can effectively be treated as a function with three arguments, even though it's actually
        several chained functions.

        store is the Redux store instance that contains the redux state we see elsewhere. The store has two
        methods that we care about.

            store.getState() returns the current global root state.

            store.dispatch(action) can be used to dispatch other actions.
   */

  /*

        Forward first

        Middleware should always forward the action along to the next middleware,
        unless you specifically want to cancel it.

        For asynchronous middleware like ours, you'll always want to call next before
        any asynchronous code. We can do that here and then process it
        after the rest of the middleware has processed the action.
   */
  next(action);



  /*
        endpoint

        For the action lets check our mapping and find the related endpoint.
   */



  /*
        None found?

        If we don't have a mapping for this action (which will usually be the case)
        then we can return early. We've already forwarded the action to the next middleware
        so there's nothing else we need to do before returning.
   */



  /*
        Follow-on actions.

        By convention for an API call we'll dispatch three follow-up actions all based on the
        original action type: xyz_REQUEST, xyz_SUCCESS, and xyz_FAILURE. The first is sent
        when we initiate an API call. The others are sent when the call comes back with
        either a success or failure.

        Implement the API call and dispatching these three actions as appropriate.

        In case of success, send the response in the payload with the key `body`.

        In case of error, set the `error` flag on the new action and send the error itself
        in the payload with a key `error`.
   */



}
