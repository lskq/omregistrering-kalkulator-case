import { useState } from "react"

import RedigerKnapp from "./RedigerKnapp"
import SlettKnapp from "./SlettKnapp"

export default function KjoeretoeyRad({
        id,
        kjennemerke,
        egenvekt,
        totalvekt,
        kjoeretoeytype,
        drivstoff,
        foerstegangsregistreringsdato
    }) {
    const [rediger, settRediger] = useState(false)
    const disabled = !rediger
    
    return (
        <tr>
            <td><input id={id+"kjennemerke"} value={kjennemerke} disabled={disabled} /></td>
            <td><input id={id+"egenvekt"} value={egenvekt} disabled={disabled} /></td>
            <td><input id={id+"totalvekt"} value={totalvekt} disabled={disabled} /></td>
            <td><input id={id+"kjoeretoeytype"} value={kjoeretoeytype} disabled={disabled} /></td>
            <td><input id={id+"drivstoff"} value={drivstoff} disabled={disabled} /></td>
            <td><input id={id+"foerstegangsregistreringsdato"} value={foerstegangsregistreringsdato} disabled={disabled} /></td>
            <td className="knappTabell">
                <RedigerKnapp onClick={()=>settRediger(prev=>!prev)}/>
                <SlettKnapp onClick={()=>console.log("slett " + id)}/></td>
        </tr>
    )
}