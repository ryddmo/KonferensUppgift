import { test, expect } from '@playwright/test';

/**
 * Område D — Sidfot & information.
 * Kräver en inloggad session (se testfall.md, "Om de autentiserade
 * testerna"). Se krav-dashboard.md för fullständig kravtext.
 */

// ⚠️ Känd avvikelse: "Cookies", "Integritet", "Om webbplatsen" och
// "Tillgänglighet" ser ut som länkar i sidfoten men är i verkligheten en del
// av en statisk bakgrundsbild — inga riktiga <a>-element, inte klickbara,
// osynliga för skärmläsare. test.fail() markerar testet som "förväntat att
// misslyckas": det syns som en accepterad, förväntad röd status i
// rapporten istället för att se ut som ett trasigt test. Den dagen buggen
// är fixad börjar testet i stället "oväntat lyckas" — ta bort test.fail()
// då, så blir det en vanlig, grön regressionstest.
test.fail(
  'TC-15 (REQ-11): Sidfoten har riktiga, klickbara länkar (känd avvikelse — se krav-dashboard.md)',
  async ({ page }) => {
    await page.goto('/dashboard');
    for (const name of ['Cookies', 'Integritet', 'Om webbplatsen', 'Tillgänglighet']) {
      await expect(page.getByRole('link', { name })).toBeVisible();
    }
  }
);
