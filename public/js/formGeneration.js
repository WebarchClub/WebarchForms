const handleLayout = () => {
  const width = $(window).width();
  if (width < 751) {
    $(".list").each(function () {
      $(this).removeClass("w-100").addClass("w-50");
    });
  } else {
    $(".list").each(function () {
      $(this).removeClass("w-50").addClass("w-100");
    });
  }
};
$(window).resize(function () {
  handleLayout();
});

const setSectionNumber = () => {
  let fcs = $(".form-block");
  [...fcs].forEach((fc, fcIdx) => {
    let isSection = $(fc).hasClass("new-section");
    if (isSection) {
      let sectionNumber = Number($(fc).find(".current").text().trim());
      $(fc).addClass(`section-${sectionNumber}`);
    } else {
      let sectionNumber = Number(
        $(fc).prevAll(".new-section").first().find(".current").text().trim()
      );
      $(fc).addClass(`section-${sectionNumber}`);
    }
  });
};
$(document).ready(function () {
  setSectionNumber();
  const addQuestionList = $(".addQuestionList");
  const addQuestionGrid = $(".addQuestionGrid");
  const formContainer = $(".form-content");
  console.log(formContainer);
  const formContainerHeight = formContainer.css("height");
  handleLayout();

  $("#type").val("mcq");
  const grid = `
    <div class="form-container form-block w-50 grid">
        <div class="form-header">
        <div class="select-box">
            <select name="type" id="type">
            <option value="mcq">Multiple Choice</option>
            <option value="short">Short answer</option>
            <option value="para">Paragraph</option>
            <option value="checkbox">Checkboxes</option>
            <option value="dropdown">Dropdown</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="file">File Upload</option>
            </select>
        </div>
        <div class="text-box">
          <div class="question-img"></div>  
          <div class="question-section">
            <textarea placeholder="Enter question"></textarea>
            <div class="question-image">
              <input type="file" name="question-image" class="input-question" accept="image/*" />
              <label for="question-image"><i class="fas fa-photo-video textarea-icon"></i></label>
            </div>
          </div>
        </div>
        </div>
        <div class="input">
          <div class="mcq-option">
            <div class="mcqs">
                <div class="option">
                <input type="radio" />
                <input type="text" placeholder="Enter option" />
                <i class="far fa-trash-alt deleteOption"></i>
                </div>
            </div>
            <div class="add-option">
                <input type="radio" />
                <span class="addMcq">Add another</span>
            </div>
          </div>
        </div>
        <div class="bottom-section">
        <span class="child">
            <span class="required">Required</span>
            <input type="checkbox" />
        </span>
        <span class="child">
            <i class="far fa-copy copyQuestion"></i>
            <i class="far fa-trash deleteQuestion"></i>
        </span>
        </div>
    </div>
  `;
  const list = `
  <div class="form-container form-block w-100 list">
      <div class="form-header">
      <div class="select-box">
          <select name="type" id="type">
          <option value="mcq">Multiple Choice</option>
          <option value="short">Short answer</option>
          <option value="para">Paragraph</option>
          <option value="checkbox">Checkboxes</option>
          <option value="dropdown">Dropdown</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
          <option value="file">File Upload</option>
          </select>
      </div>
      <div class="text-box">
        <div class="question-img"></div>
        <div class="question-section">
          <textarea placeholder="Enter question"></textarea>
          <div class="question-image">
            <input type="file" name="question-image" class="input-question" accept="image/*" />
            <label for="question-image"><i class="fas fa-photo-video textarea-icon"></i></label>
          </div>
        </div>
      </div>
      </div>
      <div class="input">
        <div class="mcq-option">
          <div class="mcqs">
              <div class="option">
              <input type="radio" />
              <input type="text" placeholder="Enter option" />
              <i class="far fa-trash-alt deleteOption"></i>
              </div>
          </div>
          <div class="add-option">
              <input type="radio" />
              <span class="addMcq">Add another</span>
          </div>
        </div>
      </div>
      
      <div class="bottom-section">
      <span class="child">
          <span class="required">Required</span>
          <input type="checkbox" />
      </span>
      <span class="child">
          <i class="far fa-copy copyQuestion"></i>
          <i class="far fa-trash deleteQuestion"></i>
      </span>
      </div>
  </div>
  `;
  const titleSection = `
    <div class="titleDescription form-block addSection">
      <div class="input-title">
        <input type="text" placeholder="Title" />
        <span class="icons">
          <i class="far fa-copy copyTitle"></i>
          <i class="far fa-trash deleteTitle"></i>
        </span>
      </div>
      <div class="input-description">
        <input type="text" placeholder="Description" />
      </div>
    </div>
    `;

  addQuestionList.click(function () {
    formContainer.append(list);
    handleLayout();
    handleQuestionImage();
    setSectionNumber();
  });
  addQuestionGrid.click(function () {
    formContainer.append(grid);
    handleQuestionImage();
    setSectionNumber();
  });

  // delete question
  $(document).on("click", ".deleteQuestion", function () {
    $(this).parents()[2].remove();
    setSectionNumber();
  });

  // copy question
  $(document).on("click", ".copyQuestion", function () {
    $(this)
      .parents(".form-container")
      .clone()
      .insertAfter($(this).parents(".form-container"));
    setSectionNumber();
  });

  //change title
  $(".title").on("keyup", function (e) {
    const value = e.target.value;
    $("#title").html(value);
  });
  // edit title
  $(".edit").click(function () {
    $(".title").focus();
  });
  // add option mcqs
  $(document).on("click", ".add-option", function () {
    if ($(this).siblings(".mcqs")[0].children.length >= 2) {
      const height = parseInt($(".form-container").css("height"));
      $(".form-container").css("height", `${height + 45}px`);
    }
    $($(this).siblings(".mcqs")[0]).append(`
          <div class="option">
              <input type="radio" />
              <input type="text" placeholder="Enter option" />
              <i class="far fa-trash-alt deleteOption"></i>
          </div>
        `);
  });
  // add option checkbox
  $(document).on("click", ".add-checkbox", function () {
    if ($(this).siblings(".check-options")[0].children.length >= 2) {
      const height = parseInt($(".form-container").css("height"));
      $(".form-container").css("height", `${height + 45}px`);
    }
    $($(this).siblings(".check-options")[0]).append(`
        <div class="option">
          <input type="checkbox" />
          <input type="text" placeholder="Enter option" />
          <i class="far fa-trash-alt deleteOption"></i>
        </div>
        `);
  });
  // delete option
  $(document).on("click", ".deleteOption", function () {
    if ($(this).parent().parent()[0].children.length >= 3) {
      const height = parseInt($(".form-container").css("height"));
      $(".form-container").css("height", `${height - 45}px`);
    }
    $(this).parent().remove();
  });

  // all available options
  const mcqOption = `
    <div class="mcq-option">
      <div class="mcqs">
        <div class="option">
          <input type="radio" />
          <input type="text" placeholder="Enter option" />
          <i class="far fa-trash-alt deleteOption"></i>
        </div>
      </div>
      <div class="add-option">
        <input type="radio" />
        <span class="addMcq">Add another</span>
      </div>
    </div>`;
  const shortOption = `
    <div class="short-option">
      <input type="text" placeholder="Your Answer" />
    </div>`;
  const paraOption = `
    <div class="para-option">
      <textarea placeholder="Your Answer"></textarea>
    </div>
    `;
  const checkboxOption = `
      <div class="checkbox-option">
        <div class="check-options">
          <div class="option">
            <input type="checkbox" />
            <input type="text" placeholder="Enter option" />
            <i class="far fa-trash-alt deleteOption"></i>
          </div>
        </div>
        <div class="add-checkbox">
          <input type="radio" />
          <span class="addMcq">Add another</span>
        </div>
      </div>
    `;
  const dateOption = `
      <div class="date-option">
        <input id="input-date" type="date" value="2020-10-31" />
      </div>
    `;
  const timeOption = `
      <div class="time-option">
        <input id="input-time" type="time" value="00:00:01" />
      </div>
    `;
  const fileUploadOption = `
      <div class="file-upload">
        <div class="file-select">
          <div class="file-select-button fileName">Choose File</div>
          <div class="file-select-name noFile">No file chosen...</div>
          <input type="file" name="chooseFile" class="chooseFile" onchange="handleChange(this)"/>
        </div>
      </div>
    `;
  $(document).on("change", "#type", function () {
    const value = $(this).val();
    const input = $(this).parents(".form-header").siblings()[0];
    console.log(input);
    $(input).empty();
    $(".form-container").css("height", formContainerHeight);
    switch (value) {
      case "mcq":
        $(input).append(mcqOption);
        return;
      case "short":
        $(input).append(shortOption);
        return;
      case "para":
        $(input).append(paraOption);
        return;
      case "checkbox":
        $(input).append(checkboxOption);
        return;
      case "date":
        $(input).append(dateOption);
        return;
      case "time":
        $(input).append(timeOption);
        return;
      case "file":
        $(input).append(fileUploadOption);
        return;
    }
  });

  // add new section
  $(".addNewSection").click(function () {
    formContainer.append(
      `<div class="new-section form-block">
            <div class="section-id">Section <span class="current">-</span> of <span class="total">-</span></div>
            <div class="section-title">
              <input type="text" placeholder="Section Title" />
              <span class="actions">
                <i class="far fa-copy copySection"></i>
                <i class="far fa-trash deleteSection"></i>
              </span>
            </div>
            <div class="section-description">
              <textarea placeholder="Description"></textarea>
            </div>
          </div>
          `
    );

    handleSectionIndex();
    setSectionNumber();
  });
  const handleSectionIndex = () => {
    const total = $(".total").length;
    const sections = $(".new-section");
    sections.each((i, index) => {
      $($(index).children()[0]).children()[0].innerHTML = i + 1;
      $($(index).children()[0]).children()[1].innerHTML = total;
    });
  };
  $(document).on("click", ".deleteSection", function () {
    $(this).parents(".new-section")[0].remove();
    handleSectionIndex();
  });
  $(document).on("click", ".copySection", function () {
    $(this)
      .parents(".new-section")
      .clone()
      .insertAfter($(this).parents(".new-section"));
    handleSectionIndex();
  });
  // add title section
  $(".addTitle").click(function () {
    formContainer.append(titleSection);
    setSectionNumber();
  });
  $(document).on("click", ".deleteTitle", function () {
    $(this).parents(".titleDescription")[0].remove();
  });
  $(document).on("click", ".copyTitle", function () {
    $(this)
      .parents(".titleDescription")
      .clone()
      .insertAfter($(this).parents(".titleDescription"));
  });

  // image section upload
  const inputImage = document.getElementById("actual-btn");
  const fileChosen = document.getElementById("file-chosen");
  let uploadedFile;
  let imageSection;
  $(".addImageSection").click(function () {
    $(".overlay").css("display", "flex");
    inputImage.addEventListener("change", function () {
      fileChosen.textContent = this.files[0].name;
      uploadedFile = URL.createObjectURL(inputImage.files[0]);
      imageSection = `
        <div class="imageSection form-block addSection">
          <div class="input-title">
            <input type="text" placeholder="Image Title" />
            <span class="icons">
              <i class="far fa-copy copyImage"></i>
              <i class="far fa-trash deleteImage"></i>
            </span>
          </div>
          <div class="image">
            <img src="${uploadedFile}" alt="img" />
          </div>
        </div>
        `;
      $("#modal-img").attr("src", uploadedFile);
      $("#modal-img").css("display", "inline");
    });
  });
  $(".proceed").click(function () {
    if (imageSection) {
      formContainer.append(imageSection);
      setSectionNumber();
      $(".overlay").hide(100);
      $("#modal-img").attr("src", "");
      $("#modal-img").css("display", "none");
      fileChosen.textContent = "No file chosen";
    } else {
      alert("Please choose an image");
    }
  });
  $(".cancel").click(function () {
    $(".overlay").hide(100);
    $("#modal-img").attr("src", "");
    $("#modal-img").css("display", "none");
    fileChosen.textContent = "No file chosen";
  });
  $(document).on("click", ".deleteImage", function () {
    $(this).parents(".imageSection")[0].remove();
  });
  $(document).on("click", ".copyImage", function () {
    $(this)
      .parents(".imageSection")
      .clone()
      .insertAfter($(this).parents(".imageSection"));
  });

  // video section upload
  const inputVideo = document.getElementById("file-input");
  const videoSource = document.createElement("source");
  const video = document.getElementById("video");
  const videoChosen = document.getElementById("video-chosen");
  $(".addVideoSection").click(function () {
    $(".overlay-video").css("display", "flex");
  });
  inputVideo.addEventListener("change", function () {
    const files = this.files || [];
    if (!files.length) return;
    videoChosen.innerHTML = files[0].name;
    const reader = new FileReader();

    reader.onload = function (e) {
      // videoSource.setAttribute("src", e.target.result);
      formContainer.append(
        `
          <div class="video-section form-block">
          <div class="input-video">
            <input type="text" placeholder="Video Title" />
            <span class="videoOptions">
              <i class="far fa-copy copyVideo"></i>
              <i class="far fa-trash deleteVideo"></i>
            </span>
          </div>
          <div class="video">
            <video id="video" src=${e.target.result} controls></video>
          </div>
        </div>
          `
      );
      setSectionNumber();
      video.appendChild(videoSource);
      video.load();
      video.play();
    };

    reader.onprogress = function (e) {
      console.log("progress: ", Math.round((e.loaded * 100) / e.total));
    };

    reader.readAsDataURL(files[0]);
  });
  $(".proceedVideo").click(function () {
    $(".overlay-video").hide(100);
    videoChosen.textContent = "No file chosen";
  });
  $(".cancelVideo").click(function () {
    $(".overlay-video").hide(100);
    videoChosen.textContent = "No file chosen";
  });
  $(document).on("click", ".deleteVideo", function () {
    $(this).parents(".video-section")[0].remove();
  });
  $(document).on("click", ".copyVideo", function () {
    $(this)
      .parents(".video-section")
      .clone()
      .insertAfter($(this).parents(".video-section"));
  });

  $(document).on("click", ".removeQuestionImage", function () {
    console.log($(this).parents(".form-container"));
    $(this).parents(".form-container").css("height", `330px`);
    $(this).parent().empty();
  });
  const handleQuestionImage = () => {
    $(".input-question").each(function (key, element) {
      $(element).on("change", function () {
        let questionImage = URL.createObjectURL(this.files[0]);
        $($(this).parents(".question-section").siblings()[0]).empty();
        $($(this).parents(".question-section").siblings()[0]).append(
          `
            <img src="${questionImage}" alt="" />
            <i class="far fa-times removeQuestionImage"></i>
            `
        );
        $(this).parents(".form-container").css("height", `400px`);
      });
    });
  };
  handleQuestionImage();
  const publish = async () => {
    try {
      const res = await fetch("/generation/<%=id%>", {
        method: "POST",
        body: JSON.stringify(formContainer),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      // if (data.errors) {
      //   emailError.textContent = data.errors.email;
      //   passwordError.textContent = data.errors.password;
      // }
      // console.log("Your data" + data.user);
      if (data) {
        location.assign("/generation/<%=id%>");
      }
    } catch (err) {
      console.log(err);
    }
  };
});
