const forms = document.getElementById(`forms`);
const msg = document.querySelector(`.msg`);
const tbody = document.querySelector(`.tbody`);
const veiw_body = document.querySelector(`.veiw_body`);
const result_msg = document.querySelector(`.result_msg`);
const edite_form = document.getElementById(`edite_form`);
const veiw_form = document.getElementById(`veiw_form`);

//delete data

const deletestudent = (roll) => {
  const olddata = getdat("student");

  const udata = olddata.filter((dataaa) => dataaa.roll !== roll);

  updatedata("student", udata);
  showdata();
};

//edite data
const edite = (id) => {
  const olddata = getdat(`student`);
  const dataa = olddata.find((items) => items.id == id);
  edite_form.querySelector('input[name="names"]').value = dataa.names;
  edite_form.querySelector('input[name="roll"]').value = dataa.roll;
  edite_form.querySelector('input[name="reg"]').value = dataa.reg;
  edite_form.querySelector('input[name="id"]').value = dataa.id;
  edite_form.querySelector('input[name="photo"]').value = dataa.photo;
  edite_form.querySelector("img#pphoto").setAttribute("src", dataa.photo);
};

//submit edite form

edite_form.onsubmit = (e) => {
  e.preventDefault();
  const edata = new FormData(e.target);
  const alldata = Object.fromEntries(edata.entries());
  const eolddata = getdat(`student`);

  eolddata[eolddata.findIndex((items) => items.id == alldata.id)] = {
    ...eolddata[eolddata.findIndex((items) => items.id == alldata.id)],
    ...alldata,
  };

  updatedata("student", eolddata);
  showdata();
};
// veiw data

const view_data = (roll) => {
  const prdat = getdat(`student`);

  const singles = prdat.find((da) => da.roll == roll);

  veiw_body.innerHTML = `<div class="info">
              <img
                class="shadow"
                src="${singles.photo}"
                alt=""
              />
              <h3>Name: ${singles.names}</h3>
              <h5>Roll: ${singles.roll}</h5>
            </div>
 `;
};

//veiw mark
const veiw_mark = (id) => {
  const olddata = getdat(`student`);
  const editedata = olddata.find((item) => item.id == id);

  veiw_form.querySelector('input[name="bangla"]').value =
    editedata.result.bangla;
  veiw_form.querySelector('input[name="english"]').value =
    editedata.result.english;
  veiw_form.querySelector('input[name="math"]').value = editedata.result.math;
  veiw_form.querySelector('input[name="since"]').value = editedata.result.since;
  veiw_form.querySelector('input[name="social_since"]').value =
    editedata.result.social_since;
  veiw_form.querySelector('input[name="religion"]').value =
    editedata.result.religion;

  veiw_form.querySelector('input[name="id"]').value = id;
};

//veiw form data submit

veiw_form.onsubmit = (e) => {
  e.preventDefault();
  const alldata = new FormData(e.target);
  const data = Object.fromEntries(alldata.entries());
  const olddata = getdat(`student`);
  olddata[olddata.findIndex((items) => items.id === data.id)] = {
    ...olddata[olddata.findIndex((items) => items.id === data.id)],
    result: data,
  };
  updatedata(`student`, olddata);
  showdata();
};
//add student resut

const add_result = (id) => {
  const result_form = document.getElementById(`result_form`);

  result_form.querySelector('input[name="id"]').value = id;
};
//student result form submit
result_form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const alldata = new FormData(e.target);
  const data = Object.fromEntries(alldata.entries());

  if (
    !data.bangla ||
    !data.english ||
    !data.math ||
    !data.since ||
    !data.social_since ||
    !data.religion
  ) {
    result_msg.innerHTML = createalert(`all feild are required`, `danger`);
  } else {
    result_msg.innerHTML = createalert(`data stable`, `info`);
  }

  const eolddata = getdat(`student`);
  eolddata[eolddata.findIndex((item) => item.id == data.id)] = {
    ...eolddata[eolddata.findIndex((item) => item.id == data.id)],
    result: data,
  };

  updatedata(`student`, eolddata);
  showdata();
});
//show form data

const showdata = () => {
  const getdas = getdat(`student`);
  let content = ``;
  if (getdas.length > 0) {
    getdas.map((dataa, index) => {
      content += `
<tr class="align-middle">
                    <td>${index + 1}</td>
                    <td>
                      <img
                        style="
                          width: 60px;
                          height: 60px;
                          object-fit: cover;
                          border-radius: 50%;
                        "
                        src="${dataa.photo}"
                        alt=""
                      />
                    </td>
                    <td>${dataa.names}</td>
                    <td>${dataa.roll}</td>
                    <td>${dataa.reg}</td>
                    <td>
                    ${
                      dataa.result === null
                        ? `<button href="#student_result_modal" data-bs-toggle="modal" onclick="add_result('${dataa.id}')" class="btn btn-success">Add Mark</button>`
                        : `<button data-bs-toggle="modal" href="#student_veiw_modal" onclick="veiw_mark('${dataa.id}')" class="btn btn-warning">veiw Mark</button>`
                    }
                   </td>
                    <td>
                      <button onclick="view_data('${
                        dataa.roll
                      }')" data-bs-toggle="modal" href="#veiw_modal" class="btn btn-warning">
                        <i class="fa fa-eye"></i>
                      </button>
                     
                      </button>
                      <button onclick="edite('${
                        dataa.id
                      }')" data-bs-toggle="modal" href="#edite_modal" class="btn btn-info">
                        <i class="fa fa-edit"></i>
                      </button>
                      <button onclick="deletestudent('${
                        dataa.roll
                      }')" class="btn btn-danger">
                        <i class="fa fa-trash"></i>
                    </td>
                  </tr>

`;
    });
  } else {
    content += `
  <tr >
  <td colspan="8">no data found</td>
  </tr>
  `;
  }
  tbody.innerHTML = content;
};
showdata();

forms.addEventListener("submit", (e) => {
  e.preventDefault();

  const allformdata = new FormData(e.target);
  const data = Object.fromEntries(allformdata.entries());

  if (!data.names || !data.roll || !data.reg || !data.photo) {
    msg.innerHTML = createalert(`all feild are required`, `danger`);
  } else if (!isnumber(data.roll)) {
    msg.innerHTML = createalert("invalid roll number", `danger`);
  } else if (!isnumber(data.reg)) {
    msg.innerHTML = createalert(`invalid reg number`, `danger`);
  } else {
    msg.innerHTML = createalert(`${data.names} your data stable`, `info`);

    //check roll number
    const oldstudent = getdat(`student`);
    if (oldstudent.some((item) => item.roll == data.roll)) {
      msg.innerHTML = createalert(`roll already exits`, `danger`);
      return;
    }
    //check reg number
    if (oldstudent.some((item) => item.reg == data.reg)) {
      msg.innerHTML = createalert(`reg already exits`, `danger`);
      return;
    }

    const dats = sendata("student", data);
    showdata();
    e.target.reset();
  }
});
