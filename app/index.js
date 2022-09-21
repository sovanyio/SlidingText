import myClock from './myClock';
import DateUpdater from './date';
import BatteryUpdater from './battery';
import HealthMonitor from './activity';
import Animator from './animator';
import SettingsManager from './userSettings';
import DomHelper from './dom';

import NumberToText from '../common/numberToText';
import * as util from "../common/utils";

const domHelper = new DomHelper();
const healthData = new HealthMonitor(domHelper);
const dateUpdater = new DateUpdater(domHelper);
const settingsManager = new SettingsManager(domHelper);
const batteryUpdater = new BatteryUpdater(domHelper, settingsManager);

const onClockTick = (date) => {
    // Populate metadata
    dateUpdater.updateDate(date);
    batteryUpdater.updateBattery();
    healthData.updateHealth(date);
}
const clock = new myClock(onClockTick, new Animator(domHelper), domHelper, settingsManager);