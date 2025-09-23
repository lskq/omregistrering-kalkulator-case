import { useState } from "react"

/* I retrospekt er nok dette komponentet ganske overloadet. Raden for å registrere
 nye kjøretøy burde nok ha vært et eget komponent - Det ville repetert kode, men vært
 betydelig lettere å lese.*/

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
        refetchTable,
        nyRad
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

    const underRedigering = (id === tabellRedigertRad) || nyRad;

    function sendOnClick() {
        const ingenTommeFelt =  redigertKjoeretoey.kjennemerke &&
                                redigertKjoeretoey.egenvekt &&
                                redigertKjoeretoey.totalvekt &&
                                redigertKjoeretoey.kjoeretoeytype &&
                                redigertKjoeretoey.drivstoff &&
                                redigertKjoeretoey.foerstegangsregistreringsdato

        const stringifiedRedigertKjoeretoey = JSON.stringify(redigertKjoeretoey)

        console.log(stringifiedRedigertKjoeretoey)

        if (ingenTommeFelt && JSON.stringify(originaltKjoeretoey) !== stringifiedRedigertKjoeretoey) {
            fetch(`http://localhost:8080/api/kjoeretoey/${redigertKjoeretoey.kjennemerke}/${nyRad ? "opprett": "oppdater"}`,{
                method: nyRad ? "POST" : "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: stringifiedRedigertKjoeretoey
            })
                .then(refetchTable)
                .then(settTabellRedigertRad(undefined))
        }
    }

    function slettOnClick() {
        fetch(`http://localhost:8080/api/kjoeretoey/${kjennemerke}/fjern`, { method: 'DELETE' })
            .then(refetchTable)
    }

    function kjoeretoeyverdiOnChange(event, noekkel) {
        settRedigertKjoeretoey(
            {...redigertKjoeretoey, [noekkel]: event.target.value}
        )
    }
    
    return (
        <tr>
            <td><input id={id+"kjennemerke"} type="text" value={redigertKjoeretoey.kjennemerke} disabled={!nyRad} onChange={e => kjoeretoeyverdiOnChange(e, "kjennemerke")} /></td>
            <td><input id={id+"egenvekt"} type="number" value={redigertKjoeretoey.egenvekt} disabled={!underRedigering} onChange={e => kjoeretoeyverdiOnChange(e, "egenvekt")} /></td>
            <td><input id={id+"totalvekt"} type="number" value={redigertKjoeretoey.totalvekt} disabled={!underRedigering} onChange={e => kjoeretoeyverdiOnChange(e, "totalvekt")} /></td>
            <td><select
            id={id+"kjoeretoeytype"} value={redigertKjoeretoey.kjoeretoeytype ? redigertKjoeretoey.kjoeretoeytype : "PERSONBIL"} disabled={!underRedigering} onChange={e => kjoeretoeyverdiOnChange(e, "kjoeretoeytype")}
            >
                <option value="PERSONBIL">PERSONBIL</option>
                <option value="VAREBIL">VAREBIL</option>
            </select></td>
            <td><select id={id+"drivstoff"} value={redigertKjoeretoey.drivstoff ? redigertKjoeretoey.drivstoff : "BENSIN"} disabled={!underRedigering} onChange={e => kjoeretoeyverdiOnChange(e, "drivstoff")}>
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
                <button className={nyRad ? "oransjeKnapp" : "groennKnapp"} onClick={()=> underRedigering ?  sendOnClick() : settTabellRedigertRad(id)}>
                    {nyRad ? "Legg til" : underRedigering ? "Send" : "Rediger"}
                </button>
                {
                    !nyRad &&
                    <button className="roedKnapp" onClick={()=> underRedigering ? settTabellRedigertRad(undefined) : slettOnClick()}>
                        {underRedigering ? "Avbryt" : "Slett"}
                    </button>
                }
            </td>
        </tr>
    )
}