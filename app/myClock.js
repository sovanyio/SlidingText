import clock from "clock";
import document from 'document';
import NumberToText from '../common/numberToText';
import * as util from "../common/utils";

export default class myClock {
    constructor(callback, animator, domHelper, settingsManager) {
        clock.granularity = 'seconds';
        clock.ontick = () => {
            this.doTick();
        };

        this.isFresh = true;
        this.callback = callback;
        this.animator = animator;
        this.domHelper = domHelper;
        this.settingsManager = settingsManager;
    }

    forceUpdate() {
        this.isFresh = true;
        this.doTick();
    }

    doTick(event) {
        const today = event ? event.date : new Date();

        // Now
        let hourInt = today.getHours();
        const minuteInt = today.getMinutes();
        const secInt = today.getSeconds();
        // Next
        today.setMinutes(minuteInt + 1);
        let nextHour = today.getHours();
        const nextMinutes = today.getMinutes();

        // We only support 12-hr format
        hourInt = hourInt % 12 || 12;
        nextHour = nextHour % 12 || 12;

        const currentHourString = util.toLower(NumberToText.getHour(hourInt));
        const nextHourString = util.toLower(NumberToText.getHour(nextHour));
        const currentMinuteParts = util.toLower(NumberToText.getMinutes(minuteInt, this.settingsManager.settings)).split(' ');
        const nextMinuteParts = util.toLower(NumberToText.getMinutes(nextMinutes, this.settingsManager.settings)).split(' ');

        // Setup next values for animations
        this.domHelper.hoursNext.text = nextHourString;
        this.domHelper.tensNext.text = nextMinuteParts[0];
        this.domHelper.minutesNext.text = nextMinuteParts[1] || '';

        if (this.isFresh || today.getSeconds() != 59) {
            // Skip animation
            this.domHelper.hours.text = currentHourString;
            this.domHelper.tens.text = currentMinuteParts[0];
            this.domHelper.minutes.text = currentMinuteParts[1] || '';
            this.isFresh = false;
        } else {
            // Setup animation
            this.animator.handleTimeChange();
        }
        if (this.callback) {
            this.callback(today);
        }
    }
}