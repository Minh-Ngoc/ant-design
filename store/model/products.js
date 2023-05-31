export const products = {
    state: {
        products: [],
    }, // initial state
    reducers: {
      // handle state changes with pure functions
      setProducts(state, payload) {
        return {
            ...state,
            payload
        }
      },
    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
      async incrementAsync(payload, rootState) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch.count.increment(payload);
      },
    }),
    selectors: (slice, createSelector) => ({
        selectProducts() {
            return slice(state => state.products)
        },

    })
};