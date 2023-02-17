// // import { averageWeeklyTemperature } from "./g";
// // import { Temp } from "./g"; 

// // let dailyTemperatures: Temp[] = [{
// //   location: "Stockholm",
// //   date: new Date('1995-12-17T03:24:00'),
// //   averageTempDay: 20
// // },
// // {
// //   location: "Göteborg",
// //   date: new Date('1995-12-17T03:24:00'),
// //   averageTempDay: 20
// // },c
// // {
// //   location: "Stockholm",
// //   date: new Date('2023-02-12T03:24:00'),
// //   averageTempDay: 20
// // }
// // ]

// console.log(Date.now())

// // console.log(dailyTemperatures[0].date.getTime())

// // averageWeeklyTemperature(dailyTemperatures);
// class Student {
//   constructor(
//     public name: string,
//     public handedInOnTime: boolean,
//     public passed: boolean
//   ) {}
// }

// let student1 = new Student("Per", true, true);
// let student2 = new Student("Lisa", false, false);

// let students = new Array(student1, student2);
// console.log(students)



// function presentStudents(students: Student[]) {
//   for (const student of students) {
//     let container = document.createElement("div");
//     let checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     container.appendChild(checkbox);

//     if (student.handedInOnTime) {
//       checkbox.checked = true;

//       let listOfStudents = document.querySelector("ul#passedstudents");
//       listOfStudents?.appendChild(container);
//     } else {
//       checkbox.checked = false;

//       let listOfStudents = document.querySelector("ul#failedstudents");
//       listOfStudents?.appendChild(container);
//     }
//   }
// }


// presentStudents(students);

// let results = ["Lorem", "ipsum", "dolor", "sit", "amet"];
// let addedResults = results.reduce((accumulated, current) => accumulated + " " + current
// );

// console.log(addedResults);

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ){}
}

let product1 = new Product(1, "grej", ["image"], 20, "bkabla") 
let product2 = new Product(2, "grej2", ["image2"], 220, "2bkabla") 
let product3 = new Product(3, "grej3", ["image3"], 330, "2b333kabla") 

let products = new Array(product1, product2, product3);

console.log(products)

let products2 = structuredClone(products);

console.log(products2);