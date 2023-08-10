const search_form = document.getElementById(`search_form`);
const result = document.querySelector(`.result`);

search_form.onsubmit = (e) => {
  e.preventDefault();
  const alldata = new FormData(e.target);
  const data = Object.fromEntries(alldata.entries());
  const olddata = getdat(`student`);

  const studentalldata = olddata.find(
    (items) => items.roll === data.roll && items.reg === data.reg
  );
  let content = ``;
  if (studentalldata) {
    content += `
<div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow">
            <div class="card-body">
              <img
                style="width: 150px; height: 150px; border-radius: 50%"
                src="${studentalldata.photo}"
                alt=""
              />
              <h3 class="my-2">${studentalldata.names}</h3>
              <p>roll: ${studentalldata.roll} | reg: ${studentalldata.reg}</p>
              <hr />
              <h2>passed</h2>
              <table class="table table-bordered">
                <tr>
                  <td>Subjects</td>
                  <td>Mark</td>
                  <td>Grade</td>
                  <td>Gpa</td>
                  <td>Cgpa</td>
                  <td>Final Result</td>
                </tr>
                <tr row-span="8">
                  <td>Bangla</td>
                  <td>${studentalldata.result.bangla}</td>
                  <td>${getGpaGrade(studentalldata.result.bangla).grade}</td>
                  <td>${getGpaGrade(studentalldata.result.bangla).gpa}</td>
                  <td>${getcgparesult({
                    bangla: studentalldata.result.bangla,
                    english: studentalldata.result.english,
                    math: studentalldata.result.math,
                    since: studentalldata.result.since,
                    social_since: studentalldata.result.social_since,
                    religion: studentalldata.result.religion,
                  }).cgpa.toFixed(2)}
                  </td>
                  <td>${
                    getcgparesult({
                      bangla: studentalldata.result.bangla,
                      english: studentalldata.result.english,
                      math: studentalldata.result.math,
                      since: studentalldata.result.since,
                      social_since: studentalldata.result.social_since,
                      religion: studentalldata.result.religion,
                    }).result
                  }</td>
                </tr>
                <tr row-span="8">
                  <td>English</td>
                  <td>${studentalldata.result.english}</td>
                  <td>${getGpaGrade(studentalldata.result.english).grade}</td>
                  <td>${getGpaGrade(studentalldata.result.english).gpa}</td>
                </tr>
                <tr row-span="8">
                  <td>Math</td>
                  <td>${studentalldata.result.math}</td>
                  <td>${getGpaGrade(studentalldata.result.math).grade}</td>
                  <td>${getGpaGrade(studentalldata.result.math).gpa}</td>
                </tr>
                <tr row-span="8">
                  <td>Since</td>
                  <td>${studentalldata.result.since}</td>
                  <td>${getGpaGrade(studentalldata.result.since).grade}</td>
                  <td>${getGpaGrade(studentalldata.result.since).gpa}</td>
                </tr>
                <tr row-span="8">
                  <td>socail</td>
                  <td>${studentalldata.result.social_since}</td>
                  <td>${
                    getGpaGrade(studentalldata.result.social_since).grade
                  }</td>
                  <td>${
                    getGpaGrade(studentalldata.result.social_since).gpa
                  }</td>
                </tr>
                <tr row-span="8">
                  <td>Riligion</td>
                  <td>${studentalldata.result.religion}</td>
                  <td>${getGpaGrade(studentalldata.result.religion).grade}</td>
                  <td>${getGpaGrade(studentalldata.result.religion).gpa}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
  } else {
    content += `<td  style="display:block;">no result found</td>`;
  }
  result.innerHTML = content;
};
