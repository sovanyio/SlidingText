export default class NumberToText {
  static map() {
    return {
      midnight: 'Midnight',
      oh: "Oh ",
      o: "O'",
      0: "O'Clock",
      1: 'One',
      2: 'Two',
      3: 'Three',
      4: 'Four',
      5: 'Five',
      6: 'Six',
      7: 'Seven',
      8: 'Eight',
      9: 'Nine',
      10: 'Ten',
      11: 'Eleven',
      12: 'Twelve',
      13: 'Thirteen',
      14: 'Four teen',
      15: 'Fifteen',
      16: 'Sixteen',
      17: 'Seven teen',
      18: 'Eight teen',
      19: 'Nine teen',
      20: 'Twenty',
      30: 'Thirty',
      40: 'Forty',
      50: 'Fifty'
    };
  }
  
  static days() {
    return {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };
  }
  
  static months() {
    return {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    };
  }
  
  static ordinals() {
    return [
      'th',
      'st',
      'nd',
      'rd'
    ];
  }

  static getHour(input) {
    return this.map()[input];
  }

  static getMinutes(input, settings) {
    if (input > 0 && input < 10) {
      const mark = this.map()[settings.shortOh ? 'o' : 'oh']; 
      return `${mark}${this.map()[input]}`;
    } else
    if (input < 20) {
      return this.map()[input];
    } else {
      let divisorStr = this.map()[Math.floor(input / 10) * 10],
          modulo  = input % 10;
      
      return modulo ? `${divisorStr} ${this.map()[modulo]}` : `${divisorStr}`;
    }
  }
  
  static getDayOfWeek(input) {
    return this.days()[input];
  }
  
  static getMonth(input) {
    return this.months()[input];
  }
  
  static getOrdinal(input) {
    if (Math.floor(input / 10) == 1) {
      return this.ordinals()[0];
    }
    let ord = input % 10;
    if (ord > 3) return this.ordinals()[0];
    return this.ordinals()[ord];
  }
}