console.log(process.argv);
const[,,num]=process.argv;
console.log("Input array",num);
const array=JSON.parse(num);
console.log("Array",array);
console.log("Maximum number",Math.max(...array))


