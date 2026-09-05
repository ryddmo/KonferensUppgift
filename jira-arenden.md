# Jira-ärenden — utkast

Färdiga att klistra in i Jira. Se processen i chatten/README för hur ett
fynd blir ett ärende. Varje utkast är skrivet så att Summary/Description
kan kopieras rakt av.

---

## 1. Bug — Sidfotens länkar är inte klickbara

**Typ:** Bug
**Koppling till krav:** REQ-11
**Prioritet:** Medel
**Summary:** Sidfotens länkar (Cookies, Integritet, Om webbplatsen, Tillgänglighet) är inte klickbara

**Description:**
> **Miljö:** app-riksund-fe-underhallsplanering-test.azurewebsites.net/dashboard
>
> **Steg för att återskapa:**
> 1. Logga in och gå till dashboardens grundvy.
> 2. Scrolla till sidfoten längst ner.
> 3. Försök klicka på "Cookies", "Integritet", "Om webbplatsen" eller "Tillgänglighet".
>
> **Förväntat resultat:** Länkarna är klickbara och leder till respektive sida/dokument.
>
> **Faktiskt resultat:** Texten är del av en statisk bakgrundsbild
> (`buttom_border-*.png`, tom alt-text). Inget går att klicka på, och
> skärmläsare får ingen information om innehållet alls.
>
> **Se även:** krav-dashboard.md REQ-11, testfall.md TC-15
> (`tests/omrade-d-sidfot.auth.spec.ts`, markerat `test.fail()` tills löst).

---

## 2. Fråga/Spike — "Logga ut" verkar inte avsluta SSO-sessionen

**Typ:** Fråga/Spike (avgör om det är en bugg innan den omklassificeras)
**Koppling till krav:** REQ-03
**Prioritet:** Hög
**Summary:** Användare loggas tyst in igen efter "Logga ut" — SSO-sessionen verkar leva kvar

**Description:**
> **Miljö:** app-riksund-fe-underhallsplanering-test.azurewebsites.net/dashboard
>
> **Steg för att återskapa:**
> 1. Logga in och gå till dashboardens grundvy.
> 2. Klicka på "Logga ut".
> 3. Navigera till `/dashboard` igen (t.ex. skriv in URL:en igen).
>
> **Förväntat resultat:** Osäkert — behöver klargöras (se fråga nedan).
> Rimligt antagande: användaren ska behöva logga in på nytt.
>
> **Faktiskt resultat:** Användaren kommer direkt in i dashboarden igen utan
> att se någon inloggningsskärm. Appen verkar bara rensa sin egen lokala
> session, medan Microsofts SSO-session i webbläsaren lever kvar och
> används för en tyst återinloggning.
>
> **Fråga till produktägare/utvecklare:** Är det avsiktligt att "Logga ut"
> bara loggar ut ur appen (inte ur hela SSO:n)? Om ja — bör knappen/texten
> förtydligas för användaren. Om nej — bör den även trigga en fullständig
> SSO-utloggning.
>
> **Se även:** krav-dashboard.md REQ-03, testfall.md TC-07
> (`tests/omrade-a-auth-navigering.auth.spec.ts`, markerat `test.fail()` tills löst).

---

## 3. Fråga/Spike — Motstridig data: "Inga planer" vs. 70 planer på kartan

**Typ:** Fråga/Spike
**Koppling till krav:** REQ-07, REQ-08
**Prioritet:** Hög
**Summary:** Grundvyn visar "Inga planer skapade ännu." samtidigt som kartan visar 70 planer i systemet

**Description:**
> **Miljö:** app-riksund-fe-underhallsplanering-test.azurewebsites.net/dashboard
>
> **Steg för att återskapa:**
> 1. Logga in och gå till dashboardens grundvy — notera att "Senaste
>    underhållsplaner" visar "Inga planer skapade ännu."
> 2. Klicka på kartknappen — notera att rubriken anger "52 av 70 planer har
>    koordinater".
>
> **Förväntat resultat:** Osäkert — behöver klargöras (se fråga nedan).
>
> **Faktiskt resultat:** De två vyerna visar till synes motstridig
> information om hur många underhållsplaner som finns.
>
> **Fråga till produktägare/utvecklare:** Är "Senaste underhållsplaner" tänkt
> att bara visa planer knutna till den inloggade användaren (medan kartan
> visar alla planer i systemet), eller är listan trasig/hämtar fel data?
>
> **Se även:** krav-dashboard.md (avvikelse #3), testfall.md TC-12
> (`tests/omrade-b-underhallsplaner.auth.spec.ts`).

---

## Nästa steg

- Klistra in dessa tre i Jira och sätt rätt projekt/komponent.
- När produktägare/utvecklare svarat på frågorna i #2 och #3: uppdatera
  krav-dashboard.md (byt "Antaget"/⚠️ mot "Bekräftat" eller korrigera
  kravtexten), och ta bort `test.fail()` i motsvarande testfil om
  beteendet nu är korrekt (eller uppdatera testet om kravet ändrades).
