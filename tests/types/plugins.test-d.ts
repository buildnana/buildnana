import { describe, expectTypeOf, test } from "vitest";
import { buildnana } from "../../src/buildnana";
import type { BUILDNANACtx } from "../../src/core/contextType";

type ImplicitTestPlug = ReturnType<typeof implicitTestPlug>;

const implicitTestPlug = (k: BUILDNANACtx) => ({
    getVersion() {
        return k.VERSION;
    },
});

describe("Type Inference from plugins", () => {
    // Inferred plugins

    test("type of plugin should be inferred from buildnana({ plugins: [ implicitTestPlug ] })", () => {
        const k = buildnana({ plugins: [implicitTestPlug] });

        k.getVersion;

        expectTypeOf(k).toEqualTypeOf<
            BUILDNANACtx & ImplicitTestPlug
        >();
    });
});
