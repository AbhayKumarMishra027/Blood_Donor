function StatsBar({ total, available }) {
  return (
    <div className="stats">
      <p>Filtered donors: {total}</p>
      <p>Available donors: {available}</p>
    </div>
  )
}

export default StatsBar