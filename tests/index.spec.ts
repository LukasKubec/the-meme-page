import { expect, test } from "@playwright/test";

const iPhoneSE = {
  width: 320,
  height: 568,
};

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

  test("shows action buttons", async ({ page }) => {
    await expect(page.locator("text=Download")).toBeVisible();
    await expect(page.locator("text=Copy")).toBeVisible();
  });

  test("downloads meme on download button click", async ({ page }) => {
    await page.waitForSelector("img");
    const downloadPromise = page.waitForEvent("download");
    await page.locator("text=Download").click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.(png|jpg|jpeg|gif|bmp|webp)$/i);
  });

  test("loads a new random meme on click on image", async ({ page }) => {
    await page.waitForSelector("img");
    const meme = page.locator("img");
    const initialMemeSrc = await meme.getAttribute("src");
    if (!initialMemeSrc) {
      throw new Error("Initial meme src not found");
    }

    await meme.click();
    await page.waitForTimeout(1000);

    const newMemeSrc = await meme.getAttribute("src");

    if (!newMemeSrc) {
      throw new Error("New meme src not found");
    }
    expect(initialMemeSrc).not.toBe(newMemeSrc);
  });

  test("on small screens bottom line of the img is visible over the fold", async ({
    page,
  }) => {
    await page.setViewportSize(iPhoneSE); // iPhone SE
    await page.waitForSelector("img");
    const memeImage = page.locator("img");
    const boundingBox = await memeImage.boundingBox();
    const viewportHeight = page.viewportSize()?.height;

    if (!boundingBox || !viewportHeight) {
      throw new Error("Bounding box or viewport height not found");
    }

    const { y, height } = boundingBox;
    expect(y + height).toBeLessThanOrEqual(viewportHeight);
  });
});
