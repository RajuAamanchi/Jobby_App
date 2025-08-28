import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorTextShow: false, errorMessage: ''}

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
  }

  onSubmitForm = async event => {
    event.preventDefault()
    this.getdetails()
  }

  getdetails = async () => {
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const {history} = this.props
      const data = await response.json()
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      const data = await response.json()
      this.setState({errorTextShow: true, errorMessage: data.error_msg})
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderLoginForm = () => {
    const {username, password, errorTextShow, errorMessage} = this.state

    return (
      <div className="login-form-container">
        <div className="logo-title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </div>
        <form onSubmit={this.onSubmitForm} className="login-details-container">
          <div>
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="username"
              value={username}
              placeholder="USERNAME"
              className="input-element"
              onChange={this.onChangeUserName}
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="password"
              value={password}
              placeholder="PASSWORD"
              className="input-element"
              onChange={this.onChangePassword}
            />
          </div>
          <div>
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
        {errorTextShow && <p className="error-msg">*{errorMessage}</p>}
      </div>
    )
  }

  render() {
    return <div className="bg-container">{this.renderLoginForm()}</div>
  }
}

export default LoginForm
