import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'https://app-riksund-fe-underhallsplanering-test.azurewebsites.net',
    // Återanvänder den Chrome som redan finns installerad på maskinen
    // istället för att ladda ner en egen Playwright-bläddrare.
    channel: 'chrome',
    locale: 'sv-SE',
    trace: 'on-first-retry',
  },
  projects: [
    {
      // Tester som kräver att man INTE är inloggad (t.ex. REQ-01/TC-01).
      name: 'unauthenticated',
      testMatch: '**/*.unauth.spec.ts',
    },
    {
      // Tester mot dashboardens innehåll — kräver en inloggad session,
      // laddad från auth-state.json (se testfall.md, "Om de autentiserade
      // testerna").
      name: 'authenticated',
      testMatch: '**/*.auth.spec.ts',
      use: {
        storageState: './auth-state.json',
      },
    },
  ],
});
