import {Component} from 'react'
import Cookies from 'js-cookie'
// import Loader from 'react-loader-spinner'
import { TailSpin } from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusDetails = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

const jobsListapiStatusDetails = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
  nojobs: 'NO_JOBS',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiStatusDetails.initial,
    selectedSalaryRange: '',
    listOfJobs: [],
    jobsListapiStatus: jobsListapiStatusDetails.initial,
    searchInput: '',
    selectedEmploymentTypes: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusDetails.progress})
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedProfileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedProfileDetails,
        apiStatus: apiStatusDetails.success,
      })
    } else {
      this.setState({apiStatus: apiStatusDetails.failed})
    }
  }

  getJobsList = async () => {
    this.setState({jobsListapiStatus: jobsListapiStatusDetails.progress})
    const {selectedEmploymentTypes, selectedSalaryRange} = this.state
    const {searchInput} = this.state
    const employmentTypeQuery = selectedEmploymentTypes.join(',')
    const salaryRangeQuery = selectedSalaryRange
    const searchQuery = searchInput
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${salaryRangeQuery}&search=${searchQuery}`
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobsList = data.jobs
      if (jobsList.length === 0) {
        this.setState({jobsListapiStatus: 'NO_JOBS'})
      } else {
        const updatedListOfJobs = jobsList.map(eachjobItem => ({
          companyLogoUrl: eachjobItem.company_logo_url,
          employementType: eachjobItem.employment_type,
          id: eachjobItem.id,
          jobDescription: eachjobItem.job_description,
          location: eachjobItem.location,
          packagePerAnnum: eachjobItem.package_per_annum,
          rating: eachjobItem.rating,
          title: eachjobItem.title,
        }))

        this.setState({
          listOfJobs: updatedListOfJobs,
          jobsListapiStatus: jobsListapiStatusDetails.success,
        })
      }
    } else {
      this.setState({jobsListapiStatus: jobsListapiStatusDetails.failed})
    }
  }

  renderJobsListView = () => {
    const {listOfJobs} = this.state

    return (
      <ul className="jobs-list-container">
        {listOfJobs.map(eachjob => (
          <JobItem jobDetails={eachjob} key={eachjob.id} />
        ))}
      </ul>
    )
  }

  onClickRetryJobs = () => this.getJobsList()

  renderJobsListFailureView = () => (
    <div className="jobs-list-failure-view-container">
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

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsList()
  }

  renderNoJobsView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderJobDetailsList = () => {
    const {jobsListapiStatus, searchInput} = this.state

    return (
      <>
        <div className="search-input-container">
          <input
            className="search-input-element"
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button
            className="search-button"
            type="button"
            data-testid="searchButton"
            onClick={this.onClickSearchButton}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>

        {(() => {
          switch (jobsListapiStatus) {
            case jobsListapiStatusDetails.progress:
              return this.renderLoaderView()
            case jobsListapiStatusDetails.success:
              return this.renderJobsListView()
            case jobsListapiStatusDetails.failed:
              return this.renderJobsListFailureView()
            case jobsListapiStatusDetails.nojobs:
              return this.renderNoJobsView()
            default:
              return null
          }
        })()}
      </>
    )
  }

  renderProfileView = () => {
    const {profileDetails} = this.state

    return (
      <div className="profile-container">
        <img src={profileDetails.profileImageUrl} alt="profile" />
        <h1>{profileDetails.name}</h1>
        <p>{profileDetails.shortBio}</p>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      {/* <Loader type="ThreeDots" color="#ffffff" height="50" width="50" /> */}
      <TailSpin
  height={50}
  width={50}
  color="#somecolor"
  ariaLabel="loading"
/>

    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <button
        type="button"
        onClick={this.getProfileDetails}
        className="retry-profile-button"
      >
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusDetails.success:
        return this.renderProfileView()
      case apiStatusDetails.failed:
        return this.renderFailureView()
      case apiStatusDetails.progress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  onChangeSalaryRange = event => {
    const salaryRangeId = event.target.value
    this.setState({selectedSalaryRange: salaryRangeId}, this.getJobsList)
  }

  onChangeEmploymentType = event => {
    const {value, checked} = event.target
    const {selectedEmploymentTypes} = this.state
    let updatedSelectedTypes = []

    if (checked) {
      updatedSelectedTypes = [...selectedEmploymentTypes, value]
    } else {
      updatedSelectedTypes = selectedEmploymentTypes.filter(
        typeId => typeId !== value,
      )
    }
    this.setState(
      {selectedEmploymentTypes: updatedSelectedTypes},
      this.getJobsList,
    )
  }

  renderFiltersContainer = () => {
    const {selectedEmploymentTypes} = this.state
    return (
      <div className="filters-container">
        {this.renderProfileDetails()}
        <hr />
        <h1 className="employment-type-heading">Type of Employment</h1>
        <ul className="employment-type-list">
          {employmentTypesList.map(eachItem => (
            <li className="employment-type-list-item" key={eachItem.label}>
              <input
                type="checkbox"
                id={eachItem.employmentTypeId}
                value={eachItem.employmentTypeId}
                onChange={this.onChangeEmploymentType}
                checked={selectedEmploymentTypes.includes(
                  eachItem.employmentTypeId,
                )}
              />
              <label
                htmlFor={eachItem.employmentTypeId}
                className="employment-type-label"
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
        <hr />
        <h1 className="employment-type-heading">Salary Range</h1>
        <ul className="employment-type-list">
          {salaryRangesList.map(eachItem => (
            <li
              className="employment-type-list-item"
              key={eachItem.salaryRangeId}
            >
              <input
                type="radio"
                id={eachItem.salaryRangeId}
                name="salary-range"
                value={eachItem.salaryRangeId}
                onChange={this.onChangeSalaryRange} // optional: if you're handling selection
              />
              <label
                className="employment-type-label"
                htmlFor={eachItem.salaryRangeId}
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="jobs-container">
        <div>{this.renderFiltersContainer()}</div>
        <div>{this.renderJobDetailsList()}</div>
      </div>
    )
  }
}

export default Jobs
