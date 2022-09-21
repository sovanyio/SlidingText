import document from "document";
import {battery} from 'power';

export default class BatteryUtil {
    constructor(domHelper, settingsManager) {
        this.domHelper = domHelper;
        this.settingsManager = settingsManager;
    }

    updateBattery() {
        if (this.settingsManager.settings.showBattery) {          
            this.setBatteryLevel(this.getBatteryLevel());
        } else {
            this.hideBattery();
        }
    }
  
    getBatteryLevel() {
        if (battery.chargeLevel > 50) {
            const batteryMod = battery.chargeLevel % 10;
            const batteryMain = Math.ceil(battery.chargeLevel / 10);
            const batteryLevel = (batteryMod == 0) ? battery.chargeLevel : batteryMain * 10;
        } else {
            const batteryLevel = battery.chargeLevel;
        }
      
        return batteryLevel;
    }
  
    setBatteryLevel(level) {
        this.domHelper.batteryBar.width = Math.ceil(this.domHelper.root.width * (1 - (level / 100)));
        this.domHelper.batteryBar.x = Math.ceil(this.domHelper.root.width * (level / 100));
    }
  
    hideBattery() {
        this.domHelper.batteryBar.x = this.domHelper.root.width;
        this.domHelper.batteryBar.width = this.domHelper.root.width;
    }
}