import {BsStarFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa' //
//
import './index.css'

const DetailedJobView = props => {
  const {jobDetails, similarJobDetails} = props
  const {companyWebsiteUrl, employementType, jobDescription} = jobDetails
  const {lifeAtCompany, location, packagePerAnnum, rating} = jobDetails
  const {companyLogoUrl, skills, id} = jobDetails
  const {description} = lifeAtCompany
  const imageurl = lifeAtCompany.image_url

  return (
    <div className="detailed-job-view-container">
      <div className="company-details-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="company-logo"
        />
        <div>
          <h1>{jobDetails.title}</h1>
          <div className="rating-container">
            <BsStarFill className="rating-icon" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="location-employement-salary-container">
        <p>{location}</p>
        <p>{employementType}</p>
        <p>{packagePerAnnum}</p>
      </div>
      <hr className="hr-line" />
      <ul className="desc-vist-container">
        <li>
          <h1 className="description-heading">Description</h1>
        </li>
        <li>
          <a
            className="share-icon"
            href={companyWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit
          </a>
          <FaExternalLinkAlt className="share-icon" />
        </li>
      </ul>
      <p>{jobDescription}</p>
      <h1 className="skill-heading">Skills</h1>
      <ul className="skills-list">
        {skills.map(eachSkill => (
          <li className="skill-list-item" key={eachSkill.name}>
            <img src={eachSkill.image_url} alt={eachSkill.name} />
            <p>{eachSkill.name}</p>
          </li>
        ))}
      </ul>
      <h1 className="skill-heading">Life at Company</h1>
      <div className="life-at-company-container">
        <p>{description}</p>
        <img src={imageurl} alt="life at company" />
      </div>
    </div>
  )
}

export default DetailedJobView
