function DonorCard({ donor, requested, onRequest }) {
  return (
    <div className="card">

      <h3>{donor.name}</h3>
      <p>Blood Group: {donor.bloodGroup}</p>
      <p>City: {donor.address.city}</p>

      {/* ⭐ Bottom Action Row */}
      <div className="card-actions">

        <span
          className={`badge ${
            donor.available ? "available" : "unavailable"
          }`}
        >
          {donor.available ? "Available" : "Not Available"}
        </span>

        <button
          disabled={!donor.available || requested}
          onClick={() => onRequest(donor.id)}
          className={`request-btn ${requested ? "green" : "red"}`}
        >
          {requested ? "Already Requested ✓" : "Request Help"}
        </button>

      </div>

    </div>
  )
}

export default DonorCard