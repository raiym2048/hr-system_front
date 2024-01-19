import './AllVacancies.scss'
import FilterAllVacancies from '../../components/filterAllVacancies/FilterAllVacancies'
import AllVacanciesCard from '../../components/allVacanciesCard/AllVacanciesCard'

function AllVacancies() {
  return (
    <div className="contentAllVacancies">
      <FilterAllVacancies />
      <AllVacanciesCard />
    </div>
  )
}

export default AllVacancies
