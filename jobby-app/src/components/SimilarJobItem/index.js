import {BsStarFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const updatedJobDetails = similarJobDetails.map(each => ({
    companyLogoUrl: each.company_logo_url,
    employmentType: each.employment_type,
    id: each.id,
    jobDescription: each.job_description,
    location: each.location,
    rating: each.rating,
    title: each.title,
  }))

  return (
    <ul className="similar-jobs-list">
      {updatedJobDetails.map(each => (
        <li className="each-job-container" key={each.id}>
          <div className="company-logo-container">
            <img
              className="logo"
              alt="similar job company logo"
              src={each.companyLogoUrl}
            />
            <div className="company-details-container">
              <h1 className="title">{each.title}</h1>
              <div className="rating-con">
                <BsStarFill className="star-icon" />
                <p>{each.rating}</p>
              </div>
            </div>
          </div>
          <h1 className="description">Description</h1>
          <p>{each.jobDescription}</p>
          <div className="location-con">
            <p>{each.location}</p>
            <p>{each.employmentType}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SimilarJobItem
