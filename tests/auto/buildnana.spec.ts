import { beforeAll, describe, expect, test } from "vitest";

describe("Context Initialization", () => {
    beforeAll(async () => {
        await page.addScriptTag({ path: "dist/buildnana.js" });
    });

    test(
        "VERSION constant shouldn't be defined in global scope when buildnana({ global: false })",
        async () => {
            const version = await page.evaluate(() => {
                buildnana({ global: false });
                // @ts-ignore
                return window["VERSION"];
            });

            expect(version).toBeUndefined();
        },
        20000,
    );

    test(
        "VERSION constant should be defined in global scope wwhen buildnana()",
        async () => {
            const version = await page.evaluate(() => {
                buildnana();
                // @ts-ignore
                return window["VERSION"];
            });

            expect(version).toBeDefined();
        },
        20000,
    );
});
