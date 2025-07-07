export function getRandomFirstName() {
  const names = ["Alex", "Lena", "Max", "Tina", "John", "Ella"];
  return names[Math.floor(Math.random() * names.length)];
}

export function getRandomLastName() {
  const names = ["Smith", "Müller", "Lee", "Brown", "Khan", "Garcia"];
  return names[Math.floor(Math.random() * names.length)];
}

export function getRandomNation() {
  const nations = ["GER", "USA", "FRA", "JPN", "BRA", "KEN"];
  return nations[Math.floor(Math.random() * nations.length)];
}

export function getRandomTime() {
  const minutes = Math.floor(Math.random() * 10);
  const seconds = Math.floor(Math.random() * 60);
  const milliseconds = Math.floor(Math.random() * 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

export function isDemo(){
    return process.env.NODE_ENV !== "production"
}