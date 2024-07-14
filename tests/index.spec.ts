import { expect, test } from "@playwright/test";

test.describe("Home Page Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads and displays a random meme", async ({ page }) => {
    await expect(page.locator("role=progressbar")).toHaveCount(0);
    const memeImage = page.locator("img");
    await expect(memeImage).toBeVisible();
  });

  test("navigates to next meme on right arrow key press", async ({ page }) => {
    await page.waitForSelector("img");
    const firstMemeSrc = await page.locator("img").getAttribute("src");
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(1000);
    const secondMemeSrc = await page.locator("img").getAttribute("src");
    expect(firstMemeSrc).not.toBe(secondMemeSrc);
  });

  test("shows bottom buttons", async ({
    page,
  }) => {
    await expect(page.locator("text=Download")).toBeVisible();
    await expect(page.locator("text=Copy path to clipboard")).toBeVisible();
  });

  test("downloads meme on download button click", async ({
    page,
  }) => {
    await page.waitForSelector("img"); // Wait for the meme to load
    const downloadPromise = page.waitForEvent("download");
    await page.locator("text=Download").click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.(png|jpg|jpeg|gif|bmp|webp)$/);
  })

  test("opens meme in new tab on click when on small screen", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 480, height: 480 }); // Small screen
    await page.waitForSelector("img"); // Wait for the meme to load
    const meme = page.locator("img");
    const memeSrc = await meme.getAttribute("src");

    if (!memeSrc) {
      throw new Error("Meme src not found");
    }

    const memeUrlParamMatch = memeSrc.match(/url=([^&]+)/);
    if (!memeUrlParamMatch) {
      throw new Error("Meme url param not found");
    }

    const decodedMemeSrc = decodeURIComponent(memeUrlParamMatch[1]);

    const newPagePromise = page.context().waitForEvent("page");
    await meme.click() // Assuming clicking the image opens it in a new tab
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();

    const newPageUrl = newPage.url();

    expect(newPageUrl).toContain(decodedMemeSrc);
  });
});
