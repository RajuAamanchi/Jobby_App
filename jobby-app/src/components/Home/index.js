import {Link} from 'react-router-dom'

import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <div className="home-bg-container">
      <h1 className="main-heading">
        Find The Job That
        <br /> Fits Your Life
      </h1>
      <p className="description">
        Millions of people are searching for jobs, salary <br /> information,
        company reviews. Find the job that fits your <br /> abilities and
        potential.
      </p>
      <Link to="/jobs">
        <button
          type="button"
          className="find-jobs-button"
          onClick={onClickFindJobs}
        >
          Find Jobs
        </button>
      </Link>
    </div>
  )
}

export default Home
