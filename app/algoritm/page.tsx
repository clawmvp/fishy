import { PONDERI } from "@/lib/recomandari";
import { specii } from "@/data/specii";

export default function AlgoritmPage() {
  const cheieLabel: Record<string, string> = {
    apa: "Temperatura apei",
    cota: "Cota Dunării",
    presiune: "Presiune",
    vant: "Vânt",
    precip: "Precipitații",
    luna: "Faza lunii",
  };

  return (
    <article className="max-w-3xl">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">cum funcționează</p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">Algoritmul scor</h1>
        <p className="text-fog/75 leading-relaxed">
          Cum se calculează scorul 0-100 pe pagina <code className="text-amber-soft">/azi</code> și{" "}
          <code className="text-amber-soft">/prognoza</code>. Bazat pe consensul expert din literatura
          pescuit + 200+ partide documentate.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-display text-amber-glow mb-4">Pas 1 — Sub-scor pe fiecare factor</h2>
        <p className="text-fog/75 mb-4 leading-relaxed">
          Fiecare factor (apa, cota, presiune, vânt, precipitații, lună) primește un sub-scor 0-100:
        </p>
        <ul className="text-fog/80 space-y-1">
          <li><strong className="text-fog">100</strong> = condiție ideală pentru specie</li>
          <li><strong className="text-fog">75</strong> = bună, ușor sub ideal</li>
          <li><strong className="text-fog">50</strong> = neutră, pescuit cu finețe</li>
          <li><strong className="text-fog">25</strong> = dificilă, șanse mici</li>
          <li><strong className="text-fog">0</strong> = teribilă, peștii inactivi</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-display text-amber-glow mb-4">Pas 2 — Ponderea pe specie</h2>
        <p className="text-fog/75 mb-4 leading-relaxed">
          Fiecare specie are propriile sensibilități. Ponderea reflectă <strong className="text-fog">cât de mult contează fiecare factor</strong> pentru specia aia.
        </p>

        <div className="scroll-x-wrap card rounded-lg p-4 mb-3">
          <table className="w-full text-sm min-w-fit">
            <thead>
              <tr className="border-b border-amber-glow/20">
                <th className="text-left py-2 text-amber-glow font-medium">Specie</th>
                {Object.keys(cheieLabel).map((k) => (
                  <th key={k} className="text-right py-2 text-amber-glow font-medium font-mono text-xs">{cheieLabel[k]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specii.map((sp) => (
                <tr key={sp.id} className="border-b border-amber-glow/5">
                  <td className="py-2 text-fog">{sp.nume}</td>
                  {Object.keys(cheieLabel).map((k) => {
                    const val = PONDERI[sp.id][k];
                    const max = Math.max(...Object.values(PONDERI[sp.id]));
                    const isMax = val === max;
                    return (
                      <td key={k} className={`py-2 text-right font-mono text-xs ${isMax ? "text-amber-glow font-semibold" : "text-fog/75"}`}>
                        {val}%
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-fog/55">
          Cea mai mare pondere este evidențiată. <strong className="text-fog">Apa</strong> domină la toate speciile (28-35%),
          dar <strong className="text-fog">cota</strong> e specifică pentru crap (25%), iar <strong className="text-fog">presiunea + vântul</strong> mai importante pentru răpitori.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-display text-amber-glow mb-4">Pas 3 — Contribuția fiecărui factor</h2>
        <div className="card rounded-lg p-5 mb-3">
          <p className="text-fog/85 font-mono text-sm mb-3 leading-relaxed">
            contribuție = sub-scor × pondere / 100
          </p>
          <p className="text-fog/75 mb-3 text-sm leading-relaxed">
            Exemplu — Crap pe o zi cu apa 17°C (în interval 15-25°C → sub-scor 100):
          </p>
          <div className="space-y-1 font-mono text-sm">
            <div className="flex justify-between text-fog/85"><span>Apa: 100 × 28%</span><span>= 28.0</span></div>
            <div className="flex justify-between text-fog/85"><span>Cota: 60 × 25%</span><span>= 15.0</span></div>
            <div className="flex justify-between text-fog/85"><span>Presiune: 90 × 18%</span><span>= 16.2</span></div>
            <div className="flex justify-between text-fog/85"><span>Vânt: 100 × 10%</span><span>= 10.0</span></div>
            <div className="flex justify-between text-fog/85"><span>Precip: 85 × 7%</span><span>= 5.95</span></div>
            <div className="flex justify-between text-fog/85"><span>Lună: 70 × 12%</span><span>= 8.4</span></div>
            <div className="flex justify-between text-amber-glow border-t border-amber-glow/20 pt-2 mt-2"><span>TOTAL</span><span>83.55 ≈ 84</span></div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-display text-amber-glow mb-4">De ce aceste ponderi?</h2>

        <h3 className="text-xl font-display text-fog mt-6 mb-2">Apa = 28-35% (factor primar)</h3>
        <p className="text-fog/75 mb-3 leading-relaxed">
          Metabolismul peștelui depinde DIRECT de temperatura apei. Sub temperatura optimă, peștele e apatic;
          peste, intră în zone adânci. Toți pescarii documentați (Vișoianu, Baltacul, DPD, GFT) confirmă
          temperatura apei ca factor #1.
        </p>

        <h3 className="text-xl font-display text-fog mt-6 mb-2">Cota Dunării = 10-25% (specific Delta)</h3>
        <p className="text-fog/75 mb-3 leading-relaxed">
          Pentru crap pe canale Delta: 25% — cota dictează unde stau peștii (lacuri vs canale vs Dunăre principală).
          Vișoianu: <em>&quot;Cotă 150-200 = optim pe canale. Sub 45 = doar ciortani.&quot;</em>
          Pentru răpitori spinning: 10-15% — mai puțin sensibili.
        </p>

        <h3 className="text-xl font-display text-fog mt-6 mb-2">Presiune = 18-22% (secundar major)</h3>
        <p className="text-fog/75 mb-3 leading-relaxed">
          Presiunea afectează poziția hidrostatică a peștelui în coloana de apă. Presiune mare în creștere =
          peștii intră în repaus. Presiune stabilă sau în scădere ușoară = activitate maximă.
          Trei pescari independenți (Vișoianu, GDA, Mihai Manea) menționează tabelul Excel cu presiune.
        </p>

        <h3 className="text-xl font-display text-fog mt-6 mb-2">Vânt = 8-18% (variabil)</h3>
        <p className="text-fog/75 mb-3 leading-relaxed">
          Pentru spinning + răpitori (știucă, șalău, biban): 18% — vântul oxigenează apa la suprafață și creează
          val care ascunde silueta nălucii. Pentru static (crap, somn): 8-10% — vântul puternic doar perturbă, nu ajută direct.
          Optim: 5-15 km/h.
        </p>

        <h3 className="text-xl font-display text-fog mt-6 mb-2">Precipitații = 7-12% (modifier)</h3>
        <p className="text-fog/75 mb-3 leading-relaxed">
          Ploaia ușoară activează somnul + biban + crap (preferință &quot;after_rain&quot;). Pentru avat, vremea uscată
          e mai bună (vânat vizual). Ploaia abundentă = fire murdare, fără pește.
        </p>

        <h3 className="text-xl font-display text-fog mt-6 mb-2">Lună = 7-15%</h3>
        <p className="text-fog/75 mb-3 leading-relaxed">
          Controversată. Vișoianu jură pe ea — &quot;lună nouă ±2 zile&quot; pentru crap.
          GFT folosesc o privire mai relaxată. Pentru știucă/șalău/biban (răpitori vizuali) — 15% (lumina lunii afectează
          comportamentul de vânătoare). Pentru somn — 8% (vânează prin vibrație, nu vedere).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-display text-amber-glow mb-4">Limitări recunoscute</h2>
        <ul className="text-fog/75 space-y-2">
          <li>
            <strong className="text-fog">Algoritmul e RELATIV, nu absolut.</strong> Un scor 80 nu garantează capturi;
            un scor 40 nu înseamnă zero pește. Doar probabilitatea condițiilor favorabile.
          </li>
          <li>
            <strong className="text-fog">Ponderile pot fi tuned.</strong> Dacă ai date concrete (jurnal partide cu capturi),
            putem regresa și ajusta. Acum sunt din consens expert.
          </li>
          <li>
            <strong className="text-fog">Factori NEINCLUȘI:</strong> tulbureala apei (depinde de afluenți Siret/Prut),
            traficul de vapoare (Brațul Sulina), prezența pescarilor pe loc (zone deja momite).
          </li>
          <li>
            <strong className="text-fog">Precizia prognozei meteo</strong> scade după ziua 7 (Open-Meteo). Zilele 8-14
            sunt orientative.
          </li>
          <li>
            <strong className="text-fog">Apa = estimată</strong> din soil_temperature_54cm (Open-Meteo). E un proxy bun,
            dar nu măsurare directă.
          </li>
        </ul>
      </section>

      <section className="card-hero rounded-xl p-5 mb-10">
        <p className="text-xs uppercase tracking-widest text-amber-glow mb-2">Regulă de aur</p>
        <p className="text-fog/85 leading-relaxed italic">
          „Dacă ai 2 zile cu scor 80+ consecutive — du-te. Dacă ai o zi 90 dar înconjurată de 50 — gândește-te dacă merită
          drumul. Cele mai bune partide vin din <strong className="text-amber-glow">stabilitate consecutivă</strong>,
          nu din vârful unei singure zile.”
        </p>
      </section>
    </article>
  );
}
