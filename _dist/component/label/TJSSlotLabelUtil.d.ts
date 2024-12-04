/**
 * Provides a helper utility to verify if a label prop is valid for the TJSSlotLabel component.
 */
export class TJSSlotLabelUtil {
    /**
     * Test if the given label is valid data / prop for the TJSSlotLabel component.
     */
    static isValid(label: any): label is string | import("#runtime/svelte/util").TJSSvelteConfig;
}