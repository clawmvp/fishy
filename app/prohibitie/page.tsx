import { specii, isInProhibitie, zileLaDeschidere } from "@/data/specii";

export const dynamic = "force-dynamic";

const luniRO = [
  "ian", "feb", "mar", "apr", "mai", "iun",
  "iul", "aug", "sep", "oct", "nov", "dec",
];
const luniLungi = [
  "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
  "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
];

// Pentru bara vizuală — 365 zile/an, marchez zilele de prohibiție
function generateProhibitionMarks(specie: typeof specii[number], year: number) {
  const start = new Date(year, specie.prohibitie.start.m - 1, specie.prohibitie.start.d);
  const end = new Date(year, specie.prohibitie.end.m - 1, specie.prohibitie.end.d);
  const cells: { month: number; closed: boolean }[] = [];
  for (let m = 0; m < 12; m++) {
    // E luna măcar parțial în prohibiție?
    const monthStart = new Date(year, m, 1);
    const monthEnd = new Date(year, m + 1, 0);
    let isClosed = false;
    if (start <= end) {
      isClosed = monthStart <= end && monthEnd >= start;
    } else {
      isClosed = (monthStart <= end || monthEnd >= start);
    }
    cells.push({ month: m, closed: isClosed });
  }
  return cells;
}

