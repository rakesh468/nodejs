const fs=require("fs")
// to read files //
fs.readFile("./welcome.txt","UTF-8",(error,data)=>{
    console.log(data);
})
// to write files //
quotes="hello buddy";
fs.writeFile("./words",quotes,(error)=>{
    console.log("hello")
})
// to create 10 files and count files  //
const quotes2="live young"
function createfile(quotes,nooffiles){
    for(let i=1;i<=nooffiles;i++){
        fs.writeFile(`./backup/text${i}.text`,quotes,(error)=>{
            console.log("completed",i);
        })
    }
}
const [,,nooffiles]=process.argv;
createfile(quotes2,nooffiles);

// to add files //
 const quotes3="\n all is well";
 fs.appendFile("./welcome.txt",quotes3,(err)=>{
     console.log("added");
 })
// to read director //
 fs.readdir("./backup",(error,files)=>{
     if(error){
         console.log(error)
     }
     else{
console.log(files);
     }
     
 })
//  to delete files  //
 fs.unlink("./textup.txt",(error)=>{
     console.log("deleted");
 })