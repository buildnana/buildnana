import type { ButtonBinding } from "../app/inputBindings";
import type { KEventController } from "../events/events";
import type { ScopeHandlers } from "../events/scopeHandlers";
import type { BUILDNANAOpt } from "../types";
import type { BUILDNANACtx } from "./contextType";

export type InfBUILDNANAOpt<T extends BUILDNANAOpt = BUILDNANAOpt> = {
    buttons: T extends { buttons: infer B } ? B : undefined;
    plugins: T extends { plugins: infer P } ? P : undefined;
    scenes: T extends { types: infer P }
        ? P extends { scenes: infer S } ? S : undefined
        : undefined;
    tags: T extends { types: infer P }
        ? P extends { tags: infer T } ? T : undefined
        : undefined;
    strictScenes: T extends { types: infer P }
        ? P extends { strictScenes: infer S } ? S : undefined
        : undefined;
    strictTag: T extends { types: infer P }
        ? P extends { strictTags: infer T } ? T : undefined
        : undefined;
};

export type OptionalString<T extends string> = T | {} & string;

/**
 * Type options for the BUILDNANA context.
 */
export type TypesOpt = {
    /**
     * Scene types, made for inference in
     *
     * - `go()`
     * - `scene()`
     * - `stay()`
     */
    scenes?: {
        [key in string]?: any[];
    };
    /**
     * Tag types, made for inference in
     *
     * - `get()`
     * - all `on()` functions
     */
    // tags?: {
    //     [key in string]: Comp;
    // };
    /**
     * If `true`, the scene name must be only the ones defined in `scenes`.
     */
    strictScenes?: boolean;
    /**
     * If `true`, the tag name must be only the ones defined in `tags`.
     */
    //    strictTags?: boolean;
};

export type Opt<T extends TypesOpt = TypesOpt> = T;

export type BUILDNANAOptTypeOptions = Pick<
    BUILDNANAOpt,
    "buttons" | "plugins" | "types"
>;

export type BUILDNANATypeOptWithoutPlugins = Omit<
    BUILDNANAOptTypeOptions,
    "plugins"
>;
// Helpers

type SceneName<O extends BUILDNANAOptTypeOptions> =
    InfBUILDNANAOpt<O>["scenes"] extends undefined ? string
        : InfBUILDNANAOpt<O>["strictScenes"] extends true
            ? keyof InfBUILDNANAOpt<O>["scenes"]
        : OptionalString<Extract<keyof InfBUILDNANAOpt<O>["scenes"], string>>;

type SceneArgs<TScene, TSceneMap> = TScene extends keyof TSceneMap
    ? TSceneMap[TScene] extends Array<any> ? TSceneMap[TScene] : any[]
    : any[];

// export type TagName<O extends BUILDNANATypeOpt = any> = O extends BUILDNANATypeOpt
//     ? keyof O["tags"] extends undefined ? string
//     : O["strictTags"] extends true ? Extract<keyof O["tags"], string>
//     : OptionalString<Extract<keyof O["tags"], string>>
//     : string;

export type ButtonName<TOpt extends BUILDNANAOptTypeOptions> =
    keyof TOpt["buttons"] extends undefined ? string
        : TOpt["buttons"] extends Record<string, ButtonBinding>
            ? Extract<keyof TOpt["buttons"], string>
        : OptionalString<Extract<keyof TOpt["buttons"], string>>;

// export type CompFromTag<O extends BUILDNANATypeOpt, TTag> = TTag extends
//     keyof O["tags"] ? O["tags"][TTag]
//     : any;

// #region Scopes
export type SceneScopeT<
    O extends BUILDNANAOptTypeOptions = any,
> = ScopeHandlers & {
    <T extends SceneName<O>>(
        name: T,
        def: (
            ...args: SceneArgs<T, InfBUILDNANAOpt<O>["scenes"]>
        ) => void,
    ): void;
};

// #endregion

// Typed Context

export interface BUILDNANACtxTMethods<
    O extends BUILDNANAOptTypeOptions = any,
> {
    scene: SceneScopeT<O>;

    go<T extends SceneName<O>>(
        name: T,
        ...args: SceneArgs<T, InfBUILDNANAOpt<O>["scenes"]>
    ): void;

    pushScene<T extends SceneName<O>>(
        T: string,
        ...args: SceneArgs<T, InfBUILDNANAOpt<O>["scenes"]>
    ): void;

    getSceneName(): SceneName<O> | null;

    // Buttons API
    onButtonPress(
        btn: ButtonName<O> | ButtonName<O>[],
        action: (btn: ButtonName<O>) => void,
    ): KEventController;
    onButtonPress(action: (btn: ButtonName<O>) => void): KEventController;

    onButtonRelease(
        btn: ButtonName<O> | ButtonName<O>[],
        action: (btn: ButtonName<O>) => void,
    ): KEventController;
    onButtonRelease(action: (btn: ButtonName<O>) => void): KEventController;

    onButtonDown(
        btn: string | string[],
        action: (btn: string) => void,
    ): KEventController;
    onButtonDown(action: (btn: ButtonName<O>) => void): KEventController;

    isButtonPressed(btn?: ButtonName<O> | ButtonName<O>[]): boolean;
    isButtonDown(btn?: ButtonName<O> | ButtonName<O>[]): boolean;
    isButtonReleased(btn?: ButtonName<O> | ButtonName<O>[]): boolean;

    getButton(btn: ButtonName<O>): ButtonBinding;

    pressButton(btn: ButtonName<O>): void;
    releaseButton(btn: ButtonName<O>): void;
}

export type BUILDNANACtxT<O extends BUILDNANAOptTypeOptions = any> =
    & BUILDNANACtxTMethods<O>
    & Omit<BUILDNANACtx, keyof BUILDNANACtxTMethods<O>>;
