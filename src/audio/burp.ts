import { _k } from "../shared";
import { type AudioPlay, type AudioPlayOpt, play } from "./play";

// core BUILDNANA logic
export function burp(opt?: AudioPlayOpt): AudioPlay {
    if (!_k.game.defaultAssets.burp) {
        throw new Error("You can't use burp in buildnana/mini");
    }

    return play(_k.game.defaultAssets.burp, opt);
}
