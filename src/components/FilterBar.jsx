function FilterBar({ bloodGroup, setBloodGroup, setSearchCity }) {
  return (
    <div className="filter-bar">

      <div className="input-group">
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="All">All Groups</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="O+">O+</option>
        </select>
      </div>

      <div className="input-group">
        <input
          placeholder="Search city..."
          onChange={(e) => setSearchCity(e.target.value)}
        />
      </div>

    </div>
  )
}

export default FilterBar