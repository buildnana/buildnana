// The definitive version!
import { SoundData } from "./assets/sound";
import { loadSprite } from "./assets/sprite";
import { createEmptyAudioBuffer } from "./audio/audio";
import { createContext } from "./core/context";
import type { BUILDNANACtx } from "./core/contextType";
import { createEngine } from "./core/engine";
import type {
    BUILDNANACtxT,
    BUILDNANAOptTypeOptions,
    BUILDNANATypeOptWithoutPlugins,
    TypesOpt,
} from "./core/taf";
import beanSrc from "./data/assets/bean.png";
import boomSpriteSrc from "./data/assets/boom.png";
import burpSoundSrc from "./data/assets/burp.mp3";
import happyFontSrc from "./data/assets/happy.png";
import kaSpriteSrc from "./data/assets/ka.png";
import { _setTopMostOnlyActivate } from "./ecs/components/physics/area";
import { createCollisionSystem } from "./ecs/systems/createCollisionSystem";
import { system, SystemPhase } from "./ecs/systems/systems";
import { _k, updateEngine } from "./shared";
import {
    type BUILDNANAOpt,
    type BUILDNANAPlugin,
    type MergePlugins,
    type PluginList,
} from "./types";

// If buildnana() was already called
let ran = false;

type HasDefinedKeys<TObj, TCheck> = {
    [K in keyof TCheck & keyof TObj]: TObj[K] extends undefined ? never : K;
}[keyof TCheck & keyof TObj] extends never ? never : TObj;

type ChooseBUILDNANACtx<O extends BUILDNANAOptTypeOptions> =
    HasDefinedKeys<O, BUILDNANATypeOptWithoutPlugins> extends never
        ? BUILDNANACtx
        : BUILDNANACtxT<O>;

type BUILDNANAGame<O extends BUILDNANAOptTypeOptions | undefined> = O extends
    BUILDNANAOptTypeOptions ? O["plugins"] extends PluginList<any> ?
            & ChooseBUILDNANACtx<O>
            & MergePlugins<O["plugins"]>
    : ChooseBUILDNANACtx<O>
    : BUILDNANACtx;

/**
 * Initialize BUILDNANA context. The starting point of all BUILDNANA games.
 *
 * @example
 * ```js
 * // Start BUILDNANA with default options (will create a fullscreen canvas under <body>)
 * buildnana()
 *
 * // Init with some options
 * buildnana({
 *     width: 320,
 *     height: 240,
 *     font: "sans-serif",
 *     canvas: document.querySelector("#mycanvas"),
 *     background: [ 0, 0, 255, ],
 * })
 *
 * // All BUILDNANA functions are imported to global after calling buildnana()
 * add()
 * onUpdate()
 * onKeyPress()
 * vec2()
 *
 * // If you want to prevent BUILDNANA from importing all functions to global and use a context handle for all BUILDNANA functions
 * const k = buildnana({ global: false })
 *
 * k.add(...)
 * k.onUpdate(...)
 * k.onKeyPress(...)
 * k.vec2(...)
 * ```
 *
 * @group Start
 */
export const buildnana = <
    O extends BUILDNANAOpt,
>(
    opt?: O,
): BUILDNANAGame<O> => {
    if (ran) {
        console.warn(
            "buildnana() was called a second time, cleaning up previous state...",
        );

        // cleanup
        // @ts-ignore
        updateEngine(null);
    }

    const gopt = opt ?? {} as BUILDNANAOpt;

    ran = true;

    updateEngine(createEngine(gopt));

    const {
        app,
        game,
        audio,
    } = _k;

    const { checkFrame, retrieve } = createCollisionSystem({
        broad: gopt.broadPhaseCollisionAlgorithm || "sap",
        narrow: gopt.narrowPhaseCollisionAlgorithm || "gjk",
        opt: gopt,
    });

    game.retrieve = retrieve;

    _setTopMostOnlyActivate(gopt.topMostOnlyActivate ?? false);

    system("collision", checkFrame, [
        SystemPhase.AfterFixedUpdate,
        SystemPhase.AfterUpdate,
    ]);

    // #region Loading default assets
    game.defaultAssets.ka = loadSprite(null, kaSpriteSrc);
    game.defaultAssets.boom = loadSprite(null, boomSpriteSrc);

    // by default browsers can only load audio async, we don't deal with that and just start with an empty audio buffer
    const burpSnd = new SoundData(createEmptyAudioBuffer(audio.ctx));

    // load that burp sound
    audio.ctx.decodeAudioData(burpSoundSrc.buffer.slice(0) as ArrayBuffer).then(
        (buf) => {
            burpSnd.buf = buf;
            game.defaultAssets.burp = burpSnd;
        },
    ).catch((err) => {
        console.error("Failed to load burp: ", err);
    });

    game.defaultAssets.bean = beanSrc;
    game.defaultAssets.happy = happyFontSrc;
    // #endregion

    _k.startLoop();

    // the exported ctx handle
    const ctx: BUILDNANACtx = createContext(
        _k,
        gopt.plugins as BUILDNANAPlugin<Record<string, unknown>>[],
        gopt.global !== false,
    );

    if (gopt.focus !== false) {
        app.canvas.focus();
    }

    return ctx as BUILDNANAGame<O>;
};

export const buildnanaTypes = <T extends TypesOpt = TypesOpt>(): T => {
    return null as unknown as T;
};

export default buildnana;
