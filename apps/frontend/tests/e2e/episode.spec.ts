import { expect, test } from '@playwright/test';

const episode120 = {
  title:
    'LEP#120 - UTMB / CCC - French Trail Festival - Laufend Entdecken Podcast - Der österreichische Laufpodcast - Episode 120',
  description:
    /^Seit Jahren als Ziel auserkoren, war es Ende August soweit\. Der UTMB 2021 fand/
};

test('works with episode numbers', async ({ page }) => {
  await page.goto('/120');

  await expect(page).toHaveTitle(episode120.title);

  const ogTitle = page.locator('meta[property="og:title"]');
  await expect(ogTitle).toHaveAttribute('content', episode120.title);

  const twitterTitle = page.locator('meta[name="twitter:title"]');
  await expect(twitterTitle).toHaveAttribute('content', episode120.title);

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute('content', episode120.description);

  const ogImage = page.locator('meta[property="og:image"]');
  const ogImageContent = await ogImage.getAttribute('content');
  expect(ogImageContent).toMatch(
    /^\/_image\?href=https%3A%2F%2Flaufendentdecken-podcast\.at%2Fwp-content%2Fuploads%2F.+&w=640&h=640&q=75/
  );

  const twitterImage = page.locator('meta[name="twitter:image:src"]');
  const twitterImageContent = await twitterImage.getAttribute('content');
  expect(twitterImageContent).toMatch(
    /^\/_image\?href=https%3A%2F%2Flaufendentdecken-podcast\.at%2Fwp-content%2Fuploads%2F.+&w=640&h=640&q=75/
  );
});
