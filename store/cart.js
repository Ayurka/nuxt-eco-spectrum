export const state = () => ({
  cartItemList: []
})

export const mutations = {
  updateCart (state, { item, quantity, isAdd }) {
    const record = state.cartItemList.find(element => element.id === item.id)
    if (record) {
      if (isAdd) {
        record.quantity += quantity
      } else {
        record.quantity = quantity
      }
    } else {
      state.cartItemList.push({
        ...item,
        quantity
      })
    }
  },
  setCart (state, product) {
    if (product) {
      const item = state.cartItemList.find(record => record.id === product.id)
      if (item) {
        item.quantity += +product.quantity
        return
      }
      state.cartItemList.push(product)
    }
  },
  removeCartItem (state, { item }) {
    const record = state.cartItemList.find(element => element.id === item.id)
    state.cartItemList.splice(state.cartItemList.indexOf(record), 1)
    if (state.cartItemList.length < 1) {
      state.cartItemList = []
    }
  },
  clearCart (state) {
    state.cartItemList = []
  },
}

export const getters = {
  cartItemList: state => state.cartItemList,
  cartTotal: (state) => {
    return state.cartItemList.reduce((total, record) => {
      total += +record.price * record.quantity
      return total
    }, 0)
  },
  quantityAll: (state) => {
    return state.cartItemList.reduce((total, record) => {
      total += +record.quantity
      return total
    }, 0)
  },
  products (state) {
    return state.cartItemList.map(product => {
      return {
        id: product.id,
        quantity: product.quantity
      }
    })
  }
}
