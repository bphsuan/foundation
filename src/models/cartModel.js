import { addCart, getCart } from '../services/cartService'
export default {
  namespace: "cart",
  state: {

  },
  reducers: {

  },
  effects: {
    * Add_Cart({ payload, callback }, { put, call, select }) {
      const resMsg = yield call(addCart, payload);
      callback(resMsg);
    },
    * GET_Cart({ payload, callback }, { put, call, select }) {
      const resMsg = yield call(getCart);
      callback(resMsg);
    }
  }
}