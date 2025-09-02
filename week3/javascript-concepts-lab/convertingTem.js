const temperaturesCelsius = [0, 15, 30, 45];

const temperaturesKelvin = temperaturesCelsius.map((celsius) => celsius + 273.15);

console.log('Celsius Temperatures:', temperaturesCelsius);
console.log('Kelvin Temperatures:', temperaturesKelvin);