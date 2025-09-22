package no.skatteetaten.rekruttering.service;

import java.time.LocalDate;

import no.skatteetaten.rekruttering.ekstern.KjoeretoeyRegister;
import no.skatteetaten.rekruttering.ekstern.model.Drivstoff;
import no.skatteetaten.rekruttering.ekstern.model.Kjoeretoey;
import no.skatteetaten.rekruttering.ekstern.model.Kjoeretoeytype;

public class OmregistreringKalkulator {

    /*
     * @param kjoeretoey Teknisk data om et kjøretøy
     * 
     * @return Kjøretøyets omregistreringsavgift
     */
    public int kalkulerAvgiftGittKjoeretoeydata(Kjoeretoey kjoeretoey) {
        Drivstoff drivstoff = kjoeretoey.getDrivstoff();
        Kjoeretoeytype kjoeretoeytype = kjoeretoey.getKjoeretoeytype();
        int foerstegangsregistreringsaar = kjoeretoey.getFoerstegangsregistreringsdato().getYear();
        boolean tungtKjoeretoey = kjoeretoey.getEgenvekt() > 1200;
        boolean veteranKjoeretoey = LocalDate.now().getYear() - foerstegangsregistreringsaar > 30;

        if (veteranKjoeretoey) {
            return 0;

        } else if (foerstegangsregistreringsaar >= 2019) {
            if (drivstoff == Drivstoff.ELEKTRISITET) {
                return 1670;
            } else {
                if (kjoeretoeytype == Kjoeretoeytype.PERSONBIL) {
                    if (tungtKjoeretoey) {
                        return 6681;
                    } else {
                        return 4378;
                    }
                } else {
                    return 2189;
                }
            }

        } else if (foerstegangsregistreringsaar >= 2011) {
            if (drivstoff == Drivstoff.ELEKTRISITET) {
                return 1009;
            } else {
                if (kjoeretoeytype == Kjoeretoeytype.PERSONBIL) {
                    if (tungtKjoeretoey) {
                        return 4034;
                    } else {
                        return 2880;
                    }
                } else {
                    return 1383;
                }
            }

        } else {
            if (drivstoff == Drivstoff.ELEKTRISITET) {
                return 432;
            } else {
                if (kjoeretoeytype == Kjoeretoeytype.PERSONBIL) {
                    return 1729;
                } else {
                    return 1154;
                }
            }
        }
    }

    /*
     * @param kjennemerke Et kjøretøys kjennemerke
     * 
     * @return Kjøretøyets omregistreringsavgift
     */
    public int kalkulerAvgiftGittKjennemerke(String kjennemerke) {
        Kjoeretoey kjoeretoey = KjoeretoeyRegister.hentKjoeretoey(kjennemerke);

        return kalkulerAvgiftGittKjoeretoeydata(kjoeretoey);
    }
}
