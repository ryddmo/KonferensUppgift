# Krav — RiksUnderhåll, dashboard (grundvy)

**Objekt:** `/dashboard` (grundvyn, direkt efter inloggning)
**Miljö:** app-riksund-fe-underhallsplanering-test.azurewebsites.net
**Datum:** 2026-09-05
**Metod:** Ingen kravdokumentation fanns sedan tidigare. Kraven nedan är
härledda genom att logga in i testmiljön och systematiskt gå igenom varje
synligt element på dashboardens grundvy.
**Status:** Alla krav är **antagna**, inte bekräftade. Gå igenom dem med
produktägare/utvecklare innan de används som facit för testfall.

---

## A. Autentisering & navigering

| Krav-ID | Beskrivning | Härlett från | Prioritet |
|---|---|---|---|
| REQ-01 | Endast SSO-autentiserade användare ska nå `/dashboard` — obehörig åtkomst ska omdirigera till Microsoft-inloggning. | Redirect till login.microsoftonline.com vid direktanrop | Kritisk |
| REQ-02 | Systemet ska visa den inloggade användarens namn i headern efter lyckad inloggning. | Inloggad användares namn syns i headern (visades dynamiskt som t.ex. "Stefan Rydin" vid analystillfället — inte hårdkodat) | Hög |
| REQ-03 | Systemet ska tillhandahålla en "Logga ut"-knapp som avslutar användarens session, så att nästa besök på `/dashboard` kräver ny inloggning. ⚠️ Uppfylls INTE idag — se avvikelse nedan. | Knapp "Logga ut", header | Hög |
| REQ-04 | Systemet ska tillhandahålla en "Startsida"-knapp som navigerar till/markerar dashboardens grundvy. | Knapp "Startsida", header | Medel |

## B. Underhållsplaner

| Krav-ID | Beskrivning | Härlett från | Prioritet |
|---|---|---|---|
| REQ-05 | Systemet ska låta användaren registrera en ny underhållsplan för en fastighet via "Skapa en ny underhållsplan". | Kort + knapp "Skapa" | Kritisk |
| REQ-06 | Systemet ska låta användaren se alla skapade underhållsplaner och deras status via "Visa underhållsplaner". | Kort + knapp "Visa" | Kritisk |
| REQ-07 | Systemet ska visa en sektion "Senaste underhållsplaner" med de senast skapade planerna direkt på grundvyn. | Rubrik "Senaste underhållsplaner" | Hög |
| REQ-08 | När inga underhållsplaner finns ska systemet visa ett tydligt tomt-tillstånd ("Inga planer skapade ännu.") istället för en tom yta eller fel. ⚠️ Se avvikelse nedan — osäkert om "inga" stämmer. | Text "Inga planer skapade ännu." (efter kort "Laddar…") | Medel |

## C. Extrafunktioner

| Krav-ID | Beskrivning | Härlett från | Prioritet |
|---|---|---|---|
| REQ-09 | Systemet ska tillhandahålla en kartvy ("Visa karta") som visar underhållsplaner med koordinater på en karta (Google Maps), och ange hur många av det totala antalet planer som har koordinater. | Flytande jordglob-knapp öppnar modal "Karta — 52 av 70 planer har koordinater" med markörer per fastighet | Medel |
| REQ-10 | Systemet ska tillhandahålla en AI-assistent ("Öppna AI-assistent") där användaren kan skriva en fråga om underhållsplaneringen och skicka den. | Flytande knapp öppnar dialog "AI-assistent" med rubrik "Vad vill du veta om förvaltningsunderhållet idag?", textfält "Skriv din fråga..." och knapp "Skicka" (inaktiv tills text skrivits) | Medel |

## D. Sidfot & information

| Krav-ID | Beskrivning | Härlett från | Prioritet |
|---|---|---|---|
| REQ-11 | Sidan ska ha en sidfot med copyright/år och riktiga, klickbara (och tillgängliga) länkar till Cookies, Integritet, Om webbplatsen och Tillgänglighet. ⚠️ Uppfylls INTE idag — se avvikelse nedan. | Text "Underhållsplanering 2026" + fyra länk-liknande etiketter, längst ner på sidan | Medel |

---

## ⚠️ Observerade avvikelser (upptäckta under analysen)

Dessa är inte krav i sig, utan konkreta fynd som bör diskuteras med
produktägare/utvecklare — de kan vara buggar, eller avsiktligt beteende vi
missförstår.

1. **Sidfoten är en bild, inte riktiga länkar.** "Cookies", "Integritet",
   "Om webbplatsen" och "Tillgänglighet" ser ut som klickbara länkar men är
   del av en statisk bakgrundsbild (`buttom_border-*.png`, tom alt-text).
   De går inte att klicka på, och en skärmläsare får ingen information om
   dem alls. Berör REQ-11 — troligen en bugg eller en ofärdig
   implementation.
2. **"Logga ut" loggar inte ut fullständigt.** Efter klick på "Logga ut" och
   ett förnyat besök på `/dashboard` loggades testkontot **tyst in igen**
   via Microsoft-SSO:n — ingen inloggningsskärm visades. Det tyder på att
   knappen bara rensar appens egen (lokala) session, medan
   Microsoft-sessionen i webbläsaren lever kvar och används för en
   "silent" återinloggning. Kan vara avsiktligt i en SSO-miljö, men bör
   bekräftas — annars upplever användaren att "Logga ut" inte gör något.
   Berör REQ-03.
3. **Motstridig data: "Inga planer" vs. 70 planer på kartan.** Grundvyns
   sektion "Senaste underhållsplaner" visar "Inga planer skapade ännu.",
   men kartmodalen (via "Visa karta") anger "52 av 70 planer har
   koordinater" — dvs. det finns minst 70 underhållsplaner i systemet.
   Antingen är grundvyns lista bruten (hämtar fel data/fel användare), eller
   så visar de två vyerna avsiktligt olika saker ("mina planer" vs. "alla
   planer i systemet") — oklart vilket. Berör REQ-07/REQ-08 och bör
   klargöras innan de kraven bekräftas.

## Nästa steg

1. Gå igenom REQ-01–11 tillsammans i teamet — bekräfta, korrigera eller ta
   bort rader som inte stämmer.
2. Komplettera med krav från produktägare/utvecklare där ni är osäkra
   (särskilt REQ-01, REQ-05, REQ-06 som är kritiska).
3. När kraven är bekräftade: skriv testfall per krav (Test-ID,
   förutsättningar, steg, förväntat resultat) i nästa pass.
