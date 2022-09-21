import document from "document";
import NumberToText from '../common/numberToText';
import * as util from "../common/utils";

export default class DateManager {
    constructor(domHelper) {
        this.domHelper = domHelper;
    }

    updateDate(today) {
        this.domHelper.dayofweek.text = util.toLower(NumberToText.getDayOfWeek(today.getDay()));
        this.domHelper.date.text = `${util.toLower(NumberToText.getMonth(today.getMonth()))} ${today.getDate()}${NumberToText.getOrdinal(today.getDate())}`;
    }
}