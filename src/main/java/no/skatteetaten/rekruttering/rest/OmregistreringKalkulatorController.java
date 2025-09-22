package no.skatteetaten.rekruttering.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import no.skatteetaten.rekruttering.service.OmregistreringKalkulator;

@RestController
@RequestMapping("/api/omregistrering")
public class OmregistreringKalkulatorController {
    @GetMapping("/ping")
    public String pong() {
        return "pong";
    }

    @GetMapping("/{kjennemerke}")
    public int hentOmregistreringsavgiftGittKjennemerke(
            @PathVariable("kjennemerke") String kjennemerke) {
        return OmregistreringKalkulator.kalkulerAvgiftGittKjennemerke(kjennemerke);
    }
}
