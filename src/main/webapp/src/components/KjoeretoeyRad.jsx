import RedigerKnapp from "./RedigerKnapp"
import SlettKnapp from "./SlettKnapp"

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
        settTabellKjoeretoey
    }) {
    const disabled = (id !== tabellRedigertRad);

    function rediger() {
        if (disabled) {
            settTabellRedigertRad(id)
        }
        else {
            fetch(`http://localhost:8080/api/kjoeretoey/${kjennemerke}/oppdater`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    kjennemerke: kjennemerke,
                    egenvekt: 0,
                    totalvekt: 0,
                    kjoeretoeytype: "PERSONBIL",
                    drivstoff: "BENSIN",
                    foerstegangsregistreringsdato: "1111-01-01"
                })
            })

            settTabellRedigertRad(undefined)
            settTabellKjoeretoey({})
        }
    }

    function slett() {
        fetch(`http://localhost:8080/api/kjoeretoey/${kjennemerke}/fjern`, { method: 'DELETE' })
        settTabellKjoeretoey({})
    }
    
    return (
        <tr>
            <td><input id={id+"kjennemerke"} value={kjennemerke} disabled={disabled} /></td>
            <td><input id={id+"egenvekt"} value={egenvekt} disabled={disabled} /></td>
            <td><input id={id+"totalvekt"} value={totalvekt} disabled={disabled} /></td>
            <td><input id={id+"kjoeretoeytype"} value={kjoeretoeytype} disabled={disabled} /></td>
            <td><input id={id+"drivstoff"} value={drivstoff} disabled={disabled} /></td>
            <td><input id={id+"foerstegangsregistreringsdato"} value={foerstegangsregistreringsdato} disabled={disabled} /></td>
            <td className="knappTabell">
                <RedigerKnapp onClick={rediger}/>
                <SlettKnapp onClick={slett}/></td>
        </tr>
    )
}