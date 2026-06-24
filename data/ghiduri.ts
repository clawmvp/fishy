// Ghiduri sezoniere — conținut SEO pentru "ce se prinde în Delta [sezon]".
// Text scris + secțiuni data-driven (specii deschise/închise calculate live pe pagină).

export type GhidSpecie = { id: "crap" | "stiuca" | "salau" | "avat" | "biban" | "somn"; deCe: string };

export type Ghid = {
  slug: string;
  sezon: string;
  perioada: string;
  luni: number[];
  titlu: string;
  meta: string;
  intro: string;
  conditii: string;
  speciiTinta: GhidSpecie[];
  tehnici: string[];
  atentie: string[];
  // dată reprezentativă (mijloc de sezon) pentru calculul prohibiției pe pagină
  midDate: { m: number; d: number };
};

export const ghiduri: Ghid[] = [
  {
    slug: "primavara",
    sezon: "Primăvară",
    perioada: "martie – mai",
    luni: [3, 4, 5],
    titlu: "Pescuit în Delta Dunării primăvara — ce se prinde în martie, aprilie, mai",
    meta: "Ghid de pescuit primăvara în Delta Dunării: ce specii se prind în martie-mai, fereastra pre-prohibiție la crap, prohibiția generalizată și condițiile de apă.",
    intro:
      "Primăvara e un sezon de contraste în Deltă. Martie aduce fereastra de aur pentru crap pe canale, înainte de prohibiție. Apoi, din aprilie, majoritatea speciilor intră în prohibiție pentru reproducere, iar pescuitul legal se restrânge la câteva specii și zone.",
    conditii:
      "Apa urcă de la 6-8°C în martie spre 14-16°C la final de mai. Cota Dunării crește cu topirea zăpezilor — apă proaspătă pe maluri și lacuri inundate, care declanșează hrănirea. Presiunea instabilă și fronturile de primăvară pot face minuni sau strica o partidă.",
    speciiTinta: [
      { id: "crap", deCe: "Martie, pre-prohibiție: crapul se hrănește intens pe canale înainte de depunere. Fereastra cea mai bună a primăverii." },
      { id: "stiuca", deCe: "Se redeschide pe la 20 martie (post-prohibiție de bătaie). Activă pe lacurile interioare, atac din ambuscadă." },
    ],
    tehnici: [
      "Crap pe canale cu nadă și boilies, în martie, dimineața devreme și seara",
      "Spinning la știucă cu shad-uri și voblere, în vegetația de mal, după 20 martie",
      "Caută apa proaspătă: maluri inundate, guri de canal, lacuri care se umflă",
    ],
    atentie: [
      "Aprilie-mai = prohibiție pentru majoritatea speciilor. Verifică mereu calendarul oficial înainte de a pescui.",
      "Cotă mare + apă tulbure post-furtună poate îngreuna pescuitul static.",
    ],
    midDate: { m: 4, d: 20 },
  },
  {
    slug: "vara",
    sezon: "Vară",
    perioada: "iunie – august",
    luni: [6, 7, 8],
    titlu: "Pescuit în Delta Dunării vara — crap, somn și răpitori în iunie-august",
    meta: "Ghid de pescuit vara în Delta Dunării: post-prohibiție, vârful la crap pe brațe, somn la clonc, avat matinal și cum pescuiești pe caniculă.",
    intro:
      "Vara e sezonul plin al Deltei. După 7 iunie majoritatea speciilor se redeschid, iar iulie-august aduc vârful pentru crap pe brațe și pentru somn. Canicula schimbă regulile: peștii coboară la adânc și mușcă în ferestrele de zori și amurg.",
    conditii:
      "Apa ajunge la 22-26°C, uneori peste. Cota scade treptat — crapul se retrage din lacuri spre adâncimile brațelor. Dimineața devreme și seara târziu sunt ferestrele de aur; ziua, pe arșiță, doar adâncurile produc.",
    speciiTinta: [
      { id: "crap", deCe: "Vârful sezonului pe brațele Chilia și Sf. Gheorghe. Iulie-august, pescuit static din barcă lângă cioate." },
      { id: "somn", deCe: "Vara urcă din gropi și răspunde la clonc. Nopțile calde după ploaie sunt cele mai bune." },
      { id: "avat", deCe: "Atac la suprafață în zori, pe Dunăre și la capătul epi-urilor. Țintă tehnică de spinning." },
      { id: "salau", deCe: "Redeschis după prohibiție; activ în zori și amurg pe fund tare, pe Sulina." },
    ],
    tehnici: [
      "Crap static din barcă, plumb 120-150 g, lângă structuri scufundate",
      "Somn la clonc vara, din barcă, peste gropile adânci de pe Chilia",
      "Spinning matinal la avat cu pilkere lansate departe",
      "Pe caniculă: pescuiește adâncurile la prânz, malurile în ferestrele de zori/amurg",
    ],
    atentie: [
      "Arșița de la prânz inactivează peștele la mal — nu insista pe ape mici fierbinți.",
      "Atenție la trafic naval și la scoică pe brațele principale.",
    ],
    midDate: { m: 7, d: 15 },
  },
  {
    slug: "toamna",
    sezon: "Toamnă",
    perioada: "septembrie – noiembrie",
    luni: [9, 10, 11],
    titlu: "Pescuit în Delta Dunării toamna — vârful răpitorilor (șalău, biban, știucă)",
    meta: "Ghid de pescuit toamna în Delta Dunării: vârful la șalău în noiembrie, biban în octombrie, știuca care revine și crapul care se hrănește pre-iarnă.",
    intro:
      "Toamna e sezonul răpitorilor. Pe măsură ce apa se răcește, șalăul, bibanul și știuca intră în frenezie de hrănire pre-iarnă, iar crapul mănâncă intens ca să-și facă rezerve. E perioada cu cele mai constante partide la spinning.",
    conditii:
      "Apa coboară de la 16°C în septembrie spre 8°C în noiembrie. Răcirea declanșează hrănirea agresivă a răpitorilor. Bibanul vânează în haite, șalăul iese pe fund tare, iar crapul se hrănește pe adâncimi medii.",
    speciiTinta: [
      { id: "salau", deCe: "Vârful sezonului în noiembrie. Activ în zori, amurg și noapte, pe Sulina și pe fund tare." },
      { id: "biban", deCe: "Octombrie-noiembrie, vânează în haite. Microjig și dropshot — prinzi exemplar după exemplar." },
      { id: "stiuca", deCe: "Revine activă din octombrie spre decembrie, pe vremea înnorată și presiune în scădere." },
      { id: "crap", deCe: "Se hrănește intens pre-iarnă; partide bune înainte de primele geruri." },
    ],
    tehnici: [
      "Spinning la șalău cu shad-uri fine pe jighead, pe praguri și gropi",
      "Microjig și dropshot la biban — caută bancurile, lucrează zona",
      "Voblere și năluci pentru știucă în vegetația rară de toamnă",
      "Profită de ferestrele de presiune stabilă și front activator",
    ],
    atentie: [
      "Vremea variabilă — fronturile reci puternice pot opri brusc mușcătura.",
      "Zilele scurtează: planifică ferestrele de zori și amurg.",
    ],
    midDate: { m: 10, d: 15 },
  },
  {
    slug: "iarna",
    sezon: "Iarnă",
    perioada: "decembrie – februarie",
    luni: [12, 1, 2],
    titlu: "Pescuit în Delta Dunării iarna — pescuit greu de finețe (crap, știucă, șalău)",
    meta: "Ghid de pescuit iarna în Delta Dunării: lockdown la cioate pentru crap, bătaia știucii în februarie, șalăul post-ger și pescuitul de finețe pe apă rece.",
    intro:
      "Iarna e sezonul de finețe și răbdare. Apa rece face peștele apatic — se adună în gropile adânci și mușcă scurt. Dar pentru cine știe unde să caute, iarna produce capturi mari: crap masiv lângă cioate, știucă în prag de bătaie, șalău post-ger.",
    conditii:
      "Apa coboară sub 8°C, uneori spre 2-4°C. Metabolismul peștelui scade drastic — atacuri rare, scurte, fără energie. Cheia e să găsești gropile adânci unde se adună peștele și să prezinți discret, cu finețe.",
    speciiTinta: [
      { id: "crap", deCe: "Lockdown la cioate: crapi mari adunați în gropile adânci de pe Chilia (16-22 m). Montaj fin, răbdare." },
      { id: "stiuca", deCe: "Februarie începe bătaia (depunerea timpurie) — atac mai consistent spre final de iarnă." },
      { id: "salau", deCe: "Post-ger, în februarie, redevine activ. Pescuit de finețe pe fund." },
    ],
    tehnici: [
      "Crap de iarnă: montaj fin lângă cioatele scufundate, în gropile de pe Chilia",
      "Jigging de finețe la știucă cu năluci mici, în prag de bătaie (februarie)",
      "Năluci suple, recuperare ultra-lentă — peștele rece nu urmărește prada",
      "Fir mono și prezentări discrete pe apă cristalină",
    ],
    atentie: [
      "Frig și gheață — echipament adecvat și prudență pe apă obligatorii.",
      "Mușcături rare: alege calitatea locului în detrimentul cantității de lansaje.",
    ],
    midDate: { m: 1, d: 15 },
  },
];

export function getGhid(slug: string): Ghid | undefined {
  return ghiduri.find((g) => g.slug === slug);
}
