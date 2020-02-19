// label variables
let yearLabel = '1750' // single quotes indicate these are 'string' values
let separatorLabel = '–'
let populationLabel = '220,000'

console.log(populationLabel)

// label position variables
let yPosition = 15 // numeric variable
let yearXPosition = 22.5
let separatorXPosition = 70
let populationXPosition = 153

// bar variables
let barXPosition = 165
let barHeight = 11
let barWidth = 17

// select the svg element
let svg = document.getElementById('chart')

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
yearElement.textContent = yearLabel
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
populationElement.textContent = populationLabel
itemGroup.appendChild(populationElement)

// bar element
let barElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
barElement.setAttribute('x', barXPosition)
barElement.setAttribute('y', yPosition)
barElement.setAttribute('height', barHeight)
barElement.setAttribute('width', barWidth)
itemGroup.appendChild(barElement)

svg.appendChild(itemGroup)
