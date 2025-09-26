import { useState, useEffect } from "react"

import KjoeretoeyRad from "./KjoeretoeyRad";

export default function KjoeretoeyTabell() {
    const [kjoeretoey, settKjoeretoey] = useState({})
    const [redigertRad, settRedigertRad] = useState(undefined)
    const [refetch, settRefetch] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/kjoeretoey/hentAlle")
            .then(res => res.json())
            .then(data => settKjoeretoey(data))
        return settKjoeretoey({})
    }, [refetch])

    return (
        <section>
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
                                refetchTable={()=>settRefetch(prev=>!prev)}
                                nyRad={false}
                            />
                        )
                    }
                    <KjoeretoeyRad
                        key={-1}
                        id = {-1}
                        kjennemerke={""}
                        egenvekt={""}
                        totalvekt={""}
                        kjoeretoeytype={"PERSONBIL"}
                        drivstoff={"BENSIN"}
                        foerstegangsregistreringsdato={""}
                        tabellRedigertRad={redigertRad}
                        settTabellRedigertRad={settRedigertRad}
                        refetchTable={()=>settRefetch(prev=>!prev)}
                        nyRad={true}
                    />
                </tbody>
            </table>
        </section>
    )
}