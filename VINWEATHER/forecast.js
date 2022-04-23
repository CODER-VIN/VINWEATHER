//These getForecast functions in the above constructors return the JSON object for their requests.
// Locations are formatted as: 1234_AB as per the api. This is the code
//Gets the high/low and chance of rain for day and night, etc.
//You get data exactly as you'd expect ==> .Headline.Category returns "warmer" (or whatever the headline is)
//data.DailyForecasts[0] Gives you the first day for weekly
//Fetches the current conditions; the current temp and prec
//prec will always refer to "precipitation"
//This is what will be called when the button is pressed
class Current {
  constructor(conditions, weatherText, hasPrec, precType, isDayTime, temp) {
    this.conditions;
    this.weatherText = '';
    this.hasPrec = false;
    this.precType = null;
    this.isDayTime = false;
    this.temp = 0;
  }

  async getForecast(location) {
    const res = await fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${location}?apikey=${apiKey}`
    );
    this.conditions = await res.json();
    console.log('Current: ');
    console.log(this.conditions);
    return this.conditions;
  }
  async compile(zipCode) {
    await setLocation(zipCode);
    this.weatherText = this.conditions[0].WeatherText;
    this.hasPrec = this.conditions[0].HasPrecipitation;
    this.precType = this.conditions[0].PrecipitationType;
    this.isDayTime = this.conditions[0].IsDayTime;
    this.temp = this.conditions[0].Temperature.Imperial.Value;
  }
}

class Hourly {
  constructor(conditions, text, precType, isDaylight, temp, precProb) {
    this.conditions;
    this.text = [];
    this.precType = []; //boolean
    this.isDaylight = []; //boolean
    this.temp = [];
    this.precProb = [];
  }
  async getForecast(location) {
    const res = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${location}?apikey=${apiKey}`
    );
    this.conditions = await res.json();
    console.log('Hourly: ');
    console.log(this.conditions);
    return this.conditions;
  }
  async compile(zipCode) {
    await setLocation(zipCode);
    for (let i = 0; i < hoursInDay; i++) {
      this.text[i] = this.conditions[i].IconPhrase;
      this.precType[i] = this.conditions[i].PrecipitationType;
      this.isDaylight[i] = this.conditions[i].IsDaylight;
      this.temp[i] = this.conditions[i].Temperature.Value;
      this.precProb[i] = this.conditions[i].PrecipitationProbability;
    }
  }
}
class Daily {
  constructor(
    conditions,
    minTemp,
    maxTemp,
    dayText,
    dayHasPrec,
    nightText,
    nightHasPrec
  ) {
    this.conditions = null;
    this.minTemp = 0;
    this.maxTemp = 0;
    this.dayText = '';
    this.dayHasPrec = false;
    this.nightText = '';
    this.nightHasPrec = false;
  }

  async getForecast(location) {
    const res = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${location}?apikey=${apiKey}`
    );
    this.conditions = await res.json();
    console.log('Daily: ');
    console.log(this.conditions);
    return this.conditions;
  }
  async compile(zipCode) {
    await setLocation(zipCode);
    this.minTemp = this.conditions.DailyForecasts[0].Temperature.Minimum.Value;
    this.maxTemp = this.conditions.DailyForecasts[0].Temperature.Maximum.Value;
    this.dayText = this.conditions.DailyForecasts[0].Day.IconPhrase;
    this.dayHasPrec = this.conditions.DailyForecasts[0].Day.HasPrecipitation;
    this.nightText = this.conditions.DailyForecasts[0].Night.IconPhrase;
    this.nightHasPrec =
      this.conditions.DailyForecasts[0].Night.HasPrecipitation;
  }
}

class Weekly {
  constructor(
    conditions,
    minTemp,
    maxTemp,
    dayText,
    dayHasPrec,
    nightText,
    nightHasPrec
  ) {
    this.conditions;
    this.minTemp = [];
    this.maxTemp = [];
    this.dayText = [];
    this.dayHasPrec = [];
    this.nightText = [];
    this.nightHasPrec = [];
  }

  async getForecast(location) {
    const res = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location}?apikey=${apiKey}`
    );
    this.conditions = await res.json();
    console.log('Weekly: ');
    console.log(this.conditions);
    return this.conditions;
  }
  async compile(zipCode) {
    await setLocation(zipCode);
    for (let i = 0; i < daysInWeek; i++) {
      this.minTemp[i] =
        this.conditions.DailyForecasts[i].Temperature.Minimum.Value;
      this.maxTemp[i] =
        this.conditions.DailyForecasts[i].Temperature.Maximum.Value;
      this.dayText[i] = this.conditions.DailyForecasts[i].Day.IconPhrase;
      this.dayHasPrec[i] =
        this.conditions.DailyForecasts[i].Day.HasPrecipitation;
      this.nightText[i] = this.conditions.DailyForecasts[i].Night.IconPhrase;
      this.nightHasPrec[i] =
        this.conditions.DailyForecasts[i].Night.HasPrecipitation;
    }
  }
}
