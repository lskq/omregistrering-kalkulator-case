import { useState, useEffect } from "react"

import KjoeretoeyRad from "./KjoeretoeyRad";

export default function KjoeretoeyTabell() {
    const [kjoeretoey, settKjoeretoey] = useState({})
    const [render, settRender] = useState(false)
    const [redigertRad, settRedigertRad] = useState(undefined)

    useEffect(() => {
        fetch("http://localhost:8080/api/kjoeretoey/hentAlle")
            .then(res => res.json())
            .then(data => settKjoeretoey(data))
        console.log("EFFECT")
    }, [render])
    
    function rerender() {
        settRender(prev => !prev)
    }
    return (
        <section id="Oppgave1og2">
            <h2>Oppgave 1 & 2</h2>
            <table>
                <thead>
                    <tr>
                        <th>Kjennemerke</th>
                        <th>Egenvekt</th>
                        <th>Totalvekt</th>
                        <th>Kjøretøytype</th>
                        <th>Drivstoff</th>
                        <th>Førstegangsregistreringsdato</th>
                        <th className="knappTabell" />
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(kjoeretoey) && kjoeretoey.map((x, i) =>
                            <KjoeretoeyRad
                                key={i}
                                id = {i}
                                kjennemerke={x.kjennemerke}
                                egenvekt={x.egenvekt}
                                totalvekt={x.totalvekt}
                                kjoeretoeytype={x.kjoeretoeytype}
                                drivstoff={x.drivstoff}
                                foerstegangsregistreringsdato={x.foerstegangsregistreringsdato}
                                tabellRedigertRad={redigertRad}
                                settTabellRedigertRad={settRedigertRad}
                                tabellRerender={rerender}
                            />
                        )
                    }
                </tbody>
            </table>
        </section>
    )
}