// Vendors

import "css/normalize.css";
import Inputmask from "inputmask";
import SimpleBar from "simplebar";
import 'simplebar/dist/simplebar.css';
import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

// Project

import "css/style.scss";

const _$ = (q, elm) => (elm ? elm : document).querySelector(q);
const _$$ = (q, elm) => (elm ? elm : document).querySelectorAll(q);

/* Hamburger menu */

_$(".m-header__burger").addEventListener("click", (evt) => {
  _$(".m-header__box").classList.add("m-header__box_trans");
  _$(".m-header__box").classList.add("open");
  document.body.style.overflow = 'hidden';
});

_$(".m-header__burger-close").addEventListener("click", (evt) => {
  _$(".m-header__box").classList.remove("open");
  _$(".m-header__box").scrollTop = 0;
  document.body.style.overflow = '';
});

document.addEventListener("click", (evt) => {
  if (
    _$(".m-header__box").classList.contains("open") &&
    !_$(".m-header__box").contains(evt.target) &&
    !_$(".m-header__burger").contains(evt.target)
  ) {
    _$(".m-header__box").classList.remove("open");
    document.body.style.overflow = '';
  }
});

const ham_res = getComputedStyle(document.documentElement).getPropertyValue(
  "--ham-res"
);
const ham_mql = window.matchMedia(`(max-width: ${ham_res}px)`);

ham_mql.addEventListener("change", (evt) => {
  _$(".m-header__box").classList.remove("m-header__box_trans");
  _$(".m-header__box").classList.remove("open");
  _$(".m-header__box").scrollTop = 0;
  document.body.style.overflow = '';
});

/* Drop Search */
function init_dropsearch(drop, list_cb, cb) {
  const simpleBar = new SimpleBar(_$(".dropsearch__list ul", drop));

  _$("input", drop).addEventListener("focus", (evt) => {
    update_list();
    _$(".dropsearch__list", drop).style.display = "block";
    _$(".dropsearch__list", drop).offsetHeight;
    drop.classList.add("drop_open");
    _$("input", drop).select();
  });

  _$("ul", drop).addEventListener("transitionend", (evt) => {
    if (!drop.classList.contains("drop_open"))
      _$(".dropsearch__list", drop).style.display = "none";
  });

  document.addEventListener("click", (evt) => {
    if (
      drop.classList.contains("drop_open") &&
      ((!_$(".dropsearch__field", drop).contains(evt.target) &&
        !_$(".dropsearch__list", drop).contains(evt.target)) ||
        _$(".dropsearch__icon", drop) == evt.target)
    ) {
      drop.classList.remove("drop_open");
      evt.preventDefault();
    }
  });

  function item_click(evt) {
    const item = evt.currentTarget;
    _$("input", drop).value = item.getAttribute("data-label");
    //    _$('.drop__clear', drop).style.visibility = 'inherit';
    drop.classList.remove("drop_open");
    cb(item.getAttribute("data-value"));
  }

  _$(".dropsearch__clear", drop).addEventListener("click", (evt) => {
    _$("input", drop).value = "";
    _$("input", drop).focus();
    update_list();
  });

  _$("input", drop).addEventListener("keyup", update_list);

  async function update_list() {
    const text = _$("input", drop).value.trim();
    const list = await list_cb(text);
    const cont = simpleBar.getContentElement();
    cont.innerHTML = "";
    list.forEach((el) => {
      if (el.label.toLowerCase().startsWith(text.toLowerCase())) {
        const li = document.createElement("li");
        li.className = "dropsearch__item";
        li.setAttribute("data-value", el.value);
        li.setAttribute("data-label", el.label);
        let t =
          '<span class="dropsearch__item_start">' +
          el.label.substr(0, text.length) +
          "</span>";
        t += el.label.substr(text.length);
        li.innerHTML = t;
        li.addEventListener("click", item_click);
        cont.appendChild(li);
      }
    });
    if (cont.innerHTML == "") {
      const p = document.createElement("p");
      p.className = "dropsearch__empty";
      cont.appendChild(p);
    }
    //    _$('.drop__clear', drop).style.visibility = text.length > 0 ? 'inherit' : '';
  }
}
/* Drop */
function init_drop(drop) {
  _$("button", drop).addEventListener("click", (evt) => {
    if (!drop.classList.contains("drop_open")) {
      _$(".drop__box", drop).style.display = "inherit";
      _$(".drop__box", drop).offsetHeight;
      drop.classList.add("drop_open");
      evt.openning = true;
      // evt.stopPropagation();
    }
  });

  _$(".drop__inner", drop).addEventListener("transitionend", (evt) => {
    if (!drop.classList.contains("drop_open"))
      _$(".drop__box", drop).style.display = "none";
  });

  document.addEventListener("click", (evt) => {
    if (
      drop.classList.contains("drop_open") &&
      (!drop.contains(evt.target) ||
        (_$(".drop__icon", drop) == evt.target && !evt.openning))
    ) {
      drop.classList.remove("drop_open");
      // evt.preventDefault();
    }
  });
}

