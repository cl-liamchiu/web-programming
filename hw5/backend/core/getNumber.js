var number=0

const getNumber = () => {return number}
const genNumber = () => {number = Math.floor(Math.random() * 100) + 1;}

export {getNumber, genNumber};