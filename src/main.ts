//interface för kurs
interface Course {
  code: string;
  name: string;
  progression: 'A' | 'B' | 'C';
  syllabus: string;
}

//så att kurserna som lagts till i listan syns och inte försvinner när man laddar om sidan
window.onload = () => {
  printCourses(storedCourses());
}

//funktion för att skriva ut kursinfo
function printCourses(courses: Course[]): void {
  const listCourse = document.getElementById("list-courses");
  if(listCourse) {
    listCourse.innerHTML = "";

    courses.forEach((course) => {
      const courseList = document.createElement("li");
      courseList.innerHTML = `
      <p><strong>Kurskod:</strong> ${course.code}</p>
      <p><strong>Kursnamn:</strong> ${course.name}</p>
      <p><strong>Progression:</strong> ${course.progression}</p> 
      <a href="${course.syllabus}" target="_blank"><strong>Kursplan</strong></a>
      `;

      listCourse.appendChild(courseList);
    });
  }
}

//funktion för att ta bort kurser som är lagrade i listan
function removeCourses() : void {
  localStorage.removeItem("courses");
  printCourses([]);
}

  const removeButton = document.getElementById("removeCourses") as HTMLButtonElement;

//eventlyssnare för ta bort knapp, tar bort kurserna från listan
removeButton.addEventListener("click", () => {
  removeCourses();
})

//funktion för att hämta lagrade kurser från localstorage, om det inte finns något att returnera kommer det en tom array
function storedCourses(): Course[] {
  return JSON.parse(localStorage.getItem("courses") || "[]");
}

//funtion för att lagra kurser som skrivs in till localstorage
function saveCourses(courses: Course[]): void {
  localStorage.setItem("courses", JSON.stringify(courses));
}

//Hämta DOM för formulär och kursinfo
const courseForm = document.getElementById("courseForm") as HTMLFormElement;

//eventlyssnare till formuläret 
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const codeInput = document.getElementById("course-code") as HTMLInputElement;
  const nameInput = document.getElementById("course-name") as HTMLInputElement;
  const progressionInput = document.getElementById("progression") as HTMLSelectElement;
  const syllabusInput = document.getElementById("syllabus") as HTMLInputElement; 

  //hämtar lagrade kurser
  const courses = storedCourses();

  //Validerar för att kontrollera att kurskoden är unik och lägger till ett alert-meddelande om kursen redan finns
  if(courses.some((course) => course.code.toLowerCase() === codeInput.value.toLowerCase())) {
    alert("Denna kurs finns redan i listan, testa en annan kod!");
    return;
  }

  //skapar ny kurs
  const newCourse: Course = {
    code: codeInput.value,
    name: nameInput.value,
    progression: progressionInput.value as 'A' | 'B' | 'C',
    syllabus: syllabusInput.value,
  };

  //Den första lägger till den kursen som skrivs in, den andra sparar den i listan till localstorage, den tredje uppdaterar listan med kurser
  courses.push(newCourse);
  saveCourses(courses);
  printCourses(courses);
});
