import * as svelte from 'svelte';
import { SvelteComponent } from 'svelte';
import * as _runtime_svelte_store_util from '#runtime/svelte/store/util';
import * as _runtime_svelte_store_web_storage from '#runtime/svelte/store/web-storage';
import * as svelte_store from 'svelte/store';

/**
 * ```
 * --tjs-default-text-shadow-focus-hover: system default
 * --tjs-default-outline-focus-visible: undefined; global replacement for focus-visible outline.
 *
 * --tjs-button-background
 * --tjs-button-background-focus-visible
 * --tjs-button-background-hover
 * --tjs-button-background-selected
 * --tjs-button-border
 * --tjs-button-border-radius
 * --tjs-button-border-width
 * --tjs-button-box-shadow-focus-visible
 * --tjs-button-clip-path
 * --tjs-button-clip-path-focus
 * --tjs-button-clip-path-hover
 * --tjs-button-cursor
 * --tjs-button-diameter
 * --tjs-button-outline-focus-visible
 * --tjs-button-text-shadow-focus: undefined
 * --tjs-button-text-shadow-hover: undefined
 * --tjs-button-transition
 * --tjs-button-transition-focus-visible
 *
 * --tjs-icon-button-background
 * --tjs-icon-button-background-focus-visible
 * --tjs-icon-button-background-hover
 * --tjs-icon-button-background-selected
 * --tjs-icon-button-border
 * --tjs-icon-button-border-radius
 * --tjs-icon-button-border-width
 * --tjs-icon-button-box-shadow-focus-visible
 * --tjs-icon-button-clip-path
 * --tjs-icon-button-clip-path-focus
 * --tjs-icon-button-clip-path-hover
 * --tjs-icon-button-cursor
 * --tjs-icon-button-diameter
 * --tjs-icon-button-filter-disabled
 * --tjs-icon-button-outline-focus-visible
 * --tjs-icon-button-text-shadow-focus: undefined
 * --tjs-icon-button-text-shadow-hover: undefined
 * --tjs-icon-button-transition
 * --tjs-icon-button-transition-focus-visible
 * ```
 */
declare class TjsColordButton extends SvelteComponent<
  TjsColordButton.Props,
  TjsColordButton.Events,
  TjsColordButton.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TjsColordButton | associated component}. */
declare namespace TjsColordButton {
  /** Props type alias for {@link TjsColordButton | associated component}. */
  export type Props = {
    keyCode?: any;
    button?: any;
    color?: any;
    title?: any;
    enabled?: any;
    styles?: any;
    efx?: any;
    onPress?: any;
    onContextMenu?: any;
    clickPropagate?: any;
  };
  /** Events type alias for {@link TjsColordButton | associated component}. */
  export type Events = { click: MouseEvent; contextmenu: MouseEvent; press: CustomEvent<any> } & {
    [evt: string]: CustomEvent<any>;
  };
  /** Slots type alias for {@link TjsColordButton | associated component}. */
  export type Slots = { default: {} };
}

/**
 * TODO: Finish documentation.
 *
 * Events:
 * - color: current color
 *
 */
declare class TjsColordPicker extends SvelteComponent<
  TjsColordPicker.Props,
  TjsColordPicker.Events,
  TjsColordPicker.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TjsColordPicker | associated component}. */
declare namespace TjsColordPicker {
  /** Props type alias for {@link TjsColordPicker | associated component}. */
  export type Props = {
    /**
     * color properties
     *
     * @type {import('.').TJSColordPickerColor}
     */
    color?: TJSColordPickerColor;
    /**
     * User settable options / customization properties.
     *
     * @type {import('./').TJSColordPickerOptions}
     */
    options?: TJSColordPickerOptions;
    /**
     * External shared WebStorage instance. By assigning an external `WebStorage` instance you can share state like
     * the saved colors plugin across color picker instances.
     *
     * @type {import('#runtime/svelte/store/web-storage').WebStorage}
     */
    webStorage?: _runtime_svelte_store_web_storage.WebStorage;
  };
  /** Events type alias for {@link TjsColordPicker | associated component}. */
  export type Events = { color: CustomEvent<any> } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsColordPicker | associated component}. */
  export type Slots = {};
}

