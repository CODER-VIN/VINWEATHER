//This class holds the icon and description fetcher
class Helper {
  getIcon(timeOfDay, text) {
    if (timeOfDay === 'day') {
      switch (text.toLowerCase()) {
        case 'Sunny'.toLowerCase():
        case 'Mostly Sunny'.toLowerCase():
        case 'Hot'.toLowerCase():
          return sunny;
        case 'Partly Sunny'.toLowerCase():
        case 'Intermittent Clouds'.toLowerCase():
        case 'Hazy Sunshine'.toLowerCase():
        case 'Clouds and sun'.toLowerCase():
          return partlyCloudy;
        case 'Mostly Cloudy'.toLowerCase():
        case 'Cloudy'.toLowerCase():
          return cloudy;
        case 'Dreary (Overcast)'.toLowerCase():
        case 'Fog'.toLowerCase():
          return foggy;
        case 'Showers'.toLowerCase():
        case 'Mostly Cloudy w/ Showers'.toLowerCase():
        case 'Partly Sunny w/ Showers'.toLowerCase():
        case 'Rain'.toLowerCase():
        case 'Freezing Rain'.toLowerCase():
          return rain;
        case 'T-Storms'.toLowerCase():
        case 'Mostly Cloudy w/ T-Storms'.toLowerCase():
        case 'Partly Sunny w/ T-Storms'.toLowerCase():
          return thunder;
        case 'Flurries'.toLowerCase():
        case 'Mostly Cloudy w/ Flurries'.toLowerCase():
        case 'Partly Sunny w/ Flurries'.toLowerCase():
        case 'Snow'.toLowerCase():
        case 'Mostly Cloudy w/ Snow'.toLowerCase():
        case 'Ice'.toLowerCase():
        case 'Sleet'.toLowerCase():
        case 'Rain and Snow'.toLowerCase():
        case 'Cold'.toLowerCase():
          return snow;
        case 'Wind'.toLowerCase():
        case 'Very windy this afternoon'.toLowerCase():
        case 'Windy'.toLowerCase():
          return windy;
        default:
          return sunny;
      }
    } else {
      switch (text.toLowerCase()) {
        case 'Cloudy'.toLowerCase():
        case 'Dreary (Overcast)'.toLowerCase():
        case 'Mostly Cloudy'.toLowerCase():
          return cloudy;
        case 'Fog'.toLowerCase():
        case 'Hazy Moonlight'.toLowerCase():
          return foggy;
        case 'Showers'.toLowerCase():
        case 'Rain'.toLowerCase():
        case 'Freezing Rain'.toLowerCase():
        case 'Partly Cloudy w/ Showers'.toLowerCase():
        case 'Mostly Cloudy w/ Showers'.toLowerCase():
          return rain;
        case 'T-Storms'.toLowerCase():
        case 'Partly Cloudy w/ T-Storms'.toLowerCase():
        case 'Mostly Cloudy w/ T-Storms'.toLowerCase():
          return thunder;
        case 'Flurries'.toLowerCase():
        case 'Ice'.toLowerCase():
        case 'Sleet'.toLowerCase():
        case 'Rain and Snow'.toLowerCase():
        case 'Cold'.toLowerCase():
        case 'Mostly Cloudy w/ Flurries'.toLowerCase():
        case 'Mostly Cloudy w/ Snow'.toLowerCase():
          return snow;
        case 'Hot'.toLowerCase():
        case 'Clear'.toLowerCase():
        case 'Mostly Clear'.toLowerCase():
          return moon;
        case 'Partly Cloudy'.toLowerCase():
        case 'Intermittent Clouds'.toLowerCase():
          return night;
        case 'Windy'.toLowerCase():
        case 'Wind'.toLowerCase():
        case 'Very windy this afternoon'.toLowerCase():
          return windy;
        default:
          return moon;
      }
    }
  }
  getDesc(desc) {
    switch (desc.toLowerCase()) {
      case 'Sunny'.toLowerCase():
      case 'Mostly Sunny'.toLowerCase():
      case 'Hot'.toLowerCase():
        return 'Aggressively Sunny';
      case 'Partly Sunny'.toLowerCase():
      case 'Intermittent Clouds'.toLowerCase():
      case 'Hazy Sunshine'.toLowerCase():
      case 'Clouds and sun'.toLowerCase():
        return `Quality Outdoor Conditions`;
      case 'Mostly Cloudy'.toLowerCase():
      case 'Cloudy'.toLowerCase():
        return `Cloudy`;
      case 'Dreary (Overcast)'.toLowerCase():
      case 'Fog'.toLowerCase():
        return `Rather Upsetting`;
      case 'Showers'.toLowerCase():
      case 'Mostly Cloudy w/ Showers'.toLowerCase():
      case 'Partly Sunny w/ Showers'.toLowerCase():
      case 'Rain'.toLowerCase():
      case 'Freezing Rain'.toLowerCase():
        return 'Pouring';
      case 'T-Storms'.toLowerCase():
      case 'Mostly Cloudy w/ T-Storms'.toLowerCase():
      case 'Partly Sunny w/ T-Storms'.toLowerCase():
        return 'Electrical Storm';
      case 'Flurries'.toLowerCase():
      case 'Mostly Cloudy w/ Flurries'.toLowerCase():
      case 'Partly Sunny w/ Flurries'.toLowerCase():
      case 'Snow'.toLowerCase():
      case 'Mostly Cloudy w/ Snow'.toLowerCase():
      case 'Ice'.toLowerCase():
      case 'Sleet'.toLowerCase():
      case 'Rain and Snow'.toLowerCase():
      case 'Cold'.toLowerCase():
        return 'Slip and Slide Snowstorm';
      case 'Windy'.toLowerCase():
      case 'Wind'.toLowerCase():
      case 'Very windy this afternoon'.toLowerCase():
        return `Protect your trash can`;
      case 'Hazy Moonlight'.toLowerCase():
        return 'Hazy, but serene';
      default:
        return 'Nice Night.';
    }
  }

  //Returns the current hour, so if it's 2:42PM it'll return "2 PM"
  getHour(time) {
    console.log(time % 12);
    if (time % 12 === 0) {
      return 'Midnight';
    }
    if (time === 12) {
      return 'Noon';
    }
    if (time > 12 && time < 24) {
      return `${time % 12} PM`;
    }

    return `${time % 12} AM`;
  }

  getDay(day) {
    switch (day) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
    }
  }
}
