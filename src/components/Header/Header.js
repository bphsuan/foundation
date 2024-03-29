import React from 'react';
import { Link } from 'gatsby';
import './Header.scss';
import { connect } from 'react-redux';
import Logo from '../../images/background/foundationLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { navigate } from 'gatsby';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      bar: false,
      width: 0,
      location: "",
    }
  }
  componentDidMount() {
    this.setState({ location: window.location.pathname }) //抓路由
    this.maintainLoginState();
  }
  menuShow() {
    this.setState({ menu: true })
  }
  menuHide() {
    this.setState({ menu: false })
  }
  maintainLoginState = () => {
    const token = (localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")) : {
      token: []
    };
    localStorage.getItem(token);
    if (token.token.length !== 0) {
      this.props.dispatch({
        type: "member/Maintain_loginState",
        callback: () => {

        }
      })
    }
  }
  toShoppingCart = () => {
    if (this.props.isLogin !== "user") {
      alert("您尚未登入!");
      navigate("/Login");
    } else {
      navigate("/ShoppingCart");
    }
  }
  toDetection = () => {
    if (this.props.isLogin !== "user") {
      alert("您尚未登入!");
      navigate("/Login");
    } else {
      navigate("/Detection");
    }
  }
  logout = () => {
    this.props.dispatch({
      type: "member/logout",
      callback: () => {
        return navigate('/') //redirect to homepage
      }
    })
  }
  render() {
    const dispear = {
      display: "none",
    }
    const apear = {
      display: "block",
    }
    const iconDispear = {
      display: "none",
    }
    const iconApear = {
      display: "inline-block",
    }
    const menuShow = {
      left: "0",
    }
    const menuHide = {
      left: "-305px",
    }
    return (
      <div className="Header">
        <div className="bar">
          <FontAwesomeIcon
            className="barIcon"
            icon={faBars}
            style={this.state.menu ? dispear : apear}
            onClick={this.menuShow.bind(this)}
          />
          <FontAwesomeIcon
            className="barIcon"
            icon={faTimes}
            style={this.state.menu ? apear : dispear}
            onClick={this.menuHide.bind(this)}
          />
        </div>
        <Link to="/" className="logo">
          <img src={Logo} />
        </Link>
        <div className="nav" style={this.state.menu ? menuShow : menuHide}>
          <Link
            id="detection"
            to={this.props.isLogin === "user" ? "/Detection" : "/Login"}
            className={this.state.location === "/Detection" || this.state.location === "/Detection/" ? "active" : ""}
            style={this.props.isLogin === "admin" ? iconDispear : iconApear}
            onClick={this.toDetection}
          >
            色號檢測｜Detection
          </Link>
          <Link
            to="/Products"
            id="products"
            className={this.state.location === "/Products" ? "active" : ""}
            style={this.props.isLogin === "admin" ? iconDispear : iconApear}
          >
            產品介紹｜Products
          </Link>
          <Link
            id="memberManagement"
            to={this.props.isLogin === "admin" ? "/MemberJoinData" : "/Login"}
            className={this.state.location === "/MemberJoinData" ? "active" : ""}
            style={this.props.isLogin === "user" || this.props.isLogin === "guest" || this.props.isLogin === "" ? iconDispear : iconApear}
          >
            會員管理｜Member
          </Link>
          <Link
            id="productManagement"
            to={this.props.isLogin === "admin" ? "/ProductManagement" : "/Login"}
            className={this.state.location === "/ProductManagement" ? "active" : ""}
            style={this.props.isLogin === "user" || this.props.isLogin === "guest" || this.props.isLogin === "" ? iconDispear : iconApear}
          >
            產品管理｜Product
          </Link>
          <Link
            to="/Statistic"
            id="statistic"
            className={this.state.location === "/Statistic" ? "active" : ""}
          >
            統計數據｜Statistic
          </Link>
          <Link
            to="/Contact"
            id="contact"
            className={this.state.location === "/Contact" ? "active" : ""}
            style={this.props.isLogin === "admin" ? iconDispear : iconApear}
          >
            聯絡我們｜Contact
          </Link>
          <Link
            id="feedback"
            to={this.props.isLogin === "admin" ? "/FeedbackManagement" : "/Login"}
            className={this.state.location === "/FeedbackManagement" ? "active" : ""}
            style={this.props.isLogin === "user" || this.props.isLogin === "guest" || this.props.isLogin === "" ? iconDispear : iconApear}
          >
            回饋管理｜Feedback
          </Link>
          <div className="headerIcons">
            <Link
              to={this.props.isLogin === "user" ? "/ShoppingCart" : "/Login"}
              onClick={this.toShoppingCart}
              className="headerIcon"
              style={this.props.isLogin === "admin" ? iconDispear : iconApear}
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
              />
            </Link>
            <Link
              to="/PersonalInfo"
              className="headerIcon"
              style={this.props.isLogin === "user" ? iconApear : iconDispear}
            >
              <FontAwesomeIcon
                icon={faUserCircle}
              />
            </Link>
            <Link
              to="/Login"
              className="headerIcon"
              style={this.props.isLogin === "user" || this.props.isLogin === "admin" ? iconDispear : iconApear}
            >
              <FontAwesomeIcon
                icon={faSignInAlt}
              />
            </Link>
            <Link
              to="/"
              className="headerIcon"
              style={this.props.isLogin === "user" || this.props.isLogin === "admin" ? iconApear : iconDispear}
              onClick={this.logout.bind(this)}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
              />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLogin: state.member.isLogin,
    token: state.member.token
  };
}

export default connect(mapStateToProps)(Header)
