/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getLength(jumpLengthsInCentimeters: number[]): number {
  return jumpLengthsInCentimeters.reduce(
    (jumpDistanceSoFar, currentJump) => {
      return jumpDistanceSoFar + currentJump
    }
  );
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  student.passed = (student.name == "Sebastian") && student.handedInOnTime ? true : false;

  if (student.passed) {
    return "VG";
  } else {
    return "IG";
  }
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

export class Temp {
  constructor(
    public location: string, 
    public date: Date, 
    public tempDayCelsius: number) {}
}

function filterTemperatureArray(dailyTemperatures: Temp[]){
  
  const locationForAverageTemp: string = "Stockholm";
  const oneWeekBack = Date.now() - 604800000;

  const locationTemps: Temp[] = dailyTemperatures.filter(city => {
      city.location.includes(locationForAverageTemp);
    });

  const temperaturesLastWeek: Temp[] = locationTemps.filter(lastWeek => {
    lastWeek.date.getTime() > oneWeekBack;
  });

  averageWeeklyHighestTemperature(temperaturesLastWeek);

}

function averageWeeklyHighestTemperature(dailyTemperatures: Temp[]) {
  let averageWeeklyHighestTemp = 0;

  for (let i = 0; i < dailyTemperatures.length; i++) {
          averageWeeklyHighestTemp += dailyTemperatures[i].tempDayCelsius;
    }

  return averageWeeklyHighestTemp / 7;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

class Product{
  constructor(
    public name: string,
    public price: number,
    public amount: number,
    public description: string,
    public image: string,
    public parent: HTMLElement
  ) {}
}

function showProduct( product: Product) {
  document.body.innerHTML = `
  <div>
    <h4>${product.name}</h4>
    <strong>${product.price.toString()}</strong>
    <img src="${product.image}">
  </div>`
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

function presentStudents(students: Student[]) {
  for (const student of students) {
    const { checkbox, container } = setupHtml();

    student.handedInOnTime ? checkbox.checked = true : checkbox.checked = false;

    let listOfStudents = createListOfStudents()
    listOfStudents?.appendChild(container);

  function createListOfStudents(){
      if (student.handedInOnTime) {
        return document.querySelector("ul#passedstudents");
      } else {
        return document.querySelector("ul#failedstudents");
      }
    }
  }

  function setupHtml() {
    const container = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    container.appendChild(checkbox);
    return { checkbox, container };
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

function concatenateStrings() {
  let results = ["Lorem", "ipsum", "dolor", "sit", "amet"];

  return results.reduce((accumulated, current) => {
    return accumulated + " " + current;
  });
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

class User{
  constructor(
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string,
  ) {}
}

function createUser(user: User
) {
  // Validation

  let ageDiff = Date.now() - user.birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if (userAge >=20) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