export default function ProhibitionPage() {
  const today = new Date();
  const year = today.getFullYear();
  const currentMonth = today.getMonth();

  // Sortare: speciile LIBERE sus, prohibite jos
  const cuStatus = specii.map((sp) => {
    const inProhibitie = isInProhibitie(sp, today);
    return {
      sp,
      inProhibitie,
      zile: inProhibitie ? zileLaDeschidere(sp, today) : 0,
      marks: generateProhibitionMarks(sp, year),
    };
  });
  const libere = cuStatus.filter((s) => !s.inProhibitie);
  const inchise = cuStatus.filter((s) => s.inProhibitie);

  const formatDataPro = (m: number, d: number) => `${d} ${luniRO[m - 1]}`;

  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">prohibiție</p>
        <h1 className="text-4xl font-display text-fog mb-3">Când pescuiești ce</h1>
        <p className="text-fog/70 max-w-2xl">
          Calendar pe specie cu perioadele de prohibiție. Status LIVE pentru ziua de azi
          ({today.getDate()} {luniLungi[currentMonth]} {year}). Verifică oficial la{" "}
          <a href="https://anpa.ro" target="_blank" rel="noopener" className="text-amber-glow hover:underline">ANPA</a>.
        </p>
      </header>

      {/* Specii libere */}
      {libere.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-display text-emerald-400 mb-4">
            Liber la pescuit
            <span className="text-fog/40 text-base ml-2">({libere.length})</span>
          </h2>
          <div className="space-y-3">
            {libere.map(({ sp, marks }) => (
              <div key={sp.id} className="card rounded-xl p-5">
                <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-display text-fog">{sp.nume}</h3>
                    <p className="text-xs text-fog/40">{sp.latin}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-emerald-400">deschis acum</p>
                    <p className="text-xs text-fog/50 mt-1">min. {sp.marimeMinima} cm</p>
                  </div>
                </div>

                {/* Bara calendar */}
                <div className="grid grid-cols-12 gap-0.5 mb-3">
                  {marks.map((mark, i) => (
                    <div
                      key={i}
                      className="h-8 rounded-sm flex items-center justify-center text-[10px] font-mono"
                      style={{
                        background: mark.closed
                          ? "rgba(189, 78, 65, 0.25)"
                          : i === currentMonth
                            ? "rgba(212, 166, 87, 0.35)"
                            : "rgba(107, 163, 104, 0.15)",
                        color: mark.closed ? "#d97864" : i === currentMonth ? "var(--color-amber-glow)" : "var(--color-moss)",
                        border: i === currentMonth ? "1px solid var(--color-amber-glow)" : "none",
                      }}
                      title={mark.closed ? "Prohibiție" : "Liber"}
                    >
                      {luniRO[i]}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-fog/60">
                  Prohibiție anuală: {formatDataPro(sp.prohibitie.start.m, sp.prohibitie.start.d)} → {formatDataPro(sp.prohibitie.end.m, sp.prohibitie.end.d)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Specii în prohibiție */}
      {inchise.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-display text-red-400 mb-4">
            În prohibiție
            <span className="text-fog/40 text-base ml-2">({inchise.length})</span>
          </h2>
          <div className="space-y-3">
            {inchise.map(({ sp, zile, marks }) => (
              <div key={sp.id} className="card rounded-xl p-5 border-red-400/20">
                <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-display text-fog">{sp.nume}</h3>
                    <p className="text-xs text-fog/40">{sp.latin}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-red-400">închis</p>
                    <p className="text-sm text-fog mt-1">se redeschide în <strong className="text-amber-glow">{zile} zile</strong></p>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-0.5 mb-3">
                  {marks.map((mark, i) => (
                    <div
                      key={i}
                      className="h-8 rounded-sm flex items-center justify-center text-[10px] font-mono"
                      style={{
                        background: mark.closed
                          ? "rgba(189, 78, 65, 0.25)"
                          : i === currentMonth
                            ? "rgba(212, 166, 87, 0.35)"
                            : "rgba(107, 163, 104, 0.15)",
                        color: mark.closed ? "#d97864" : i === currentMonth ? "var(--color-amber-glow)" : "var(--color-moss)",
                        border: i === currentMonth ? "1px solid var(--color-amber-glow)" : "none",
                      }}
                      title={mark.closed ? "Prohibiție" : "Liber"}
                    >
                      {luniRO[i]}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-fog/60">
                  Prohibiție: {formatDataPro(sp.prohibitie.start.m, sp.prohibitie.start.d)} → {formatDataPro(sp.prohibitie.end.m, sp.prohibitie.end.d)} • min. {sp.marimeMinima} cm
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mărimi minime tabelar */}
      <section className="mb-10">
        <h2 className="text-xl font-display text-amber-glow mb-4">Mărimi minime legale</h2>
        <div className="card rounded-lg p-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-amber-glow/20">
                <th className="text-left py-2 text-amber-glow font-medium">Specie</th>
                <th className="text-left py-2 text-amber-glow font-medium">Min. legal</th>
                <th className="text-left py-2 text-amber-glow font-medium">Notă</th>
              </tr>
            </thead>
            <tbody>
              {specii.map((sp) => (
                <tr key={sp.id} className="border-b border-amber-glow/5">
                  <td className="py-2 text-fog">{sp.nume}</td>
                  <td className="py-2 text-amber-soft font-mono">{sp.marimeMinima} cm</td>
                  <td className="py-2 text-fog/60 text-xs">
                    {sp.id === "crap" && "Crap = 40 cm fără coadă (regulă 2025)"}
                    {sp.id === "stiuca" && "Femele >70 cm = trofeu, eliberează"}
                    {sp.id === "salau" && "Sub 45 cm = obligatoriu eliberat"}
                    {sp.id === "somn" && ">100 cm necesită permis special în unele zone"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reguli speciale Delta */}
      <section className="mb-10">
        <h2 className="text-xl font-display text-amber-glow mb-4">Reguli speciale Delta + zone frontieră</h2>
        <div className="card rounded-lg p-5 space-y-3 text-sm text-fog/85">
          <p>
            <strong className="text-fog">Max 4 lansete per pescar</strong> — regulă universală pe Dunăre / Deltă.
          </p>
          <p>
            <strong className="text-fog">Mărimea legală crap</strong> a fost actualizată în 2025 — 40 cm fără coadă (anterior 45 cm cu coadă).
          </p>
          <p>
            <strong className="text-fog">Excepție Dunărea de frontieră</strong> (RO-BG / RO-Serbia / RO-UA) — prohibiția răpitorilor începe pe <span className="text-amber-soft">24 aprilie</span>, NU pe 10 aprilie ca în restul țării. 14 zile bonus la avat / șalău / știucă în zonele:
          </p>
          <ul className="space-y-1 ml-4">
            <li className="text-fog/75">· Port Oltenița → confluența cu Argeș</li>
            <li className="text-fog/75">· Călărași → Călărași Veche</li>
            <li className="text-fog/75">· Drobeta-Turnu Severin → Calafat</li>
          </ul>
          <p>
            <strong className="text-fog">Amenzi pentru pescuit în prohibiție</strong> sunt mari (1500-5000 RON) și se confiscă echipamentul. Nu merită riscul.
          </p>
          <p>
            <strong className="text-fog">Permis ANPA + permis vânare-pescuit-Delta</strong> obligatoriu — verifică la administrația locală.
          </p>
        </div>
      </section>

      <section className="mt-10 pt-6 border-t border-amber-glow/15">
        <p className="text-xs text-fog/40">
          Datele sunt simplificate — perioada exactă variază 1-3 zile anual prin ordin ANPA. Verifică ordinul oficial la{" "}
          <a href="https://anpa.ro" target="_blank" rel="noopener" className="hover:text-amber-glow">anpa.ro</a> înainte de orice partidă.
        </p>
      </section>
    </div>
  );
}
