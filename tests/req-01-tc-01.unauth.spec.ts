import { test, expect } from '@playwright/test';

/**
 * REQ-01 — Endast SSO-autentiserade användare ska nå /dashboard.
 * Se krav-dashboard.md och testfall.md för fullständig kravtext.
 *
 * TC-01: Direktåtkomst utan aktiv session ska omdirigera till
 * Microsofts inloggningssida — dashboardens innehåll ska aldrig visas.
 *
 * Playwright ger varje test en helt ny, tom webbläsarkontext som
 * standard (motsvarar "inkognito") — ingen inloggning laddas in, vilket
 * är precis förutsättningen TC-01 kräver.
 */
test('TC-01: Direktåtkomst utan session omdirigerar till Microsoft-inloggning', async ({ page }) => {
  await page.goto('/dashboard');

  // Förväntat resultat: omdirigering till Microsofts inloggningssida.
  await expect(page).toHaveURL(/^https:\/\/login\.microsoftonline\.com\//);
  await expect(page).toHaveTitle(/logga in/i);

  // Dashboardens innehåll ska aldrig visas, ens kortvarigt.
  await expect(page.getByRole('heading', { name: 'Underhållsplanering' })).toHaveCount(0);
});
