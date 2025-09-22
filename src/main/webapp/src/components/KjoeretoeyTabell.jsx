import { useState, useEffect } from "react"

import KjoeretoeyRad from "./KjoeretoeyRad";

export default function KjoeretoeyTabell() {
    const [kjoeretoey, settKjoeretoey] = useState({})

    useEffect(() => {
        fetch("http://localhost:8080/api/kjoeretoey/hentAlle")
            .then(res => res.json())
            .then(data => settKjoeretoey(data))
    }, [])

    return (
        <table>
            <th>Kjennemerke</th>
            <th>Egenvekt</th>
            <th>Totalvekt</th>
            <th>Kjøretøytype</th>
            <th>Drivstoff</th>
            <th>Førstegangsregistreringsdato</th>
            <th className="knappTabell" />
            {
                kjoeretoey.map((x, i) =>
                    <KjoeretoeyRad
                        id = {i}
                        kjennemerke={x.kjennemerke}
                        egenvekt={x.egenvekt}
                        totalvekt={x.totalvekt}
                        kjoeretoeytype={x.kjoeretoeytype}
                        drivstoff={x.drivstoff}
                        foerstegangsregistreringsdato={x.foerstegangsregistreringsdato}
                    />
                )
            }
        </table>
    )
}