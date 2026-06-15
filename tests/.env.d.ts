import type { buildnana as BUILDNANA } from "../src/buildnana";

declare global {
    const buildnana: typeof BUILDNANA;
}
