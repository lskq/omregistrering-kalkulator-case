import { useState } from "react"

export default function OmregistreringsKalkulator() {
    const [kjennemerke, settKjennemerke] = useState("")
    const [avgift, settAvgift] = useState(undefined)

    function kalkulerOnClick() {
        console.log("kalkuler");
        fetch(`http://localhost:8080/api/omregistrering/${kjennemerke}`)
            .then(response => response.json())
            .then(data=> isNaN(data) ? settAvgift(undefined) : settAvgift(data))
    }
    
    return (
        <section id="Oppgave3">
            <h3>Omregistreringskalkulator</h3>
            <input type="text" placeholder="e.g. PN98765" value={kjennemerke} onChange={e => settKjennemerke(e.target.value)}/>
            <button className="svartKnapp" onClick={kalkulerOnClick}>Kalkuler</button>
            {(avgift !== undefined) && <p>Avgiften er {avgift} kr.</p>}
        </section>
    )
}