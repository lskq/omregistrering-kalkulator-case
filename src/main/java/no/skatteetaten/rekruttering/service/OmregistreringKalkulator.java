package no.skatteetaten.rekruttering.service;

import java.time.LocalDate;

import no.skatteetaten.rekruttering.ekstern.KjoeretoeyRegister;
import no.skatteetaten.rekruttering.ekstern.model.Drivstoff;
import no.skatteetaten.rekruttering.ekstern.model.Kjoeretoey;
import no.skatteetaten.rekruttering.ekstern.model.Kjoeretoeytype;

public class OmregistreringKalkulator {

    /*
     * Kalkuler satser for omregistrering av et kjøretøy, gitt kjøretøysdata og satser.
     * Tar ikke forbehold for veteranstatus.
     * 
     * @param kjoeretoey Teknisk data om et kjøretøy
     * 
     * @param tungPersonbilSats Sats for personbiler >1200kg
     * 
     * @param lettPersonbilSats Sats for personbiler <=1200kg
     * 
     * @param varebilSats Sats for varebiler
     * 
     * @param elektriskSats Sats for elektriske kjøretøy
     * 
     * @return Kjøretøyets omregistreringsavgift
     * 
     */
    public static int kalkulerAvgiftGittKjoeretoeydataOgSatser(
        Kjoeretoey kjoeretoey,
        int tungPersonbilSats,
        int lettPersonbilSats,
        int varebilSats,
        int elektriskSats
    ) {
        boolean elektrisk = kjoeretoey.getDrivstoff() == Drivstoff.ELEKTRISITET;
        boolean personbil = kjoeretoey.getKjoeretoeytype() == Kjoeretoeytype.PERSONBIL;
        boolean tungtKjoeretoey = kjoeretoey.getEgenvekt() > 1200;

        if (elektrisk) {
            return elektriskSats;
        } else {
            if (personbil) {
                if (tungtKjoeretoey) {
                    return tungPersonbilSats;
                } else {
                    return lettPersonbilSats;
                }
            } else {
                return varebilSats;
            }
        }
    }

    /*
     * Kalkulerer satser for omregistrering anno 2022, gitt et kjøretøy.
     *
     * @param kjoeretoey Teknisk data om et kjøretøy
     * 
     * @return Kjøretøyets omregistreringsavgift anno 2022
     */
    public static int kalkulerAvgiftGittKjoeretoeydata(Kjoeretoey kjoeretoey) {
        int foerstegangsregistreringsaar = kjoeretoey.getFoerstegangsregistreringsdato().getYear();
        boolean veteranKjoeretoey = LocalDate.now().getYear() - foerstegangsregistreringsaar > 30;
        
        if (veteranKjoeretoey) {
            return 0;
        } else if (foerstegangsregistreringsaar >= 2019) {
            return  kalkulerAvgiftGittKjoeretoeydataOgSatser(
                        kjoeretoey,
                        6681,
                        4378,
                        2189,
                        1670
                    );
        } else if (foerstegangsregistreringsaar >= 2011) {
            return  kalkulerAvgiftGittKjoeretoeydataOgSatser(
                        kjoeretoey,
                        4034,
                        2880,
                        1383,
                        1009
                    );
        } else { // Før 2011
            return  kalkulerAvgiftGittKjoeretoeydataOgSatser(
                        kjoeretoey,
                        1729,
                        1729,
                        1154,
                        432
                    );
        }
    }

    /*
     * Gitt et kjøretøys kjennemerke, kalkulerer satser for omregistrering anno
     * 2022.
     *
     * @param kjennemerke Et kjøretøys kjennemerke
     * 
     * @return kjøretøyets omregistreringsavgift
     */
    public static int kalkulerAvgiftGittKjennemerke(String kjennemerke) {
        Kjoeretoey kjoeretoey = KjoeretoeyRegister.hentKjoeretoey(kjennemerke);

        return kalkulerAvgiftGittKjoeretoeydata(kjoeretoey);
    }
}
