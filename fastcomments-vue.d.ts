import Vue, { PluginFunction, VueConstructor } from 'vue';


interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
export interface InstallableComponent extends VueConstructor<Vue> {
  install: InstallFunction;
}

declare const FastcommentsVue: InstallableComponent;
export default FastcommentsVue;
