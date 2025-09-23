import { useEffect, useState } from "react"

export default function KjoeretoeyRad({
        id,
        kjennemerke,
        egenvekt,
        totalvekt,
        kjoeretoeytype,
        drivstoff,
        foerstegangsregistreringsdato,
        tabellRedigertRad,
        settTabellRedigertRad,
        tabellRerender
    }) {
    const originaltKjoeretoey = {
        kjennemerke: kjennemerke,
        egenvekt: egenvekt,
        totalvekt: totalvekt,
        kjoeretoeytype: kjoeretoeytype,
        drivstoff: drivstoff,
        foerstegangsregistreringsdato: foerstegangsregistreringsdato
    }

    const [redigertKjoeretoey, settRedigertKjoeretoey] = useState(originaltKjoeretoey)

    const underRedigering = (id === tabellRedigertRad);

    function sendOnClick() {
        const stringifiedRedigertKjoeretoey = JSON.stringify(redigertKjoeretoey)
        if (JSON.stringify(originaltKjoeretoey) !== stringifiedRedigertKjoeretoey) {
            fetch(`http://localhost:8080/api/kjoeretoey/${kjennemerke}/oppdater`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: stringifiedRedigertKjoeretoey
            })
            settTabellRedigertRad(undefined)
        }
    }

    function slettOnClick() {
        fetch(`http://localhost:8080/api/kjoeretoey/${kjennemerke}/fjern`, { method: 'DELETE' })
        tabellRerender()
    }

    function kjoeretoeyverdiOnChange(event, noekkel) {
        settRedigertKjoeretoey(
            {...redigertKjoeretoey, [noekkel]: event.target.value}
        )
    }
    
    return (
        <tr>
            <td>{kjennemerke}</td>
            <td><input id={id+"egenvekt"} type="number" value={redigertKjoeretoey.egenvekt} disabled={!underRedigering} onChange={e => kjoeretoeyverdiOnChange(e, "egenvekt")} /></td>
            <td><input id={id+"totalvekt"} type="number" value={redigertKjoeretoey.totalvekt} disabled={!underRedigering} onChange={e => kjoeretoeyverdiOnChange(e, "totalvekt")} /></td>
            <td><select
            id={id+"kjoeretoeytype"} value={redigertKjoeretoey.kjoeretoeytype} disabled={!underRedigering} onChange={e => kjoeretoeyverdiOnChange(e, "kjoeretoeytype")}
            >
                <option value="PERSONBIL">PERSONBIL</option>
                <option value="VAREBIL">VAREBIL</option>
            </select></td>
            <td><select id={id+"drivstoff"} value={redigertKjoeretoey.drivstoff} disabled={!underRedigering} onChange={e => kjoeretoeyverdiOnChange(e, "drivstoff")}>
                <option value="BENSIN">BENSIN</option>
                <option value="DIESEL">DIESEL</option>
                <option value="ELEKTRISITET">ELEKTRISITET</option>
            </select></td>
            <td><input
                id={id+"foerstegangsregistreringsdato"}
                type="date"
                value={redigertKjoeretoey.foerstegangsregistreringsdato}
                disabled={!underRedigering}
                onChange={e => kjoeretoeyverdiOnChange(e, "foerstegangsregistreringsdato")}
            /></td>
            <td className="knappTabell">
                <button className="groennKnapp" onClick={()=> underRedigering ?  sendOnClick() : settTabellRedigertRad(id)}>
                    {underRedigering ? "Send" : "Rediger"}
                </button>
                <button className="roedKnapp" onClick={()=> underRedigering ? settTabellRedigertRad(undefined) : slettOnClick()}>
                    {underRedigering ? "Avbryt" : "Slett"}
                </button>
            </td>
        </tr>
    )
}