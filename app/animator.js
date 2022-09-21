import document from "document";

export default class Animator {
    constructor(domHelper) {
        this.animation = null;
        this.domHelper = domHelper;
    }

    handleTimeChange() {
        if (this.animation) {
          clearTimeout(this.animation);
        }
        // Possibly enable the animation toggle in the future?
        // if (ANIMATION_ENABLED) {
        if (this.domHelper.hours.text != this.domHelper.hoursNext.text) {
            this.setupHourAnimation();
        }
        this.setupMinuteAnimation();
        // } else {
        //     animation = setTimeout(() => {
        //         hours.text = hoursNext.text;
        //         tens.text = tensNext.text;
        //         minutes.text = minutesNext.text;
        //     }, 1000);
        // }
    }

    setupHourAnimation() {
        requestAnimationFrame(() => {
            this.domHelper.hoursCont.animate('activate');
            this.domHelper.hoursNextCont.animate('activate');

            setTimeout(() => {
                this.domHelper.hours.text = this.domHelperhoursNext.text;
            }, 200);
        });
    }

    setupMinuteAnimation() {
        requestAnimationFrame(() => {
            if (this.domHelper.tens.text != this.domHelper.tensNext.text) {
                this.domHelper.tensCont.animate('activate');
                this.domHelper.tensNextCont.animate('activate');
            }

            this.domHelper.minutesCont.animate('activate');
            this.domHelper.minutesNextCont.animate('activate');

            setTimeout(() => {
                this.domHelper.tens.text = this.domHelper.tensNext.text;
            }, 450);
            setTimeout(() => {
                this.domHelper.minutes.text = this.domHelper.minutesNext.text;
            }, 700);
        });
    }
}