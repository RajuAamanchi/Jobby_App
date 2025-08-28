// JobItemDetailsWrapper.js
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import { TailSpin } from 'react-loader-spinner'
import DetailedJobView from '../DetailedJobView'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusDetails = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class JobItemDetailsWrapper extends Component {
  state = {jobDetails: {}, apiStatus: apiStatusDetails.initial, similarJobs: {}}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {id} = this.props
    console.log('Fetching job details for ID:', id)
    this.setState({apiStatus: apiStatusDetails.progress})
    const url = `https://apis.ccbp.in/jobs/${id}`
    console.log('API URL:', url)
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    console.log('JWT Token:', Cookies.get('jwt_token'))

    const response = await fetch(url, options)
    console.log('API response:', response)

    if (response.ok === true) {
      const data = await response.json()
      const jobItemDetails = data.job_details
      const similarJobDetails = data.similar_jobs
      const updatedJobDetails = {
        companyLogoUrl: jobItemDetails.company_logo_url,
        companyWebsiteUrl: jobItemDetails.company_website_url,
        employementType: jobItemDetails.employment_type,
        id: jobItemDetails.id,
        jobDescription: jobItemDetails.job_description,
        skills: jobItemDetails.skills,
        lifeAtCompany: jobItemDetails.life_at_company,
        location: jobItemDetails.location,
        packagePerAnnum: jobItemDetails.package_per_annum,
        rating: jobItemDetails.rating,
        title: jobItemDetails.title,
      }
      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: similarJobDetails,
        apiStatus: apiStatusDetails.success,
      })
    } else {
      this.setState({apiStatus: apiStatusDetails.failed})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      {/* <Loader type="ThreeDots" color="#ffffff" height="50" width="50" /> */}
      <TailSpin
  height="50"
  width="50"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
    </div>
  )

  renderJobsListFailureView = () => (
    <div className="jobs-list-failure-view-container">
      <h1>This is Failure View</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="jobs-retry-button"
        onClick={this.onClickRetryJobs}
      >
        Retry
      </button>
    </div>
  )

  onClickRetryJobs = () => this.getJobItemDetails()

  renderJobDetailsSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    return (
      <div className="detailed-container">
        <DetailedJobView
          similarJobDetails={similarJobs}
          jobDetails={jobDetails}
          key={jobDetails.id}
        />
        <h1 className="JobDetails">Similar Jobs</h1>
        <SimilarJobItem similarJobDetails={similarJobs} />
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    return (
      <>
        {(() => {
          switch (apiStatus) {
            case apiStatusDetails.progress:
              return this.renderLoaderView()
            case apiStatusDetails.success:
              return this.renderJobDetailsSuccessView()
            case apiStatusDetails.failed:
              return this.renderJobsListFailureView()
            default:
              return null
          }
        })()}
      </>
    )
  }

  render() {
    return <div className="jobs-container">{this.renderJobDetails()}</div>
  }
}

export default JobItemDetailsWrapper
