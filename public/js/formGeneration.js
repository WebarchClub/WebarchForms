var mainArr = [];
var files = [];
var test;
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
  var arr = [];
  var imgArr = [];
  var tit = {};
  tit.title = $('input[class="title"]').val();
  tit.titleDesc = $('input[class="titleDesc"]').val();

  arr.push(tit);

  [...fcs].forEach((fc, fcIdx) => {
    let isSection = $(fc).hasClass("new-section");
    let isGrid = $(fc).hasClass("grid");
    let isList = $(fc).hasClass("list");
    if (isSection) {
      let sectionNumber = Number($(fc).find(".current").text().trim());
      console.log($(fc).children());

      var obj = {};
      if (isGrid) {
        obj.grid = true;
      }
      if (isList) {
        obj.list = true;
      }
      obj.sectionNumber = sectionNumber;
      obj.question = $(fc)
        .children(".form-header")
        .children(".text-box")
        .children(".question-section")
        .children("textarea")
        .val();

      // type
      obj.type = $(fc)
        .children(".form-header")
        .children(".select-box")
        .children("select")
        .val();

      //image
      // const image;
      $(fc)
        .children(".form-header")
        .children(".text-box")
        .children(".question-section")
        .children(".question-image")
        .children("input")
        .each(function () {
          obj.file = $(this)[0].files[0];
        });
      if (obj.file) {
        imgArr.push(obj.file);
      }
      //mcq values
      var ans1 = [];
      $(fc)
        .children(".input")
        .children(".mcq-option")
        .children(".mcqs")
        .children(".option")
        .map((index, val) => {
          var obje2 = {};
          obje2.radioCheck = $(val)
            .children('input[type="radio"]')
            .is(":checked");
          obje2.radioVal = $(val).children('input[type="text"]').val();
          ans1.push(obje2);
        });
      obj.mcq = ans1;
      obj.short = $(fc)
        .children(".input")
        .children(".short-option")
        .children('input[type="text"]')
        .val();

      obj.para = $(fc)
        .children(".input")
        .children(".para-option")
        .children("textarea")
        .val();

      obj.date = $(fc)
        .children(".input")
        .children(".date-option")
        .children('input[type="date"]')
        .val();

      obj.time = $(fc)
        .children(".input")
        .children(".time-option")
        .children('input[type="time"]')
        .val();
      //required checking
      obj.required = $(fc)
        .children(".bottom-section")
        .children(".first")
        .children('input[type="checkbox"]')
        .val();

      var checkBox = [];
      $(fc)
        .children(".input")
        .children(".checkbox-option")
        .children(".check-options")
        .children(".option")
        .map((index, val) => {
          var object1 = {};
          object1.checkBox = $(val)
            .children('input[type="checkbox"]')
            .is(":checked");
          object1.checkBoxVal = $(val).children('input[type="text"]').val();
          checkBox.push(object1);
        });
      obj.checkB = checkBox;

      if ($(fc).hasClass("new-section")) {
        obj.sectionTitle = $(fc)
          .children(".section-title")
          .children("input[type='text']")
          .val();
        obj.titleDescription = $(fc)
          .children(".section-description")
          .children("textarea")
          .val();
      }

      arr.push(obj);
      $(fc).addClass(`section-${sectionNumber}`);
    } else {
      let sectionNumber = Number(
        $(fc).prevAll(".new-section").first().find(".current").text().trim()
      );
      //got question

      var obj = {};
      if (isGrid) {
        obj.grid = true;
      }
      if (isList) {
        obj.list = true;
      }
      obj.sectionNumber = sectionNumber;
      obj.question = $(fc)
        .children(".form-header")
        .children(".text-box")
        .children(".question-section")
        .children("textarea")
        .val();

      // type
      obj.type = $(fc)
        .children(".form-header")
        .children(".select-box")
        .children("select")
        .val();

      //image
      // const image;
      $(fc)
        .children(".form-header")
        .children(".text-box")
        .children(".question-section")
        .children(".question-image")
        .children("input")
        .each(function () {
          obj.file = $(this)[0].files[0];
        });

      if (obj.file) {
        imgArr.push(obj.file);
        obj.filename = obj.file.name;
        console.log(obj.file.name);
      }
      //mcq values
      var ans1 = [];
      $(fc)
        .children(".input")
        .children(".mcq-option")
        .children(".mcqs")
        .children(".option")
        .map((index, val) => {
          var obje2 = {};
          obje2.radioCheck = $(val)
            .children('input[type="radio"]')
            .is(":checked");
          obje2.radioVal = $(val).children('input[type="text"]').val();
          ans1.push(obje2);
        });
      obj.mcq = ans1;
      obj.short = $(fc)
        .children(".input")
        .children(".short-option")
        .children('input[type="text"]')
        .val();

      obj.para = $(fc)
        .children(".input")
        .children(".para-option")
        .children("textarea")
        .val();

      $(fc).children(".input-title");

      if ($(fc).children(".input-video").children("input[type='text']").val()) {
        $(".modal-video")
          .children('input[type="file"]')
          .each(function () {
            obj.videoFileUpload = $(this)[0].files[0];
            obj.videoText = $(fc)
              .children(".input-video")
              .children("input[type='text']")
              .val();
          });
      }
      if (obj.videoFileUpload) {
        imgArr.push(obj.videoFileUpload);
      }

      $(fc)
        .children(".input")
        .children(".file-upload")
        .children(".file-select")
        .children('input[type="file"]')
        .each(function () {
          obj.fileUploadOption = $(this)[0].files[0];
        });
      if (obj.fileUploadOption) {
        imgArr.push(obj.fileUploadOption);
        obj.fileUploadOptionname = obj.fileUploadOption.name;
        console.log(obj.fileUploadOptionname);
      }

      obj.date = $(fc)
        .children(".input")
        .children(".date-option")
        .children('input[type="date"]')
        .val();

      obj.time = $(fc)
        .children(".input")
        .children(".time-option")
        .children('input[type="time"]')
        .val();
      obj.required = $(fc)
        .children(".bottom-section")
        .children(".first")
        .children('input[type="checkbox"]')
        .is(":checked");

      var checkBox = [];
      $(fc)
        .children(".input")
        .children(".checkbox-option")
        .children(".check-options")
        .children(".option")
        .map((index, val) => {
          var object1 = {};
          object1.checkBox = $(val)
            .children('input[type="checkbox"]')
            .is(":checked");
          object1.checkBoxVal = $(val).children('input[type="text"]').val();
          checkBox.push(object1);
        });
      obj.checkB = checkBox;
      if ($(fc).hasClass("new-section")) {
        obj.sectionTitle = $(fc)
          .children(".section-title")
          .children("input[type='text']")
          .val();
        obj.titleDescription = $(fc)
          .children(".section-description")
          .children("textarea")
          .val();
      }

      arr.push(obj);
      // console.log(arr);
      // question - image;
      $(fc).addClass(`section-${sectionNumber}`);
    }
  });
  mainArr = arr;
  files = imgArr;

  console.log(data);
  console.log(mainArr);
  console.log(files);
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
  //
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
  //
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
  $(document).on("click", ".publish", function () {
    publish();
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
    setSectionNumber();
    console.log(mainArr);
    console.log(files);
    var ind = 0;
    var data1 = new FormData();
    for (var file of files) {
      console.log(file);
      data1.append("formData", file);
    }
    // for (var obj of mainArr) {
    //   data1.append(`${ind}form`, obj);
    //   ind = ind + 1;
    // }
    // test = data;
    // console.log(JSON.stringify(test.getAll("formData")));
    // formData.append("file", files);
    // console.log(formData);
    try {
      if (files.length > 0) {
        const config = {
          method: "POST",
          url: `/generation/${data}`,
          headers: { "Content-Type": "multipart/form-data" },
          data: data1,
        };
        const response = await axios(config);
        console.log(response.data.message);
        if (response) {
          const config1 = {
            method: "POST",
            url: `/dataUpload/${data}`,
            data: mainArr,
          };
          const response1 = await axios(config1);
        }
      } else {
        const config1 = {
          method: "POST",
          url: `/dataUpload/${data}`,
          data: mainArr,
        };
        const response1 = await axios(config1);
      }
    } catch (err) {
      console.log(err);
    }
  };
});