type PickerStores = {
  /**
   * This selected
   * layout components.
   */
  components: svelte_store.Writable<TJSColordPickerComponents>;
  /**
   * See {@link TJSColordPickerOptions.enabled}
   */
  enabled: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.hasAlpha}
   */
  hasAlpha: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.hasButtonBar}
   */
  hasButtonBar: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.hasEyeDropper}
   */
  hasEyeDropper: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.hasTextInput}
   */
  hasTextInput: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.inputName}
   */
  inputName: svelte_store.Writable<string>;
  /**
   * See {@link TJSColordPickerOptions.isPopup}
   */
  isPopup: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.lockTextFormat}
   */
  lockTextFormat: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.precision}
   */
  precision: svelte_store.Writable<number>;
  /**
   * See {@link TJSColordPickerOptions.width}
   */
  width: svelte_store.Writable<string>;
  /**
   * Stores first tab / focus traversable element.
   */
  firstFocusEl: svelte_store.Writable<boolean>;
  /**
   * See {@link PickerInternalData.hasAddons}
   */
  hasAddons: svelte_store.Writable<boolean>;
  /**
   * See {@link PickerInternalData.isOpen}
   */
  isOpen: svelte_store.Writable<boolean>;
  /**
   * See {@link PickerInternalData.padding}
   */
  padding: svelte_store.Writable<string>;
};

/**
 * Manages the addon state instantiating external user defined addons storing the model and providing a readable store
 * of all addons for {@link AddOnPanel}.
 */
