describe("HelloWorld.vue", () => {
  it("Testar evento de click row", async () => {
    const page = await globalThis.__BROWSER_GLOBAL__.newPage();

    await page.goto("http://localhost:4444/");

    await page.waitForSelector("#tree tr");
  }, 9999999);
});
