import { beforeAll, describe, expect, test } from "vitest";
import type { BUILDNANACtx } from "../../src/types";

describe("Plugin loading", () => {
    beforeAll(async () => {
        await page.addScriptTag({ path: "dist/buildnana.js" });
    });

    test("testPlugin methods should exist in context", async () => {
        const method = await page.evaluate(() => {
            const testPlugin = (k: BUILDNANACtx) => ({
                myMethod() {
                    return k.VERSION;
                },
            });

            const k = buildnana({ plugins: [testPlugin] });

            return k.myMethod;
        });

        expect(method).toBeDefined();
    }, 20000);

    test("testPlugin methods should work in context", async () => {
        const [version, methodResult] = await page.evaluate(() => {
            const testPlugin = (k: BUILDNANACtx) => ({
                myMethod() {
                    return k.VERSION;
                },
            });

            const k = buildnana({ plugins: [testPlugin] });

            return [k.VERSION, k.myMethod()];
        });

        expect(methodResult).toBe(version);
    }, 20000);
});
