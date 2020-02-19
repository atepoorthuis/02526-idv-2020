// label variables
let separatorLabel = '–'

// label position variables
let yMarginTop = 15
let yMarginBottom = 40
let yearXPosition = 22.5
let separatorXPosition = 70
let populationXPosition = 153

// bar variables
let barXPosition = 165
let barHeight = 11

// select the svg element
let svg = document.getElementById('chart')

let data = [
  {
    year: 1750,
    population: 220000,
    population_pixels: 17
  },
  {
    year: 1760,
    population: 310000,
    population_pixels: 26
  },
  {
    year: 1770,
    population: 462000,
    population_pixels: 38
  },
  {
    year: 1780,
    population: 562000,
    population_pixels: 59
  },
  {
    year: 1790,
    population: 757208,
    population_pixels: 80
  },
  {
    year: 1800,
    population: 1002037,
    population_pixels: 106
  },
  {
    year: 1810,
    population: 1377808,
    population_pixels: 132
  },
  {
    year: 1820,
    population: 1771656,
    population_pixels: 162
  },
  {
    year: 1830,
    population: 2328642,
    population_pixels: 194
  },
  {
    year: 1840,
    population: 2873648,
    population_pixels: 223
  },
  {
    year: 1850,
    population: 3638808,
    population_pixels: 255
  },
  {
    year: 1860,
    population: 4441830,
    population_pixels: 278
  },
  {
    year: 1870,
    population: 4880009,
    population_pixels: 311
  },
  {
    year: 1880,
    population: 6580793,
    population_pixels: 359
  },
  {
    year: 1890,
    population: 7470040,
    population_pixels: 407
  }
]

for (let index = 0; index < data.length; index++) {
  let item = data[index]
  let yPosition = yMarginTop + (index * yMarginBottom)

  // create a '<g>' element to hold children
  let itemGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')

  // first text element
  let yearElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  )
  yearElement.setAttribute('x', yearXPosition)
  yearElement.setAttribute('y', yPosition)
  yearElement.setAttribute('dominant-baseline', 'hanging')
  yearElement.textContent = item.year
  itemGroup.appendChild(yearElement)

  // second text element
  let separatorElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  )
  separatorElement.setAttribute('x', separatorXPosition)
  separatorElement.setAttribute('y', yPosition)
  separatorElement.setAttribute('dominant-baseline', 'hanging')
  separatorElement.textContent = separatorLabel
  itemGroup.appendChild(separatorElement)

  // third text element
  let populationElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  )
  populationElement.setAttribute('x', populationXPosition)
  populationElement.setAttribute('y', yPosition)
  populationElement.setAttribute('dominant-baseline', 'hanging')
  populationElement.setAttribute('text-anchor', 'end')
  populationElement.textContent = item.population
  itemGroup.appendChild(populationElement)

  // bar element
  let barElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  barElement.setAttribute('x', barXPosition)
  barElement.setAttribute('y', yPosition)
  barElement.setAttribute('height', barHeight)
  barElement.setAttribute('width', item.population_pixels)
  itemGroup.appendChild(barElement)

  svg.appendChild(itemGroup)
}
