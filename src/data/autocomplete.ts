import tanksJson from './tanks.json'
import mapsJson from './maps.json'

export const autoCompleteData: string[] = []

for (let i of tanksJson) {
  autoCompleteData.push(i.name)
}
for (let i of mapsJson) {
  autoCompleteData.push(i.name)
}