/* Обработка фильтров */
let city = null;
let district = null;

init_dropsearch(
  _$(".m-filter__city"),
  async (text) => {
    const resp = await fetch("data/cities.json?c=" + encodeURIComponent(text));
    return await resp.json();
  },
  (c) => {
    city = c;
    console.log("Выбран город ", city);
  }
);

init_dropsearch(
  _$(".m-filter__distr"),
  async (text) => {
    const resp = await fetch(
      "data/districts.json?c=" +
        encodeURIComponent(city) +
        "&d=" +
        encodeURIComponent(text)
    );
    return await resp.json();
  },
  (d) => {
    district = d;
    console.log("Выбран район ", district);
  }
);

init_drop(_$(".m-filter__rooms"));

_$(".m-filter__rooms").addEventListener("change", (evt) => {
  if (evt.target.value == "studio") console.log("Студия", evt.target.checked);
  else console.log("Комнат", evt.target.value);
});

_$(".m-filter__type-grp").addEventListener("change", (evt) => {
  console.log("Тип недвижимости", evt.target.value);
});

init_drop(_$(".m-filter__price"));

/* Input */
const imask = Inputmask({
  alias: "integer",
  min: 0,
  allowMinus: false,
  showMaskOnHover: true,
  rightAlign: false,
  numericInput: true,
});
imask.mask(_$(".m-filter__price input[name=price-from]"));
imask.mask(_$(".m-filter__price input[name=price-to]"));

init_drop(_$(".m-filter__area"));
imask.mask(_$(".m-filter__area input[name=area-from]"));
imask.mask(_$(".m-filter__area input[name=area-to]"));

function change_dropsearch_placeholder() {
  let ph = _$(".m-filter__city input").getAttribute(
    ham_mql.matches ? "data-ph-mobile" : "data-ph"
  );
  _$(".m-filter__city input").setAttribute("placeholder", ph);
  ph = _$(".m-filter__distr input").getAttribute(
    ham_mql.matches ? "data-ph-mobile" : "data-ph"
  );
  _$(".m-filter__distr input").setAttribute("placeholder", ph);
}
change_dropsearch_placeholder();

/* Mobile filters */

_$(".m-filter__mobile-search").addEventListener("click", (evt) => {
  _$(".m-filter__group").classList.add("m-filter__group_trans");
  _$(".m-filter__group").classList.add("open");
  document.body.style.overflow = 'hidden';
});

_$(".m-filter__mobile-close").addEventListener("click", (evt) => {
  _$(".m-filter__group").classList.remove("open");
  _$(".m-filter__group").scrollTop = 0;
  document.body.style.overflow = '';
});

document.addEventListener("click", (evt) => {
  if (
    _$(".m-filter__group").classList.contains('open') &&
    !_$(".m-filter__group").contains(evt.target) &&
    !_$(".m-filter__mobile-search").contains(evt.target)
  ) {
    _$(".m-filter__group").classList.remove("open");
    document.body.style.overflow = '';
  }
});

ham_mql.addEventListener("change", (evt) => {
  _$(".m-filter__group").classList.remove("m-filter__group_trans");
  _$(".m-filter__group").classList.remove("open");
  _$(".m-filter__group").scrollTop = 0;
  document.body.style.overflow = '';
  change_dropsearch_placeholder();
});

/* Popular */
const swiper = new Swiper(".m-popular__swiper", {
  loop: true,
  slidesPerView: 1.1,
  spaceBetween: 8,
  breakpoints: {
    [ham_res]: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1100: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
  },
  centeredSlides: true,

  modules: [Navigation, Pagination],

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/* Services */
let serv_ac = null;
function update_accord() {
  if(ham_mql.matches) {
    if(!serv_ac)
      serv_ac = new Accordion(".m-serv__accord", {});
    else {
      serv_ac.attachEvents();
      serv_ac.closeAll();
    }
  } else {
    if(serv_ac) {
      serv_ac.detachEvents();
      serv_ac.openAll();
    }
  }
}
update_accord();
ham_mql.addEventListener('change', update_accord);

/* Consult */
const tel_mask = Inputmask({
  mask: "+7 999 999 99 99",
  showMaskOnHover: true,
});
tel_mask.mask(_$(".m-consult__tel"));
