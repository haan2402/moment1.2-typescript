//interface för kurs
interface Course {
  code: string;
  name: string;
  progression: 'A' | 'B' | 'C';
  syllabus: string;
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
      <p><strong>Progression:</strong> ${course.progression}</p> - 
      <a href="${course.syllabus}"<strong>Kursplan:</strong></a>
      `;

      listCourse.appendChild(courseList);
    });
  }
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

  //skapar ny kurs
  const newCourse: Course = {
    code: codeInput.value,
    name: nameInput.value,
    progression: progressionInput.value as 'A' | 'B' | 'C',
    syllabus: syllabusInput.value,
  };


});
