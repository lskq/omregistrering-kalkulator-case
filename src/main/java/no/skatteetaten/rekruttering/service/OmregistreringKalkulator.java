package no.skatteetaten.rekruttering.service;

import java.time.LocalDate;

import no.skatteetaten.rekruttering.ekstern.KjoeretoeyRegister;
import no.skatteetaten.rekruttering.ekstern.model.Drivstoff;
import no.skatteetaten.rekruttering.ekstern.model.Kjoeretoey;
import no.skatteetaten.rekruttering.ekstern.model.Kjoeretoeytype;

public class OmregistreringKalkulator {
    /*
     * Gitt et kjoeretoey og satser, kalkulerer satsen for omregistreringsavgift.
     *
     * @param kjoeretoey Teknisk data om et kjoeretoey
     * 
     * @param tungPersonbilSats Sats for personbiler >1200kg
     * 
     * @param lettPersonbilSats Sats for personbiler <=1200kg
     * 
     * @param varebilSats Sats for varebiler
     * 
     * @param elektriskBilSats Sats for elektriske biler
     * 
     * @return Kjoeretoeyets omregistreringsavgift
     */
    public static int kalkulerAvgiftGittKjoeretoeydataOgSatser(
            Kjoeretoey kjoeretoey,
            int tungPersonbilSats,
            int lettPersonbilSats,
            int varebilSats,
            int elektriskBilSats) {
        boolean elektrisk = kjoeretoey.getDrivstoff() == Drivstoff.ELEKTRISITET;
        boolean personbil = kjoeretoey.getKjoeretoeytype() == Kjoeretoeytype.PERSONBIL;
        boolean tungtKjoeretoey = kjoeretoey.getEgenvekt() > 1200;

        if (elektrisk) {
            return elektriskBilSats;
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
     * Gitt et kjoeretoey, kalkulerer satser for omregistrering anno 2022.
     *
     * @param kjoeretoey Teknisk data om et kjoeretoey
     * 
     * @return Kjoeretoeyets omregistreringsavgift
     */
    public static int kalkulerAvgiftGittKjoeretoeydata(Kjoeretoey kjoeretoey) {
        int foerstegangsregistreringsaar = kjoeretoey.getFoerstegangsregistreringsdato().getYear();
        boolean veteranKjoeretoey = LocalDate.now().getYear() - foerstegangsregistreringsaar > 30;

        int sats;

        if (veteranKjoeretoey) {
            sats = 0;
        } else if (foerstegangsregistreringsaar >= 2019) {
            sats = kalkulerAvgiftGittKjoeretoeydataOgSatser(
                    kjoeretoey,
                    6681,
                    4378,
                    2189,
                    1670);
        } else if (foerstegangsregistreringsaar >= 2011) {
            sats = kalkulerAvgiftGittKjoeretoeydataOgSatser(
                    kjoeretoey,
                    4034,
                    2880,
                    1383,
                    1009);
        } else {
            sats = kalkulerAvgiftGittKjoeretoeydataOgSatser(
                    kjoeretoey,
                    1729,
                    1729,
                    1154,
                    432);
        }

        return sats;
    }

    /*
     * Gitt et kjoeretoeys kjennemerke, kalkulerer satser for omregistrering anno
     * 2022.
     *
     * @param kjennemerke Et kjoeretoeys kjennemerke
     * 
     * @return kjoeretoeyets omregistreringsavgift
     */
    public static int kalkulerAvgiftGittKjennemerke(String kjennemerke) {
        Kjoeretoey kjoeretoey = KjoeretoeyRegister.hentKjoeretoey(kjennemerke);

        return kalkulerAvgiftGittKjoeretoeydata(kjoeretoey);
    }
}