declare class AddOnState {
  /**
   * @param {import('./').InternalState}  internalState -
   */
  constructor(internalState: InternalState);
  /**
   * @returns {number} Number of addons.
   */
  get size(): number;
  /**
   * @param {string}   key - Addon ID.
   *
   * @returns {object} The model instance for any associated addon.
   */
  get(key: string): object;
  /**
   * @param {string}   key - Addon ID.
   *
   * @returns {boolean} Is an addon with the given ID found?
   */
  has(key: string): boolean;
  /**
   * Invoked from {@link InternalState} to update addon state.
   *
   * @param {Iterable<Function>}   addonOptions - `options.addons` iterable list of addon constructor functions.
   */
  updateOptions(addonOptions: Iterable<Function>): void;
  /**
   * @param {import('svelte/store').Subscriber<import('#standard/component/folder').TJSFolderData[]>} handler -
   * Callback function that is invoked on update / changes.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler: svelte_store.Subscriber<any[]>): svelte_store.Unsubscriber;
  #private;
}

/**
 * Manages the addon button state allowing addons to add buttons to the button bar. When addons are removed
 * {@link AddOnState} invokes {@link ButtonState.removeById}.
 */
declare class ButtonState {
  /**
   * @param {import('./').InternalState}  internalState -
   */
  constructor(internalState: InternalState);
  /**
   * @returns {number} Number of addons.
   */
  get length(): number;
  /**
   * Adds a {@link TJSIconButton} or {@link TJSToggleIconButton} to the {@link ButtonBar}.
   *
   * @param {object}   button - Button data; optional `isToggle` boolean to indicate a toggle button.
   */
  add(button: object): void;
  removeById(id: any): void;
  /**
   * @param {import('svelte/store').Subscriber<object[]>} handler - Callback function that is invoked on update /
   * changes.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler: svelte_store.Subscriber<object[]>): svelte_store.Unsubscriber;
  #private;
}

declare class ActiveTextState {
  constructor(allState: any, activeKey?: string);
  /**
   * @returns {object} Current active text mode configuration.
   */
  get active(): any;
  /**
   * Advances to the next color text mode.
   */
  next(): void;
  /**
   * Selects the previous color text mode.
   */
  previous(): void;
  /**
   * Sets the active key / format for text component display.
   *
   * @param {string}   format -
   */
  setFormat(format: string): void;
  /**
   * @param {import('svelte/store').Subscriber<object>} handler - Callback function that is invoked on
   * update / changes.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler: svelte_store.Subscriber<object>): svelte_store.Unsubscriber;
  #private;
}

/**
 * Provides a buffered set of stores converting the current color from color state into a rounded alpha
 * value for display in the {@link TextInput} component. The alpha component store has an overridden set method that
 * validate updates from the number inputs they are assigned to keeping number ranges between `0-1`.
 * Also handling the case when the number input is `null` which occurs when the user removes all input
 * values or inputs `-` a minus character, etc. In that case `0` is substituted for `null`.
 *
 * Note: Alpha state changes do not set `#colorStateAccess.internalUpdate.textUpdate` to true.
 */
declare class AlphaState {
  /**
   * @param {import('./').ColorStateAccess}  colorStateAccess -
   *
   * @param {import('./').TextStateAccess}   textStateAccess -
   */
  constructor(colorStateAccess: ColorStateAccess, textStateAccess: TextStateAccess);
  /**
   * @returns {AlphaStateInputData} Alpha input component data.
   */
  get inputData(): AlphaStateInputData;
  /**
   * @returns {AlphaStateStores} Alpha text state stores.
   */
  get stores(): AlphaStateStores;
  /**
   * Updates the internal state from changes in color state current color.
   *
   * @param {object}   color - Current color value (HSV currently).
   *
   * @package
   */
  _updateColor(color: object): void;
  #private;
}
/**
 * Provides the input data options to use in number input components.
 */
type AlphaStateInputData = {
  /**
   * Alpha input component data.
   */
  alpha: object;
};
/**
 * Provides the buffered stores to use in number input components.
 */
type AlphaStateStores = {
  /**
   * Alpha component value.
   */
  alpha: svelte_store.Writable<number | null>;
};

/**
 * Provides a buffered set of stores converting the current color from {@link ColorState} into a hex values for display
 * in the {@link TextInput} component. The hex store has an overridden set method that validate updates from the text
 * input assigned to it keeping ensuring that the string value is a valid hex color. A validation store `isHexValid`
 * is also available to be able to selectively set a CSS class on the input to notify users when the entered string
 * is not a valid hex color.
 */
declare class HexState {
  /**
   * @param {import('./').ColorStateAccess}  colorStateAccess -
   *
   * @param {import('./').TextStateAccess}   textStateAccess -
   */
  constructor(colorStateAccess: ColorStateAccess, textStateAccess: TextStateAccess);
  /**
   * @returns {boolean} Supports separate alpha channel.
   */
  get hasAlpha(): boolean;
  /**
   * @returns {HexStateInputData} Hex input component data.
   */
  get inputData(): HexStateInputData;
  /**
   * @returns {HexStateStores} Hex text state stores.
   */
  get stores(): HexStateStores;
  /**
   * Updates the internal state from changes in {@link ColorState} current color.
   * Covert to a hex color for display in the TextInput component.
   *
   * @param {object}   color - Current color value (HSV currently).
   *
   * @package
   */
  _updateColor(color: object): void;
  #private;
}
/**
 * Provides the input data options to use in text input components.
 */
type HexStateInputData = object[];
/**
 * Provides the buffered stores to use in text input components.
 */
type HexStateStores = {
  /**
   * Hex value.
   */
  hex: svelte_store.Writable<string | null>;
  /**
   * Is current entered hex string valid.
   */
  isHexValid: svelte_store.Writable<boolean>;
};

/**
 * Provides a buffered set of stores converting the current color from {@link ColorState} into rounded HSL component
 * values for display in the {@link TextInput} component. These HSL component stores have an overridden set method that
 * validate updates from the number inputs they are assigned to keeping number ranges between `0-360` for hue / h and
 * s / l (0 - 100). Also handling the case when the number input is `null` which occurs when the user removes all input
 * values or inputs `-` a minus character, etc. In that case `0` is substituted for `null`.
 */
declare class HslState {
  /**
   * @param {import('./').ColorStateAccess}  colorStateAccess -
   *
   * @param {import('./').TextStateAccess}   textStateAccess -
   */
  constructor(colorStateAccess: ColorStateAccess, textStateAccess: TextStateAccess);
  /**
   * @returns {boolean} Supports separate alpha channel.
   */
  get hasAlpha(): boolean;
  /**
   * @returns {HslStateInputData} HSL input component data.
   */
  get inputData(): HslStateInputData;
  /**
   * @returns {HslStateStores} HSV text state stores.
   */
  get stores(): HslStateStores;
  /**
   * Updates the internal state from changes in {@link ColorState} current color.
   * Covert to HSL and round values for display in the TextInput component.
   *
   * @param {object}   color - Current color value (HSV currently).
   *
   * @package
   */
  _updateColor(color: object): void;
  #private;
}
/**
 * Provides the input data options to use in number input components.
 */
type HslStateInputData = object[];
/**
 * Provides the buffered stores to use in text input components.
 */
type HslStateStores = {
  /**
   * Hue component value.
   */
  h: svelte_store.Writable<number | null>;
  /**
   * Saturation component value.
   */
  s: svelte_store.Writable<number | null>;
  /**
   * Luminance component value.
   */
  l: svelte_store.Writable<number | null>;
};

/**
 * Provides a buffered set of stores converting the current color from {@link ColorState} into rounded HSV component
 * values for display in the {@link TextInput} component. These HSV component stores have an overridden set method that
 * validate updates from the number inputs they are assigned to keeping number ranges between `0-360` for hue / h and
 * s / v (0 - 100). Also handling the case when the number input is `null` which occurs when the user removes all input
 * values or inputs `-` a minus character, etc. In that case `0` is substituted for `null`.
 */
declare class HsvState {
  /**
   * @param {import('./').ColorStateAccess}  colorStateAccess -
   *
   * @param {import('./').TextStateAccess}   textStateAccess -
   */
  constructor(colorStateAccess: ColorStateAccess, textStateAccess: TextStateAccess);
  /**
   * @returns {boolean} Supports separate alpha channel.
   */
  get hasAlpha(): boolean;
  /**
   * @returns {HsvStateInputData} HSV input component data.
   */
  get inputData(): HsvStateInputData;
  /**
   * @returns {HsvStateStores} HSV text state stores.
   */
  get stores(): HsvStateStores;
  /**
   * Updates the internal state from changes in {@link ColorState} current color.
   * Covert to HSV and round values for display in the TextInput component.
   *
   * @param {object}   color - Current color value (HSV currently).
   *
   * @package
   */
  _updateColor(color: object): void;
  #private;
}
/**
 * Provides the input data options to use in number input components.
 */
type HsvStateInputData = object[];
/**
 * Provides the buffered stores to use in text input components.
 */
type HsvStateStores = {
  /**
   * Hue component value.
   */
  h: svelte_store.Writable<number | null>;
  /**
   * Saturation component value.
   */
  s: svelte_store.Writable<number | null>;
  /**
   * Value / brightness component value.
   */
  v: svelte_store.Writable<number | null>;
};

/**
 * Provides a buffered set of stores converting the current color from {@link ColorState} into rounded RGB component
 * values for display in the {@link TextInput} component. These RGB component stores have an overridden set method that
 * validate updates from the number inputs they are assigned to keeping number ranges between `0-255` and also handling
 * the case when the number input is `null` which occurs when the user removes all input values or inputs `-` a minus
 * character, etc. In that case `0` is substituted for `null`.
 */
declare class RgbState {
  /**
   * @param {import('./').ColorStateAccess}  colorStateAccess -
   *
   * @param {import('./').TextStateAccess}   textStateAccess -
   */
  constructor(colorStateAccess: ColorStateAccess, textStateAccess: TextStateAccess);
  /**
   * @returns {boolean} Supports separate alpha channel.
   */
  get hasAlpha(): boolean;
  /**
   * @returns {RgbStateInputData} HSL input component data.
   */
  get inputData(): RgbStateInputData;
  /**
   * @returns {RgbStateStores} RGB text state stores.
   */
  get stores(): RgbStateStores;
  /**
   * Updates the internal state from changes in {@link ColorState} current color.
   * Covert to RGB and round values for display in the TextInput component.
   *
   * @param {object}   color - Current color value (HSV currently).
   *
   * @package
   */
  _updateColor(color: object): void;
  #private;
}
/**
 * Provides the input data options to use in number input components.
 */
type RgbStateInputData = object[];
/**
 * Provides the buffered stores to use in text input components.
 */
type RgbStateStores = {
  /**
   * Red component value.
   */
  r: svelte_store.Writable<number | null>;
  /**
   * Green component value.
   */
  g: svelte_store.Writable<number | null>;
  /**
   * Blue component value.
   */
  b: svelte_store.Writable<number | null>;
};

/**
 * Manages the text state for all supported color formats such as `rgb` and `hex` formats. The internal storage format
 * is HSV and the conversions between floating point and integer representation in the text input GUI is lossy.
 * TextState provides a store that tracks the text representations like `rgb` component values (0 - 255). Changes from
 * the text input component are converted into internal HSV representation and set the `hue` and `sv` stores setting
 * the #interalUpdate `textUpdate` flag so that {@link ColorState.#updateCurrentColor} doesn't update TextState. This
 * makes it possible to support a single internal color representation in HSV and not have independent variables for
 * each type.
 */
declare class TextState {
  /**
   * @param {import('../').ColorState}                 colorState - ColorState instance.
   *
   * @param {import('../').ColorStateInternalUpdate}   internalUpdate - ColorState internal store update data.
   */
  constructor(colorState: ColorState, internalUpdate: ColorStateInternalUpdate);
  /**
   * @returns {ActiveTextState} Current active text state.
   */
  get activeState(): ActiveTextState;
  /**
   * @returns {AlphaState} Alpha text state.
   */
  get alpha(): AlphaState;
  /**
   * @returns {HexState} Hex text state.
   */
  get hex(): HexState;
  /**
   * @returns {HslState} HSL text state.
   */
  get hsl(): HslState;
  /**
   * @returns {HsvState} HSV text state.
   */
  get hsv(): HsvState;
  /**
   * @returns {RgbState} RGB text state.
   */
  get rgb(): RgbState;
  /**
   * Updates all text state for supported formats from the given color.
   *
   * @param {object}  color - A supported ColorD color format.
   */
  updateColor(color: object): void;
  /**
   * Updates active text state format when format option changes.
   *
   * @param {string} format -
   */
  updateFormat(format: string): void;
  /**
   * @param {import('svelte/store').Subscriber<TextState>} handler - Callback function that is invoked on update /
   * changes.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler: svelte_store.Subscriber<TextState>): svelte_store.Unsubscriber;
  #private;
}

type ColorStateAccess = {
  /**
   * The stores from {@link ColorState}.
   */
  stores: ColorStateStores;
  /**
   * The internal tracking state from
   * {@link ColorState}.
   */
  internalUpdate: ColorStateInternalUpdate;
};
type TextStateAccess = {
  /**
   * Provides access to the #updateColorInternal method.
   */
  updateColorInternal: Function;
};

/**
 *
 * The separated store updates for alpha, hue, sv are debounced with a next tick update and this object
 * collates the values for each store update in the same tick. It is reset in #updateOutputColorDebounce.
 *
 * `textUpdate` determines if the update came from {@link TextState} and if so TextState is not updated in
 * #updateCurrentColor.
 */
type ColorStateInternalUpdate = {
  /**
   * New alpha value.
   */
  a: number;
  /**
   * New hue value.
   */
  h: number;
  /**
   * New SV value.
   */
  sv: {
    s: number;
    v: number;
  };
  /**
   * Did the update come from {@link TextState}.
   */
  textUpdate: boolean;
};
type ColorStateStores = {
  /**
   * The current alpha value (0 - 1).
   */
  alpha: svelte_store.Writable<number>;
  /**
   * The current hue value (0 - 360).
   */
  hue: svelte_store.Writable<number>;
  /**
   * The current color.
   */
  currentColor: svelte_store.Readable<string | object>;
  /**
   * - The current color string matching format or
   * HSL.
   */
  currentColorString: svelte_store.Readable<string>;
  /**
   * Is the current color considered "dark".
   */
  isDark: svelte_store.Readable<boolean>;
  /**
   * The text state for various supported color formats.
   */
  textState: TextState;
  /**
   * The current color / RGB only string.
   */
  hslString: svelte_store.Readable<string>;
  /**
   * The current color hue / RGB only string.
   */
  hslHueString: svelte_store.Readable<string>;
  /**
   * The current color / RGBA only string.
   */
  hslaString: svelte_store.Readable<string>;
  /**
   * The saturation / value pair for HSV
   * components.
   */
  sv: svelte_store.Writable<{
    s: number;
    v: number;
  }>;
};

declare class ColorState {
  /**
   * @param {import('../').InternalState}   internalState -
   *
   * @param {object|string}  color -
   *
   * @param {import('../../').TJSColordPickerOptions}  options -
   */
  constructor(internalState: InternalState, color: object | string, options: TJSColordPickerOptions);
  /**
   * @returns {number} Alpha color data.
   */
  get alpha(): number;
  /**
   * @returns {"hex"|"hsl"|"hsv"|"rgb"} Color format.
   */
  get format(): 'rgb' | 'hex' | 'hsl' | 'hsv';
  /**
   * @returns {"object"|"string"} Color format data type.
   */
  get formatType(): 'string' | 'object';
  /**
   * @returns {number} Color hue data.
   */
  get hue(): number;
  /**
   * @returns {{ h: number, s: number, v: number, a: number }} Current HSV color object.
   */
  get hsv(): {
    h: number;
    s: number;
    v: number;
    a: number;
  };
  /**
   * @returns {import('./').ColorStateStores} ColorState stores.
   */
  get stores(): ColorStateStores;
  /**
   * @returns {{s: number, v: number}} Saturation / Value data.
   */
  get sv(): {
    s: number;
    v: number;
  };
  /**
   * Unsubscribe from stores.
   */
  destroy(): void;
  /**
   * Gets the current color in the specific format and format type.
   *
   * @param {object}                  [opts] - Optional parameters.
   *
   * @param {'hex'|'hsl'|'hsv'|'rgb'} [opts.format='hsl'] - Format to convert to...
   *
   * @param {'object'|'string'}       [opts.formatType='string'] - Primitive type.
   *
   * @param {number}                  [opts.precision=0] - Primitive type.
   *
   * @returns {object|string} Current color.
   */
  getColor(opts?: {
    format?: 'hex' | 'hsl' | 'hsv' | 'rgb';
    formatType?: 'object' | 'string';
    precision?: number;
  }): object | string;
  /**
   * Returns initial color when in popup mode and container is openend.
   *
   * @returns {string|object} Initial color before popup.
   */
  getPopupColor(): string | object;
  /**
   * Sets current color from given color data.
   *
   * @param {object|string}   color - Supported ColorD color format.
   */
  setColor(color: object | string): void;
  /**
   * Saves the current color when in popup mode and picker is initially opened.
   */
  savePopupColor(): void;
  updateExternal(extColor: any): void;
  /**
   * Updates options related to ColorState.
   *
   * @param {import('../../').TJSColordPickerOptions}   options -
   */
  updateOptions(options: TJSColordPickerOptions): void;
  #private;
}

declare class InternalState {
  /**
   * @param {object|string}           color -
   *
   * @param {import('../').TJSColordPickerOptions}  options -
   *
   * @param {import('#runtime/svelte/store/web-storage').WebStorage}  webStorage - External TJS WebStorage instance.
   */
  constructor(
    color: object | string,
    options: TJSColordPickerOptions,
    webStorage: _runtime_svelte_store_web_storage.WebStorage,
  );
  /**
   * @returns {AddOnState} Gets AddOnState data.
   */
  get addOnState(): AddOnState;
  /**
   * @returns {ButtonState} Gets ButtonState data.
   */
  get buttonState(): ButtonState;
  /**
   * @returns {ColorState} Gets ColorState data.
   */
  get colorState(): ColorState;
  /**
   * @returns {boolean} Current 'hasAlpha' state.
   */
  get hasAlpha(): boolean;
  /**
   * @param {boolean}  isOpen - New `isOpen` state.
   */
  set isOpen(isOpen: boolean);
  /**
   * @returns {boolean} Current `isOpen` state.
   */
  get isOpen(): boolean;
  /**
   * @returns {number} Gets current `precision` data.
   */
  get precision(): number;
  /**
   * @returns {import('#runtime/svelte/store/web-storage').WebStorage} Gets associated TJS WebStorage instance.
   */
  get webStorage(): _runtime_svelte_store_web_storage.WebStorage;
  /**
   * @returns {import('./').PickerStores} Gets the color picker stores.
   */
  get stores(): PickerStores;
  destroy(): void;
  /**
   * Swaps the current `isOpen` state.
   *
   * @returns {boolean} The current `isOpen` state.
   */
  swapIsOpen(): boolean;
  /**
   * Updates external & internal data on changes to the `options` prop.
   *
   * @param {import('../').TJSColordPickerOptions} options -
   */
  updateOptions(options: TJSColordPickerOptions): void;
  #private;
}

/**
 * Provides management of all saved colors in a session storage store.
 *
 * Note:
 */
declare class SavedColorsState {
  /**
   * @param {import('../../../model/InternalState').InternalState} internalState - Internal picker state.
   */
  constructor(internalState: InternalState);
  destroy(): void;
  addColor(): void;
  deleteColor(color: any): void;
  deleteAll(): void;
  /**
   * @param {import('svelte/store').Subscriber<string[]>} handler - Callback function that is invoked on update /
   * changes.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler: svelte_store.Subscriber<string[]>): svelte_store.Unsubscriber;
  #private;
}

/**
 * Provides the main addon example for TJSColordPicker. Addons allow extension of the color picker. This addon provides
 * session storage for saving / restoring colors.
 *
 * An oddon for TJSColordPicker must provide a static accessor for a unique `id` and also provide a
 * {@link TJSFolderData} object via a `folderData` accessor.
 */
declare class TJSColordPickerSavedColors {
  /**
   * @returns {string} ID of the addon.
   */
  static get id(): string;
  /**
   * @param {object} opts - Options.
   *
   * @param {import('../../../model/InternalState').InternalState}  opts.internalState - Internal picker state.
   *
   * @param {string}   opts.label - Label for folder.
   */
  constructor({ internalState, label }?: { internalState: InternalState; label: string });
  /**
   * @returns {SavedColorsState} Gets SavedColorState data.
   */
  get savedColorsState(): SavedColorsState;
  /**
   * @returns {import('#standard/component/folder').TJSFolderData} The TJSFolderData object to configure the
   * TJSSvgFolder component the addon is installed into.
   */
  get folderData(): any;
  destroy(): void;
  #private;
}

type TJSColordPickerColor = object | string;
type TJSColordPickerOptions = {
  /**
   * Iterable list of addon class constructor functions.
   */
  addons?: Iterable<Function>;
  /**
   * User defined picker component overrides.
   */
  components?: TJSColordPickerComponents;
  /**
   * Enable state of the color picker input.
   */
  enabled?: boolean;
  /**
   * The user defined color format.
   */
  format?: 'hex' | 'hsl' | 'hsv' | 'rgb';
  /**
   * The user defined color format type.
   */
  formatType?: 'object' | 'string';
  /**
   * Enables the addons panel / can set to false to hide panel when addons loaded.
   */
  hasAddons?: boolean;
  /**
   * Enables alpha / opacity color selection and output.
   */
  hasAlpha?: boolean;
  /**
   * Enables the button bar.
   */
  hasButtonBar?: boolean;
  /**
   * Enables eye dropper support if available (requires secure context).
   */
  hasEyeDropper?: boolean;
  /**
   * Enables text input component.
   */
  hasTextInput?: boolean;
  /**
   * Name attribute for hidden input element / form submission.
   */
  inputName?: string;
  /**
   * Is the picker configured as a pop-up.
   */
  isPopup?: boolean;
  /**
   * Picker layout variant.
   */
  layout?: 'chrome' | undefined;
  /**
   * When true text input format can not be changed from current format.
   */
  lockTextFormat?: boolean;
  /**
   * A positive integer defining rounding precision.
   */
  precision?: number;
  /**
   * An external minimal
   * writable store to update current color.
   */
  store?: _runtime_svelte_store_util.MinimalWritable<TJSColordPickerColor>;
  /**
   * Inline styles to apply to TJSColordPicker span; useful to set CSS variables.
   */
  styles?: object;
  /**
   * A positive integer greater than 50 defining the main container width in
   * pixels or a valid CSS dimension string.
   */
  width?: number | string;
};
type TJSColordPickerComponents = {
  /**
   * Alpha slider indicator.
   */
  alphaIndicator?: svelte.SvelteComponent;
  /**
   * Alpha slider wrapper.
   */
  alphaWrapper?: svelte.SvelteComponent;
  /**
   * When in popup model advances focus to prop element.
   */
  focusWrap?: svelte.SvelteComponent;
  /**
   * Picker indicator.
   */
  pickerIndicator?: svelte.SvelteComponent;
  /**
   * Picker wrapper.
   */
  pickerWrapper?: svelte.SvelteComponent;
  /**
   * Hue slider indicator.
   */
  sliderIndicator?: svelte.SvelteComponent;
  /**
   * Hue slider wrapper.
   */
  sliderWrapper?: svelte.SvelteComponent;
  /**
   * Text input component.
   */
  textInput?: svelte.SvelteComponent;
  /**
   * Outer wrapper for all components.
   */
  wrapper?: svelte.SvelteComponent;
};

export {
  TjsColordButton as TJSColordButton,
  TjsColordPicker as TJSColordPicker,
  type TJSColordPickerColor,
  type TJSColordPickerComponents,
  type TJSColordPickerOptions,
  TJSColordPickerSavedColors,
};
