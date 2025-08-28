// JobItemDetails.js
import {useParams} from 'react-router-dom'
import JobItemDetailsWrapper from '../JobItemDetailsWrapper'

const JobItemDetails = () => {
  const {id} = useParams()
  return <JobItemDetailsWrapper id={id} />
}

export default JobItemDetails
