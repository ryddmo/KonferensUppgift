import { test, expect } from '@playwright/test';

/**
 * Område B — Underhållsplaner (grundvyns kort och lista).
 * Kräver en inloggad session (se testfall.md, "Om de autentiserade
 * testerna"). Se krav-dashboard.md för fullständig kravtext.
 */

test('TC-09 (REQ-05): "Skapa en ny underhållsplan" navigerar till skapa-flödet', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: 'Skapa en ny underhållsplan' })).toBeVisible();
  await page.getByRole('button', { name: 'Skapa' }).click();
  // Smoke-test: vi verifierar bara att man kommer till rätt sida.
  // Det fördjupade skapa-flödet på /planer/skapa är inte kravsatt än.
  await expect(page).toHaveURL(/\/planer\/skapa$/);
});

test('TC-10 (REQ-06): "Visa underhållsplaner" navigerar till planlistan', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: 'Visa underhållsplaner' })).toBeVisible();
  await page.getByRole('button', { name: 'Visa', exact: true }).click();
  // Smoke-test: listvyn på /planer är inte kravsatt än.
  await expect(page).toHaveURL(/\/planer$/);
});

test('TC-11 (REQ-07): "Senaste underhållsplaner" är synlig på grundvyn', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: 'Senaste underhållsplaner' })).toBeVisible();
});

test('TC-12 (REQ-08): Tomt-tillstånd visas när inga planer listas', async ({ page }) => {
  await page.goto('/dashboard');
  // ⚠️ Känd, oklar avvikelse (se krav-dashboard.md): kartan i TC-13 visar
  // samtidigt 70 planer i systemet. Det här testet dokumenterar bara det
  // observerade nuläget på grundvyn — inte att beteendet är bekräftat rätt.
  await expect(page.getByText('Inga planer skapade ännu.')).toBeVisible();
});
