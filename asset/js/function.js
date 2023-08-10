const sendata = (key, datas) => {
  let lsdat = [];
  if (localStorage.getItem(key)) {
    lsdat = JSON.parse(localStorage.getItem(key));
  }
  lsdat.push({ ...datas, result: null, id: generateRandomString() });
  localStorage.setItem(key, JSON.stringify(lsdat));
};

// update data

const updatedata = (key, datas) => {
  localStorage.setItem(key, JSON.stringify(datas));
};
// get loca data

const getdat = (key) => {
  let lsdat = [];
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return lsdat;
  }
};

//alert

const createalert = (msg, type = `danger`) => {
  return `
  <p class="d-flex justify-content-between  alert alert-${type}">${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>
  `;
};

const isnumber = (nmber) => {
  const petten = /^[0-9]{6,}$/;

  return petten.test(nmber);
};

// id
function generateRandomString(length = 25) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

const getGpaGrade = (marks) => {
  let gpa;
  let grade;

  if (marks >= 0 && marks < 33) {
    gpa = 0;
    grade = "F";
  } else if (marks >= 33 && marks < 40) {
    gpa = 1;
    grade = "D";
  } else if (marks >= 40 && marks < 50) {
    gpa = 2;
    grade = "C";
  } else if (marks >= 50 && marks < 60) {
    gpa = 3;
    grade = "B";
  } else if (marks >= 60 && marks < 70) {
    gpa = 3.5;
    grade = "A-";
  } else if (marks >= 70 && marks < 80) {
    gpa = 4;
    grade = "A";
  } else if (marks >= 80 && marks <= 100) {
    gpa = 5;
    grade = "A+";
  }
  return {
    gpa: gpa,
    grade: grade,
  };
};

const getcgparesult = (marks) => {
  let cgpa;
  let result;
  let totalcgpa =
    getGpaGrade(marks.bangla).gpa +
    getGpaGrade(marks.english).gpa +
    getGpaGrade(marks.math).gpa +
    getGpaGrade(marks.since).gpa +
    getGpaGrade(marks.social_since).gpa + // Corrected property name
    getGpaGrade(marks.religion).gpa;
  cgpa = totalcgpa / 6;
  if (
    marks.bangla >= 33 &&
    marks.english >= 33 &&
    marks.math >= 33 &&
    marks.since >= 33 &&
    marks.social_since >= 33 && // Corrected property name
    marks.religion >= 33
  ) {
    if (cgpa >= 1 && cgpa < 2) {
      result = "D";
    } else if (cgpa >= 2 && cgpa < 3) {
      result = "C";
    } else if (cgpa >= 3 && cgpa < 3.5) {
      result = "B";
    } else if (cgpa >= 3.5 && cgpa < 4) {
      result = "A-";
    } else if (cgpa >= 4 && cgpa < 5) {
      result = "A";
    } else if (cgpa == 5) {
      result = "A+";
    }
    return {
      result: result,
      cgpa: cgpa,
    };
  } else {
    result = "F";
    cgpa = cgpa; // This line might not be necessary.
    return {
      result: result,
      cgpa: cgpa,
    };
  }
};
