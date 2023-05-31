export const modal = {
    state: {
        isOpenModalAdd: false,
        isOpenModalEdit: false,
    }, // initial state
    reducers: {
      // handle state changes with pure functions
      setIsOpenModalAdd(state, isOpenModalAdd) {
        return {
            ...state,
            isOpenModalAdd
        }
      },
      setIsOpenModalEdit(state, isOpenModalEdit) {
        return {
            ...state,
            isOpenModalEdit
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
        selectModalAdd() {
            return slice(state => state.isOpenModalAdd)
        },
        selectModalEdit() {
            return slice(state => state.isOpenModalEdit)
        }
    })
};