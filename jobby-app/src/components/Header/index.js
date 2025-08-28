import {withRouter, Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  const onClickLogo = () => {
    const {history} = props
    history.push('/')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
          onClick={onClickLogo}
        />
      </Link>
      <ul className="routes-container">
        <li className="list-item">
          <Link to="/" className="list-item">
            Home
          </Link>
        </li>
        <li className="list-item">
          <Link to="/jobs" className="list-item">
            Jobs
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
