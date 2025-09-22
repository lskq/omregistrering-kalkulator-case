export default function KjoeretoeyRad({
        kjennemerke,
        egenvekt,
        totalvekt,
        kjoeretoeytype,
        drivstoff,
        foerstegangsregistreringsdato
    }) {
    return (
        <tr>
            <td>{kjennemerke}</td>
            <td>{egenvekt}</td>
            <td>{totalvekt}</td>
            <td>{kjoeretoeytype}</td>
            <td>{drivstoff}</td>
            <td>{foerstegangsregistreringsdato}</td>
        </tr>
    )
}