export function trashIconMaker (container) {
// Create a new SVG element
const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");

// Set the width and height attributes
svgElement.setAttribute("width", "24px");
svgElement.setAttribute("height", "24px");

// Set the viewBox attribute
svgElement.setAttribute("viewBox", "0 0 24 24");

// Create a new path element
const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");

// Set the fill attribute
pathElement.setAttribute("fill", "currentColor");

// Set the d attribute
pathElement.setAttribute("d", "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z");

// Append the path element to the SVG element
svgElement.appendChild(pathElement);

// Append the SVG element to the container element
container.appendChild(svgElement);
}


