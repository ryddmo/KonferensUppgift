# Testfall — RiksUnderhåll, dashboard

Mall: `Test-ID | Krav-ID | Förutsättningar | Steg | Förväntat resultat | Faktiskt resultat | Status`

Fylls i allt eftersom fler krav täcks in. Faktiskt resultat/Status lämnas
tomma tills testfallet körts.

---

## REQ-01 — Endast SSO-autentiserade användare ska nå /dashboard

| Test-ID | Förutsättningar | Steg | Förväntat resultat | Faktiskt resultat | Status |
|---|---|---|---|---|---|
| TC-01 | Ingen aktiv session (utloggad, eller inkognito/nytt webbläsarfönster) | 1. Navigera direkt till `.../dashboard` | Användaren omdirigeras till Microsofts inloggningssida (login.microsoftonline.com). Dashboardens innehåll visas aldrig, ens kortvarigt. | | |
| TC-02 | Användaren är inloggad via SSO med giltig session | 1. Navigera till `.../dashboard` | Dashboardens grundvy visas direkt — ingen omdirigering till inloggning. | | |
| TC-03 | Användaren har varit inloggad och klickar "Logga ut" | 1. Logga ut via headerns "Logga ut"-knapp 2. Navigera till `.../dashboard` igen (adressfält eller bakåtknapp) | Användaren omdirigeras till inloggning igen. Ingen cachad/tidigare dashboard-vy visas (t.ex. via bakåtknapp/bfcache). | | |
| TC-04 | Ingen aktiv session; inloggningsflödet startas men avbryts | 1. Navigera till `.../dashboard` 2. På Microsofts inloggningssida: avbryt, ange fel uppgifter, eller neka ev. MFA-prompt | Användaren når aldrig dashboarden. Kvarstår på inloggnings-/felsida med ett rimligt felmeddelande. | | |
| TC-05 | En tidigare giltig session har blivit ogiltig/gått ut | 1. Låt sessionen gå ut (eller ogiltigförklara token, t.ex. via cookies/devtools) 2. Navigera till `.../dashboard` | Omdirigering till Microsoft-inloggning sker på nytt — ingen dashboard-data exponeras med den utgångna sessionen. | | |

**Automatiserat:** TC-01 (`tests/req-01-tc-01.unauth.spec.ts`) och TC-02
(`tests/omrade-a-auth-navigering.auth.spec.ts`). TC-03–05 är kvar som
manuella testfall — de kräver att man styr sessionens giltighet på ett sätt
som inte är meningsfullt att automatisera ännu.

## REQ-02–04 — Autentisering & navigering (header)

| Test-ID | Krav-ID | Förutsättningar | Steg | Förväntat resultat | Faktiskt resultat | Status |
|---|---|---|---|---|---|---|
| TC-06 | REQ-02 | Giltig, inloggad session | 1. Navigera till `.../dashboard` | Headern visar ett icke-tomt användarnamn. | | |
| TC-07 | REQ-03 | Giltig, inloggad session | 1. Klicka på "Logga ut" 2. Navigera till `.../dashboard` igen | Sessionen avslutas — efterföljande åtkomst omdirigerar till Microsoft-inloggning. ⚠️ **Se avvikelse i krav-dashboard.md** — idag loggas man tyst in igen via SSO utan att se någon inloggningsskärm. | | |
| TC-08 | REQ-04 | Giltig, inloggad session | 1. Navigera till `.../dashboard` 2. Klicka på "Startsida" | Knappen är synlig och grundvyn (rubrik "Underhållsplanering") visas fortfarande efteråt. | | |

**Automatiserat:** samtliga tre, i `tests/omrade-a-auth-navigering.auth.spec.ts`.

## REQ-05–08 — Underhållsplaner

