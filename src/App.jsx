import { useState, useEffect } from "react"
import DonorCard from "./components/DonorCard"
import StatsBar from "./components/StatsBar"
import FilterBar from "./components/FilterBar"
import "./App.css"

function App() {

  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)
  const [bloodGroup, setBloodGroup] = useState("All")
  const [searchCity, setSearchCity] = useState("")
  const [requested, setRequested] = useState(() => {
    const saved = localStorage.getItem("requestedDonors")
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {

    const savedDonors = localStorage.getItem("donorData")

    if (savedDonors) {
      setDonors(JSON.parse(savedDonors))
      setLoading(false)
      return
    }

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {

        const bloodGroups = ["A+", "B+", "O-", "AB+", "O+"]

        const mapped = data.map(user => ({
          ...user,
          bloodGroup:
            bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
          available: Math.random() > 0.3
        }))

        setDonors(mapped)
        localStorage.setItem("donorData", JSON.stringify(mapped))
        setLoading(false)
      })

  }, [])

  useEffect(() => {
    localStorage.setItem(
      "requestedDonors",
      JSON.stringify(requested)
    )
  }, [requested])

  const filteredDonors = donors.filter(donor => {

    const matchBlood =
      bloodGroup === "All" || donor.bloodGroup === bloodGroup

    const matchCity =
      donor.address.city
        .toLowerCase()
        .includes(searchCity.toLowerCase())

    return matchBlood && matchCity
  })

  const availableCount =
    filteredDonors.filter(d => d.available).length

  const handleRequest = (id) => {
    setRequested(prev => ({
      ...prev,
      [id]: true
    }))
  }

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Fetching Donors...</p>
      </div>
    )
  }

  return (
    <div className="container">

      <div className="hero-panel">

        <h1 className="title">🩸 Blood Donor Finder</h1>

        <FilterBar
          bloodGroup={bloodGroup}
          setBloodGroup={setBloodGroup}
          setSearchCity={setSearchCity}
        />

        <StatsBar
          total={filteredDonors.length}
          available={availableCount}
        />

      </div>

      <div className="card-grid">
        {
          [...filteredDonors]
            .sort((a, b) => b.available - a.available)
            .map(donor => (
              <DonorCard
                key={donor.id}
                donor={donor}
                requested={requested[donor.id]}
                onRequest={handleRequest}
              />
            ))
        }
      </div>

    </div>
  )
}

export default App