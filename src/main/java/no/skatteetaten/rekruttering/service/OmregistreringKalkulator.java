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
        int egenvekt = kjoeretoey.getEgenvekt();
        int foerstegangsregistreringsaar = kjoeretoey.getFoerstegangsregistreringsdato().getYear();

        if (LocalDate.now().getYear() - foerstegangsregistreringsaar > 30) {
            // Forskriften sier "30 år eller eldre" (>=30), men oppgaven sa
            // "mer enn 30 år siden" (>30), så jeg gjør som oppgaven ber om.
            return 0;
        } else if (foerstegangsregistreringsaar > 2018) {
            if (drivstoff == Drivstoff.ELEKTRISITET) {
                return 1670;
            } else {
                if (kjoeretoeytype == Kjoeretoeytype.PERSONBIL) {
                    if (egenvekt > 1200) {
                        return 6681;
                    } else {
                        return 4378;
                    }
                } else {
                    return 2189;
                }
            }
        } else if (foerstegangsregistreringsaar > 2010) {
            if (drivstoff == Drivstoff.ELEKTRISITET) {
                return 1009;
            } else {
                if (kjoeretoeytype == Kjoeretoeytype.PERSONBIL) {
                    if (egenvekt > 1200) {
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
