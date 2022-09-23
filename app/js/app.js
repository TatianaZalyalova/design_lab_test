$(document).ready(function () {
  /*плавный переход по якорю*/
  $(".navigation .navigation__link").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top + "px",
      },
      {
        duration: 500,
        easing: "swing",
      }
    );
    return false;
  });
  /*ввод только цифр*/
  $(".form__input--number").on("change keyup input click", function () {
    if (this.value.match(/[^0-9]/g)) {
      this.value = this.value.replace(/[^0-9]/g, "");
    }
  });
  /* range*/
  $(".form__range").slider({
    min: 10,
    max: 40,
    value: 20,
    range: "min",
    animate: "fast",
    step: 10,
    slide: function (event, ui) {
      $("#form__price").val(ui.value + " 000 000 ₽");
    },
  });
  const opt = $(".form__range").data().uiSlider.options,
    min = opt.min,
    max = opt.max,
    raz = opt.max - min,
    step = opt.step;
  $("#form__price").val(opt.value + " 000 000 ₽");
  let iterationСounter = 0;
  for (var i = min; i <= max; i += step) {
    let leftValue = (iterationСounter / raz) * 100 * step - 4;
    let pointValue = i;
    if (i === min) {
      leftValue = (iterationСounter / raz) * 100 * step;
    } else if (i === max) {
      pointValue = i + "+";
    }
    $(".form__range").append(
      $("<b>" + pointValue + "</b>").css("left", leftValue + "%")
    );
    iterationСounter++;
  }
  /* input c + и -*/
  $(".quantity_inner .bt_minus").on("click", (event) => {
    event.preventDefault();
    const target = event.target;
    let $input = $(target).parent().find(".quantity");
    let count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count + " м²");
  });

  $(".quantity_inner .bt_plus").on("click", (event) => {
    event.preventDefault();
    const target = event.target;
    let $input = $(target).parent().find(".quantity");
    let count = parseInt($input.val()) + 1;
    count =
      count > parseInt($input.data("max-count"))
        ? parseInt($input.data("max-count"))
        : count;
    $input.val(parseInt(count) + " м²");
  });

  $(".quantity_inner .quantity").bind("change keyup input click", function () {
    if (this.value == "") {
      this.value = 1 + "м²";
    }
    if (this.value > parseInt($(this).data("max-count"))) {
      this.value = parseInt($(this).data("max-count"));
    }
  });
  /*чекбокс*/
  $("#whitebox").on("change", function () {
    $checkboxLabel = $(this).prop("checked") ? "Вайтбокс" : "Нет";
    $(".form__input-wrap--trim .form__checkbox-text").html($checkboxLabel);
  });
  /* табы*/
  $("ul.tabs__caption").on("click", "li:not(.active)", function () {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active")
      .closest("div.tabs")
      .find("div.tabs__content")
      .removeClass("active")
      .eq($(this).index())
      .addClass("active");
    $(".slide").slick("slickSetOption", "adaptiveHeight", true, true);
  });

  $(".tabs__content").slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });
});
/*закрузка файла*/
const progress = document.getElementById("progress"),
  uploaded = document.getElementById("uploaded"),
  result = document.getElementById("result"),
  maxFileSize = 1000000,
  inputFile = document.getElementById("file"),
  filesList = document.getElementById("files-list");

inputFile.addEventListener("change", function (e) {
  e.preventDefault();
  const filesObj = Array.from(this.files);

  filesObj.forEach(function (file) {
    if (file) {
      if (file.size >= maxFileSize) {
        result.innerHTML = "Слишком большой размер фото";
        return false;
      }
      const progressBar = document.createElement("progress");
      const fileRemove = document.createElement("span");
      fileRemove.classList.add("files-list__remove");
      progressBar.max = "100";
      progressBar.value = "0";
      progressBar.classList.add("progress");
      const fileName = document.createElement("p");
      fileName.innerHTML = file.name;
      const liTag = document.createElement("li");
      liTag.dataset.id = file.lastModified;
      liTag.classList.add("files-list__item");

      fileName.prepend(fileRemove);

      fileRemove.addEventListener("click", function () {
        const liTarget = this.closest(".files-list__item");
        const idLi = liTarget.dataset.id;
        const newFilesObj = filesObj.filter(
          (file) => file.lastModified !== idLi
        );
        liTarget.remove();
      });
      liTag.append(fileName);
      liTag.append(progressBar);
      filesList.append(liTag);
      upload(file, progressBar);
    }
  });

  if (file) {
    // upload(file);
  }
});

function upload(file, progressBar) {
  var ajax = new XMLHttpRequest();
  ajax.upload.onprogress = function (event) {
    uploaded.innerHTML = "Загружено " + event.loaded + " из " + event.total;
    progressBar.setAttribute("max", event.total);
    progressBar.value = event.loaded;
  };
}

const phoneInput = document.getElementById("phone");
const phoneMask = new Inputmask("+7 999 999-99-99");
phoneMask.mask(phoneInput);

const emailRegexp =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const phoneRegexp = /^\+7 \d{3} \d{3}(-\d{2}){2}$/iu;
const inputEmail = document.getElementById("mail");
const inputPhone = document.getElementById("phone");

function isEmailValid(value, regexp) {
  return regexp.test(value);
}

function onInput(input, regexp) {
  const inputWrap = input.closest(".form__input-wrap");
  if (isEmailValid(input.value, regexp)) {
    inputWrap.classList.add("correctly");
    inputWrap.classList.remove("error");
  } else {
    inputWrap.classList.remove("correctly");
    inputWrap.classList.add("error");
  }
}

inputEmail.addEventListener(
  "input",
  onInput.bind(null, inputEmail, emailRegexp)
);
inputPhone.addEventListener(
  "input",
  onInput.bind(null, inputPhone, phoneRegexp)
);

$("#comfort").select2({
  minimumResultsForSearch: -1,
  dropdownParent: $(".form__input-wrap--comfort"),
});

$(document).on("select2:open", "select", function () {
  $(".form__input-wrap--comfort .select2-results").mCustomScrollbar({
    contentTouchScroll: 1,
  });
});

const passwordControl = document.querySelector(".password-control");

passwordControl.addEventListener("click", function (event) {
  event.preventDefault();
  const target = event.target;
  var input = document.getElementById("password");
  if (input.getAttribute("type") == "password") {
    target.classList.add("view");
    input.setAttribute("type", "text");
  } else {
    target.classList.remove("view");
    input.setAttribute("type", "password");
  }
});

const wishesInput = document.getElementById("wishes");

wishesInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    const wishesInputWrapper = document.querySelector(
      ".form__input-wrap--wishes"
    );
    const tagWishes = document.createElement("div");
    const tagClose = document.createElement("span");
    tagClose.classList.add("form__tagwishes-delete");
    tagWishes.classList.add("form__tagwishes");
    tagWishes.innerHTML = this.value;
    tagWishes.appendChild(tagClose);
    tagClose.addEventListener("click", function () {
      this.closest(".form__tagwishes").remove();
    });
    wishesInputWrapper.appendChild(tagWishes);
    this.value = "";
  }
});
