import { expect, test } from '@playwright/test';

const indexMeta = {
  title: 'Laufend Entdecken Podcast - Der österreichische Laufpodcast',
  description:
    'Laufend Entdecken ist der österreichische Laufpodcast. Wir sprechen über Laufen, Training, Wettkämpfe und alles rund ums Thema Laufsport.',
  imagePattern:
    /^https:\/\/laufendentdecken-podcast\.at\/wp-content\/uploads\/.+\.jpeg$/
};

test('index page has correct meta', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(indexMeta.title);

  const ogTitle = page.locator('meta[property="og:title"]');
  await expect(ogTitle).toHaveAttribute('content', indexMeta.title);

  const twitterTitle = page.locator('meta[name="twitter:title"]');
  await expect(twitterTitle).toHaveAttribute('content', indexMeta.title);

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute('content', indexMeta.description);

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

  const firstEpisodeThumbnail = page.locator(
    '[aria-label="EpisodeList"] li:first-of-type > div > img'
  );
  await expect(firstEpisodeThumbnail).toHaveAttribute(
    'src',
    RegExp('^/_image[?]href=.*w=160&h=160&q=75&f=avif$')
  );
});
