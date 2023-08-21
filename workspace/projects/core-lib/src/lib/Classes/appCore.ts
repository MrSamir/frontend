import { localization } from "./localization";
import { setting } from "./setting";

export class AppCore {
  localization:localization = new localization();
  settings: setting = new setting();
}


