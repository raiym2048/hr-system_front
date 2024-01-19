import './RespondingCandidates.scss'
import FilterRespondingCandidates from '../../components/filterRespondingCandidates/FilterRespondingCandidates'
import RespondingCandidatesCard from '../../components/respondingCandidatesCard/RespondingCandidatesCard'

function RespondingCandidates() {
  return (
    <div className="candidatesVacancies">
      <div className="filterCandidatesResponding">
        <FilterRespondingCandidates />
      </div>
      <RespondingCandidatesCard />
    </div>
  )
}

export default RespondingCandidates
