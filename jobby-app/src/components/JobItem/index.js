import {BsStarFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employementType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails
  return (
    <li className="job-list-item">
      <Link to={`/jobs/${id}`}>
        <div className="job-title-container">
          <img
            src={companyLogoUrl}
            className="comany-logo-image"
            alt="company logo"
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <BsStarFill className="rating-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
        <div className="location-package-type-container">
          <p>{location}</p>
          <p>{employementType}</p>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description-heading">Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
