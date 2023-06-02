export const users = {
    state: {
        usersList: [],
    }, // initial state
    reducers: {
      // handle state changes with pure functions
      setUsersList(state, usersList) {
        return {
            ...state,
            usersList
        }
      },

    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
      async fetchUsers(payload, rootState) {
        const data = await fetch('https://dummyjson.com/users')
            .then(res => res.json())
            this.setUsersList(data.users);
      },
    }),
    selectors: (slice, createSelector) => ({
        selectusers() {
            return slice(state => state.users)
        },

    })
};