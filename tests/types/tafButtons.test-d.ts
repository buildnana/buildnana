import { describe, test } from "vitest";
import { buildnana, buildnanaTypes } from "../../src/buildnana";
import type { Opt } from "../../src/core/taf";

describe("Typed Buttons", () => {
    const k = buildnana({
        background: "fff",
        buttons: {
            "jump": {},
        },
        types: buildnanaTypes<
            Opt<
                {
                    scenes: {
                        "game": [score: number];
                    };
                }
            >
        >(),
    });

    k.scene("game", () => {});

    test("in isButtonPressed(btn), btn is typed", () => {
        k.isButtonPressed("jump");
        // @ts-expect-error
        k.isButtonPressed("f");
    });
});
