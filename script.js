$(document).ready(function () {
  const addQuestionList = $(".addQuestionList");
  const addQuestionGrid = $(".addQuestionGrid");
  const formContainer = $(".form-content");
  addQuestionList.click(function () {
    formContainer.append(`
        <div class="form-container w-100">
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
                <textarea placeholder="Enter question"></textarea>
                <i class="fas fa-photo-video textarea-icon"></i>
            </div>
            </div>
            <div class="input">
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
    `);
  });
  addQuestionGrid.click(function () {
    formContainer.append(`
        <div class="form-container w-50">
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
                <textarea placeholder="Enter question"></textarea>
                <i class="fas fa-photo-video textarea-icon"></i>
            </div>
            </div>
            <div class="input">
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
    `);
  });

  // delete question
  $(document).on("click", ".deleteQuestion", function () {
    $(this).parents()[2].remove();
  });

  // copy question
  $(document).on("click", ".copyQuestion", function () {
    $(this).parents(".form-container").clone().insertAfter($(this).parents(".form-container"));
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
  // add option
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
  // delete option
  $(document).on("click", ".deleteOption", function () {
    if ($(this).parent().parent()[0].children.length >= 3) {
      const height = parseInt($(".form-container").css("height"));
      $(".form-container").css("height", `${height - 45}px`);
    }
    $(this).parent().remove();
  });
});
