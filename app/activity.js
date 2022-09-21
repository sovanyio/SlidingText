import document from "document";
import {today} from 'user-activity';
import {HeartRateSensor} from 'heart-rate';

export default class HealthMonitor {
    constructor(domHelper) {
        this.domHelper = domHelper;

        this.hrm = new HeartRateSensor();
        this.hrm.onreading = () => {
          this.updateHeartData();
        }
    }

    updateHealth(time) {
        // Maybe this is a setting in the future?
        this.hrm.start();
        this.updateStepData();
    }

    updateStepData() {
        const metrics = today.adjusted;
        this.domHelper.stepcount.text = metrics['steps'] || '';
    }

    updateHeartData() {
      const hr = this.hrm.heartRate;
      if (hr) {
        this.domHelper.heartrate.text = `♥️ ${hr}`;
      }

      this.hrm.stop();
    }
}