import document from "document";
import {preferences} from "user-settings";
import * as messaging from 'messaging';
import * as fs from 'fs';

export default class SettingsManager {
    constructor(domHelper) {
        this.domHelper = domHelper;
      
        this.registerCompanionLink();
      
        this.getSavedSettings();
        this.setSettings();
    }
  
    registerCompanionLink() {
        messaging.peerSocket.onmessage = (event) => {
          this.handleMessage(event);
        };
        // Force settings to be sent on init
        messaging.peerSocket.addEventListener('open', () => {
            messaging.peerSocket.send({
                key: 'INIT'
            });
        });
    }
  
    getSavedSettings() {
        try {
          this.settings = fs.readFileSync('settings.txt', 'json');
        } catch (e) {
          this.settings = {};
        }
      
        this.settings = {
            fgColor: this.settings.fgColor || '#FFFFFF',
            bgColor: this.settings.bgColor || '#000000',
            showBattery: typeof this.settings.showBattery == 'boolean' ? this.settings.showBattery : true,
            dimBattery: typeof this.settings.dimBattery == 'boolean' ? this.settings.dimBattery : true,
            animationEnabled: true,
            shortOh: typeof this.settings.shortOh == 'boolean' ? this.settings.shortOh : true,
        };
    }

    updateBatteryFill() {
        if (!this.settings.bgColor || !this.settings.fgColor) {
            return;
        }
        const fg = this.settings.fgColor.replace(/#/, ''),
            bg = this.settings.bgColor.replace(/#/, ''),

            r1 = fg.substr(0, 2),
            g1 = fg.substr(2, 2),
            b1 = fg.substr(4, 2),

            r2 = bg.substr(0, 2),
            g2 = bg.substr(2, 2),
            b2 = bg.substr(4, 2),

            r1i = parseInt(r1, 16),
            g1i = parseInt(g1, 16),
            b1i = parseInt(b1, 16),

            r2i = parseInt(r2, 16),
            g2i = parseInt(g2, 16),
            b2i = parseInt(b2, 16),

            r3i = Math.round((r1i + r2i * 2) / 3),
            g3i = Math.round((g1i + g2i * 2) / 3),
            b3i = Math.round((b1i + b2i * 2) / 3),

            r3 = r3i.toString(16),
            g3 = g3i.toString(16),
            b3 = b3i.toString(16);

        this.domHelper.batteryBar.style.fill = `#${r3}${g3}${b3}`;
    }
  
    setSettings() {
      this.updateBackground();
      this.updateForeground();
      this.updateDim();
    }
  
    updateBackground() {
        this.domHelper.background.style.fill = this.settings.bgColor;
        
        if (this.settings.dimBattery) {
            this.updateDim();
        }
    }
  
    updateForeground() {
        this.domHelper.hours.style.fill = this.settings.fgColor;
        this.domHelper.hoursNext.style.fill = this.settings.fgColor;
        this.domHelper.tens.style.fill = this.settings.fgColor;
        this.domHelper.tensNext.style.fill = this.settings.fgColor;
        this.domHelper.minutes.style.fill = this.settings.fgColor;
        this.domHelper.minutesNext.style.fill = this.settings.fgColor;
        this.domHelper.dayofweek.style.fill = this.settings.fgColor;
        this.domHelper.date.style.fill = this.settings.fgColor;
        this.domHelper.heartrate.style.fill = this.settings.fgColor;
        this.domHelper.stepcount.style.fill = this.settings.fgColor;
        
        if (this.settings.dimBattery) {
            this.updateDim();
        } else {
            this.domHelper.batteryBar.style.fill = this.settings.fgColor;
        }
    }
  
    updateDim() {
        if (this.settings.dimBattery) {
            this.updateBatteryFill();
        } else {
            if (this.settings.fgColor) {
                this.domHelper.batteryBar.style.fill = this.settings.fgColor;
            }
        }
    }

    handleMessage(evt) {
        if (evt.data.key === 'bgColor') {
            this.settings.bgColor = evt.data.value;
            this.updateBackground();
        }
        if (evt.data.key === 'fgColor') {
            this.settings.fgColor = evt.data.value;
            this.updateForeground();
        }
        if (evt.data.key === 'showBattery') {
            this.settings.showBattery = evt.data.value;
        }
        if (evt.data.key === 'dimBattery') {
            this.settings.dimBattery = evt.data.value;
            this.updateDim();
        }
        if (evt.data.key === 'shortOh') {
            this.settings.shortOh = evt.data.value;
        }
        this.saveSettings();
    }
  
    saveSettings() {
      try {
        fs.writeFileSync('settings.txt', this.settings, 'json');
      } catch (e) {
        console.error(e);
      }
    }
}