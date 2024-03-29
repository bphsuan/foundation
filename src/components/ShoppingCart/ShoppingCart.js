import React from 'react';
import Product from './ShoppingItem';
import StepNext from '../StepNext/StepNext';
import './ShoppingCart.scss';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: "結帳 ",
      products: [],

    }
  }
  componentDidMount() {
    const token = window.localStorage.getItem("token")
      ? JSON.parse(window.localStorage.getItem("token"))
      : {
        token: [],
      }
    window.localStorage.getItem(token)
    if (token.token[1] === "admin") {
      navigate("/")
    } else if (window.localStorage.length === 0) {
      this.props.dispatch({
        type: "member/logout",
        callback: () => {
          navigate("/Login")
        },
      })
      navigate("/Login")
    }
    this.GET_Cart();
  }
  GET_Cart = () => {
    this.props.dispatch({
      type: "cart/GET_Cart",
      callback: response => {
        if (response.Message === "發生錯誤。") {
          console.log("happen");
          alert("連線逾時，請重新登入");
          this.props.dispatch({
            type: "member/logout",
          })
          navigate("/Login");
        } else {
          if (response.length === 0) {
            alert("購物車現在空空如也，快手刀去逛逛!!!");
            navigate("/Products");
          } else {
            this.setState({
              products: response
            })
            const products_local = [];
            response.forEach(product => {
              const data = { "id": product.Product_Id, "Name": product.Name, "Price": product.Cheapest_price, "quantity": 1 }
              products_local.push(data)
            })
            localStorage.setItem("product", JSON.stringify(products_local));
          }
        }
      }
    })
  }
  render() {
    return (
      <div className="product-content">
        {this.state.products.map((product, i) => {
          return (
            <Product
              key={i}
              id={product.Product_Id}
              img={product.Url}
              brand={product.Brand}
              name={product.Name}
              new_price={product.Cheapest_price}
            />
          )
        })}

        <Link to="/Checkout">
          <StepNext
            next={this.state.next}
            icon={faDollarSign}
          />
        </Link>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLogin: state.member.isLogin,
  };
}

export default connect(mapStateToProps)(ShoppingCart);
