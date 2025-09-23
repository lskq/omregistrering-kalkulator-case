package no.skatteetaten.rekruttering.rest;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import no.skatteetaten.rekruttering.ekstern.KjoeretoeyRegister;
import no.skatteetaten.rekruttering.ekstern.model.Kjoeretoey;

@RestController
@RequestMapping("/api/kjoeretoey")
public class KjoeretoeyController {
    @GetMapping("/ping")
    public String pong() {
        return "pong";
    }

    @CrossOrigin(origins = "http://localhost:3000") // Må ikke brukes i production - hindrer CORS feil i chromium
    @GetMapping("/{kjennemerke}/hent")
    public Kjoeretoey hentKjoeretoey(
            @PathVariable("kjennemerke") String kjennemerke) {
        return KjoeretoeyRegister.hentKjoeretoey(kjennemerke);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/hentAlle")
    public List<Kjoeretoey> hentAlleKjoeretoey() {
        return KjoeretoeyRegister.hentAlleKjoeretoey();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{kjennemerke}/fjern")
    public Kjoeretoey fjernKjoeretoey(
            @PathVariable("kjennemerke") String kjennemerke) {
        return KjoeretoeyRegister.fjernKjoeretoey(kjennemerke);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/{kjennemerke}/opprett")
    public Kjoeretoey opprettKjoeretoey(
            @PathVariable("kjennemerke") String kjennemerke,
            @RequestBody Kjoeretoey kjoeretoey) {
        return KjoeretoeyRegister.opprettKjoeretoey(kjennemerke, kjoeretoey);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{kjennemerke}/oppdater")
    public Kjoeretoey oppdaterKjoeretoey(
            @PathVariable("kjennemerke") String kjennemerke,
            @RequestBody Kjoeretoey kjoeretoey) {
        return KjoeretoeyRegister.oppdaterKjoeretoey(kjennemerke, kjoeretoey);
    }
}
