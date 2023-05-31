export const products = {
    state: {
        productsList: [],
    }, // initial state
    reducers: {
      // handle state changes with pure functions
      setProductsList(state, productsList) {
        return {
            ...state,
            productsList
        }
      },

    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
      async fetchProducts(payload, rootState) {
        const data = await fetch('https://dummyjson.com/products')
            .then(res => res.json())
            this.setProductsList(data.products);
      },
    }),
    selectors: (slice, createSelector) => ({
        selectProducts() {
            return slice(state => state.products)
        },

    })
};