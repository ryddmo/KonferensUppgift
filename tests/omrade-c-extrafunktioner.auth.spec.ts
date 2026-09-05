import { test, expect } from '@playwright/test';

/**
 * Område C — Extrafunktioner (karta & AI-assistent).
 * Kräver en inloggad session (se testfall.md, "Om de autentiserade
 * testerna"). Se krav-dashboard.md för fullständig kravtext.
 */

test('TC-13 (REQ-09): "Visa karta" öppnar en kartmodal med koordinatantal', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Visa karta' }).click();

  // Rubriken anger "X av Y planer har koordinater" — vi låser inte de
  // exakta siffrorna eftersom antalet planer i systemet kan ändras.
  await expect(page.getByText(/\d+ av \d+ planer har koordinater/)).toBeVisible();
  await expect(page.getByRole('region', { name: 'Karta' })).toBeVisible();

  await page.getByRole('button', { name: 'Stäng' }).click();
  await expect(page.getByText(/\d+ av \d+ planer har koordinater/)).toHaveCount(0);
});

test('TC-14 (REQ-10): "Öppna AI-assistent" öppnar en fungerande frågedialog', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Öppna AI-assistent' }).click();

  const dialog = page.getByRole('dialog', { name: 'AI-assistent' });
  await expect(dialog).toBeVisible();

  const input = dialog.getByRole('textbox', { name: 'Skriv din fråga...' });
  const sendButton = dialog.getByRole('button', { name: 'Skicka' });

  // Skicka-knappen ska vara inaktiv tills en fråga skrivits in.
  await expect(sendButton).toBeDisabled();
  await input.fill('Vilka fastigheter behöver besiktigas i höst?');
  await expect(sendButton).toBeEnabled();

  await dialog.getByRole('button', { name: 'Stäng' }).click();
  await expect(dialog).toHaveCount(0);
});
