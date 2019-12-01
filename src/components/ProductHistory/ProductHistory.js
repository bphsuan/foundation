import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './ProductHistory.scss';
import { Link } from 'gatsby';
import { connect } from "react-redux";
import { navigate } from 'gatsby';
import Title from '../Title/Title';
import { Bar, Radar, Doughnut } from 'react-chartjs-2';
const PicServer = "http://foundation.hsc.nutc.edu.tw";
class ProductHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titlebuyFrequency: "個人購買次數",
      titlebuyBrand: "購買品牌頻率",
      products: [],
      buyFrequencyKey: [],
      buyFrequencyValue: [],
      buyBrandKey: [],
      buyBrandValue: []
    }
  }
  componentDidMount() {
    this.getProductHistory();
    this.GET_buyFrequencyChart();
    this.GET_buyBrandChart();
  }
  getProductHistory = () => {
    this.props.dispatch({
      type: "member/GET_BuyHistories",
      callback: response => {
        if (response.Message === "發生錯誤。") {
          alert("連線逾時，請重新登入");
          this.props.dispatch({
            type: "member/logout",
          })
          navigate("/Login");
        } else {
          console.log(response);
          this.setState({
            products: response
          })
        }
      }
    })
  }
  GET_buyFrequencyChart = () => {
    this.props.dispatch({
      type: "chart/Get_buyFrequency",
      callback: response => {
        console.log(response);
        this.setState({
          buyFrequencyKey: response.labels,
          buyFrequencyValue: response.data
        }, () => {
          console.log(this.state.buyFrequencyKey);
          console.log(this.state.buyFrequencyValue);
        })

      }
    })
  }
  GET_buyBrandChart = () => {
    this.props.dispatch({
      type: "chart/Get_buyBrand",
      callback: response => {
        console.log(response);
        this.setState({
          buyBrandKey: response.labels,
          buyBrandValue: response.data
        })

      }
    })
  }
  render() {
    const buyFrequency = {
      labels: this.state.buyFrequencyKey,
      datasets: [
        {
          label: '每月購買次數',
          backgroundColor: 'rgba(255, 209, 209)',
          // borderColor: 'rgba(255,99,132,1)',
          borderWidth: 0,
          hoverBackgroundColor: 'rgba(255, 179, 179)',
          // hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.buyFrequencyValue
        }
      ]
    };
    const buyBrand = {
      labels: this.state.buyBrandKey,
      datasets: [{
        data: this.state.buyBrandValue,
        backgroundColor: [
          '#FFE6D9',
          '#D1E9E9',
          '#EEFFBB',
          '#CCEEFF',
          '#CCCCFF',
          '#FFB3FF',
        ],
        hoverBackgroundColor: [
          '#FFCBB3',
          '#B3D9D9',
          '#DDFF77',
          '#77DDFF',
          '#9999FF',
          '#FF77FF'
        ]
      }]
    };
    return (
      <div className="product-content">
        <Title name={this.state.titlebuyFrequency} />
        <Bar data={buyFrequency} />
        <Title name={this.state.titlebuyBrand} />
        <Doughnut data={buyBrand} />
        {this.state.products.map((product, i) => {
          let buyTime = product.BuyTime.split("T", 1)[0]
          return (
            <div
              key={i}
              id={product.BuyHistory_Id}
              className="product"
            >
              <div className="product-text">
                <p className="product-brand">{product.Brand}</p>
                <p className="product-name">{product.Name}</p>
                <p className="buy-price">{product.Price} X {product.Quantity}</p>
                <p className="time">{buyTime}</p>
              </div>
            </div>
          )
        })}
      </div>

    )
  }
}

export default connect()(ProductHistory);