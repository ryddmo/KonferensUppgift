import { test, expect } from '@playwright/test';

/**
 * Område A — Autentisering & navigering (header).
 * Kräver en inloggad session (se testfall.md, "Om de autentiserade
 * testerna"). Se krav-dashboard.md för fullständig kravtext.
 */

test('TC-02 (REQ-01): Giltig session visar dashboardens grundvy direkt', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole('heading', { name: 'Underhållsplanering', level: 1 })).toBeVisible();
});

test('TC-06 (REQ-02): Headern visar den inloggade användarens namn', async ({ page }) => {
  await page.goto('/dashboard');
  const userName = page.getByText('Stefan Rydin');
  // OBS: namnet är den faktiska inloggade användaren i det här testkontot —
  // om testet körs med en annan inloggning behöver texten bytas ut mot en
  // generell kontroll (t.ex. att headern innehåller *något* icke-tomt namn).
  await expect(userName).toBeVisible();
});

// ⚠️ Känd avvikelse (se krav-dashboard.md): "Logga ut" verkar bara rensa
// appens egen session — Microsofts SSO-session i webbläsaren lever kvar,
// så nästa besök loggar tyst in användaren igen utan att visa någon
// inloggningsskärm. test.fail() dokumenterar det nuvarande, oklara
// beteendet tills det är bekräftat avsiktligt eller åtgärdat.
test.fail('TC-07 (REQ-03): "Logga ut" avslutar sessionen (kräver ny inloggning vid nästa besök)', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Logga ut' }).click();

  // Efter utloggning ska förnyad åtkomst till /dashboard kräva inloggning.
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/^https:\/\/login\.microsoftonline\.com\//);
});

test('TC-08 (REQ-04): "Startsida" behåller/navigerar till grundvyn', async ({ page }) => {
  await page.goto('/dashboard');
  const startBtn = page.getByRole('button', { name: 'Startsida' });
  await expect(startBtn).toBeVisible();
  await startBtn.click();
  await expect(page.getByRole('heading', { name: 'Underhållsplanering', level: 1 })).toBeVisible();
});
