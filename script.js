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
$(document).ready(function () {
  const addQuestionList = $(".addQuestionList");
  const addQuestionGrid = $(".addQuestionGrid");
  const formContainer = $(".form-content");
  const formContainerHeight = formContainer.css("height");
  handleLayout();

  $("#type").val("mcq");
  const grid = `
  <div class="form-container w-50 grid">
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
<div class="form-container w-100 list">
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

  addQuestionList.click(function () {
    formContainer.append(list);
    handleLayout();
  });
  addQuestionGrid.click(function () {
    formContainer.append(grid);
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
  //file upload handling
  // for (let i = 0; i < $(".chooseFile").length; i++) {
  //   const el = $(".chooseFile")[i];
  //   $(el).on("change", function () {
  //     const filename = $(el).val();
  //     console.log(filename);
  //     if (/^\s*$/.test(filename)) {
  //       $(".noFile").text("No file chosen...");
  //     } else {
  //       $($(el).siblings()[1]).text(filename.replace("C:\\fakepath\\", ""));
  //     }
  //   });
  // }
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
        <input type="file" name="chooseFile" class="chooseFile" />
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
});
