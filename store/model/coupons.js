export const coupons = {
    state: {
        couponsList: [],
    }, // initial state
    reducers: {
      // handle state changes with pure functions
      setCouponsList(state, couponsList) {
        return {
            ...state,
            couponsList
        }
      },

    },
    effects: (dispatch) => ({
      // handle state changes with impure functions.
      // use async/await for async actions
      async fetchCoupons(payload, rootState) {
            this.setCouponsList([{
              id: 1,
              title: 'Giảm giá 10%',
              percent: '10%',
              codeCoupon: 'Code1'
            },
            {
              id: 2,
              title: 'Giảm giá 20%',
              percent: '20%',
              codeCoupon: 'Code2'
            },
            {
              id: 3,
              title: 'Giảm giá 30%',
              percent: '30%',
              codeCoupon: 'Code3'
            },
            {
              id: 4,
              title: 'Giảm giá 40%',
              percent: '40%',
              codeCoupon: 'Code4'
            },
            {
              id: 5,
              title: 'Giảm giá 50%',
              percent: '50%',
              codeCoupon: 'Code5'
            },
          ]);
      },
    }),
    selectors: (slice, createSelector) => ({
        selectCoupons() {
            return slice(state => state.coupons)
        },

    })
};