| Test-ID | Krav-ID | Förutsättningar | Steg | Förväntat resultat | Faktiskt resultat | Status |
|---|---|---|---|---|---|---|
| TC-09 | REQ-05 | Giltig, inloggad session | 1. Navigera till `.../dashboard` 2. Klicka "Skapa" på kortet "Skapa en ny underhållsplan" | Kortet och knappen är synliga; klicket navigerar till `/planer/skapa`. *(Smoke-test — det fördjupade skapa-flödet på `/planer/skapa` är inte kravsatt än.)* | | |
| TC-10 | REQ-06 | Giltig, inloggad session | 1. Navigera till `.../dashboard` 2. Klicka "Visa" på kortet "Visa underhållsplaner" | Kortet och knappen är synliga; klicket navigerar till `/planer`. *(Smoke-test — listvyn på `/planer` är inte kravsatt än.)* | | |
| TC-11 | REQ-07 | Giltig, inloggad session | 1. Navigera till `.../dashboard` | Sektionen "Senaste underhållsplaner" är synlig. | | |
| TC-12 | REQ-08 | Giltig, inloggad session | 1. Navigera till `.../dashboard` | Texten "Inga planer skapade ännu." visas. ⚠️ **Se avvikelse i krav-dashboard.md** — kartan (TC-13) visar samtidigt 70 planer i systemet, så det är oklart om "inga planer" är korrekt eller en bugg. Testet dokumenterar nuvarande beteende, inte ett bekräftat korrekt sådant. | | |

**Automatiserat:** samtliga fyra, i `tests/omrade-b-underhallsplaner.auth.spec.ts`.

## REQ-09–10 — Extrafunktioner

| Test-ID | Krav-ID | Förutsättningar | Steg | Förväntat resultat | Faktiskt resultat | Status |
|---|---|---|---|---|---|---|
| TC-13 | REQ-09 | Giltig, inloggad session | 1. Navigera till `.../dashboard` 2. Klicka på kartknappen | En kartmodal öppnas med rubrik som anger "X av Y planer har koordinater" (Y ska vara samma totalantal varje gång). Modalen går att stänga med "Stäng". | | |
| TC-14 | REQ-10 | Giltig, inloggad session | 1. Navigera till `.../dashboard` 2. Klicka på AI-assistent-knappen | En dialog "AI-assistent" öppnas med ett textfält och en "Skicka"-knapp som är inaktiv tills text skrivits in. Går att stänga med "Stäng". | | |

**Automatiserat:** båda, i `tests/omrade-c-extrafunktioner.auth.spec.ts`.

## REQ-11 — Sidfot

| Test-ID | Krav-ID | Förutsättningar | Steg | Förväntat resultat | Faktiskt resultat | Status |
|---|---|---|---|---|---|---|
| TC-15 | REQ-11 | Giltig, inloggad session | 1. Navigera till `.../dashboard` | Sidfoten visar riktiga, klickbara länkar med namnen Cookies, Integritet, Om webbplatsen och Tillgänglighet. ⚠️ **Känd avvikelse** — uppfylls inte idag (bara en bild, inga riktiga länkar). Testet är avsiktligt märkt som "förväntat att misslyckas" tills det är åtgärdat. | | |

**Automatiserat:** i `tests/omrade-d-sidfot.auth.spec.ts` (markerat `test.fail()` — se kommentar i filen).

---

## Om de autentiserade testerna

TC-02, TC-06–TC-15 körs mot en **sparad inloggad session**
(`auth-state.json` i projektroten — gitignorad, innehåller SSO-cookies och
får aldrig committas eller delas). Filen skapades genom att exportera
sessionen från den webbläsare vi loggade in i manuellt under Del A.

Sessionen har en begränsad livslängd (precis som en vanlig inloggning). Om
de autentiserade testerna plötsligt börjar misslyckas med redirect till
Microsoft-inloggning: logga in på nytt i den uppkopplade webbläsaren och be
Claude exportera en ny `auth-state.json`.

## Nästa steg

- Kör `npm test` för att köra alla automatiserade testfall (TC-01, TC-02,
  TC-06–TC-15) i ett svep, och fyll i Faktiskt resultat/Status för de
  kvarvarande manuella (TC-03–05).
- TC-12 (tomt-tillstånd) går sönder så fort testkontot får en riktig
  underhållsplan — bra tillfälle att då skriva ett nytt testfall för
  "lista med minst en post" istället.
- När Del B:s grundvy är klar: bestäm om nästa steg är att utforska
  "Skapa"/"Visa"-flödena på djupet (nya krav + testfall) eller andra sidor
  i applikationen.
