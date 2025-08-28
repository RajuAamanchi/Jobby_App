import {Route, Switch, Redirect, withRouter} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import JobItemDetails from './components/JobItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import Header from './components/Header'

import './App.css'

const App = props => {
  const {location} = props
  const hideHeader =
    location.pathname === '/login' || location.pathname === '/not-found'

  return (
    <>
      {!hideHeader && <Header />}
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/jobs" component={Jobs} />
        <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
        <Route path="/not-found" component={NotFound} /> {/* ✅ FIXED */}
        <Redirect to="/not-found" /> {/* ✅ FIXED */}
      </Switch>
    </>
  )
}

export default withRouter(App)
