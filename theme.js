
class Cookie {
  set(name, value, daysToLive) {
    let cookie = name + "=" + encodeURIComponent(value);
    if (typeof daysToLive === "number") {
      cookie += "; max-age=" + daysToLive * 24 * 60 * 60;
      document.cookie = cookie;
    }
  }
  get(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }
  check(name) {
    let cookieName = this.get(name);
    if (cookieName != null) {
      return true;
    } else {
      return false;
    }
  }
  delete(name) {
    document.cookie = `${name}=; max-age=0`;
  }
}
class Theme extends Cookie {
  createDefaultToggleBtn(top, left) {
    let btn = document.createElement("span");
    btn.classList.add("theme-toggle-btn");
    btn.setAttribute("data-themechoice", "dark");
    btn.setAttribute("style", `top:${top};left:${left};`);
    document.body.appendChild(btn);
    if (!theme.check("animate")) {
      btn.classList.add("theme-toggle-btn-animate");
    }
    setTimeout(function () {
      btn.classList.remove("theme-toggle-btn-animate");
      theme.set("animate", "1", 30);
    }, 5000);
  }
  addDarkClasses(allLightTheme, lightTheme) {
    let style = document.createElement("style");
    if (this.check("theme") && this.get("theme") == "dark") {
      style.textContent = `
      :root {
      --dark-body-background: #1a202c;
      --colors-omegaDarker: #2d3748;
      --colors-mute: #e2e8f0;
      --colors-omegaLighter: #edf2f7;
      --colors-beta: #9f7aea;
      }
    .dark-bg {
      background: var(--dark-body-background); 
      transition:all 500ms ease-in-out; 
    }
    .dark-box {
      box-shadow: rgba(1, 1, 1, 0.1) 1px 1px 5px 0px;
      border-radius: 10px;
      padding: 10px;
      background: var(--colors-omegaDarker);
      transition:all 500ms ease-in-out;
    }
    .dark-header-footer {
      background: var(--colors-omegaDarker) !important;
    }
    .dark-heading {
      color: var(--colors-omegaLighter);
    }
    .dark-text,.dark-link {
      color: var(--colors-mute) !important;
    }
    .dark-link:hover{
       color:var(--colors-beta) !important;
    }
    `;
      allLightTheme.forEach(function (one) {
        one.classList.remove(one.dataset.type);
      });
    } else if (this.check("theme") && this.get("theme") != "dark") {
      document.head.lastChild.textContent = "";
      allLightTheme.forEach(function (one) {
        one.classList.remove(one.dataset.type);
      });
    } else {
      style.textContent = `
      :root {
        --colors-background: #f8f8f8;
        --colors-white: #fff;
        --colors-text: #718096;
        --colors-heading: #2d3748;
        --colors-betaDark: #805ad5;
      }
      .bg{
        background: var(--colors-background);
        transition:all 500ms ease-in-out;
      }
      .box {
        box-shadow: rgba(1, 1, 1, 0.1) 1px 1px 5px 0px;
        border-radius: 10px;
        padding: 10px;
        background: var(--colors-white);
        transition:all 500ms ease-in-out;
      }
      .header-footer {
        background: var(--colors-white);
      }
      .heading {
        color: var(--colors-heading);
      }
      .text,.link {
        color: var(--colors-text);
      }
      .link:hover{
        color:var(--colors-betaDark);
      }
      `;
      if (lightTheme == true) {
        allLightTheme.forEach(function (one) {
          one.classList.add(one.dataset.type);
        });
      }
    }
    style.textContent += `     
     .theme-toggle-btn {
      border: 0;
      outline: 0;
      cursor: pointer;
      width: 48px;
      height: 20px;
      border-radius: 38px;
      position: fixed;
      z-index: 99999;
      background: linear-gradient(45deg, #fff, #ff9933);
    }  
    .theme-toggle-btn::before {
      content: "";
      position: absolute;
      width: 23px;
      height: 23px;
      border-radius: 50%;
      background: #fff;
      top: -9%;
      left: -1%;
      z-index: 999999;
      transition: 0.5s;
      box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, 0.07);
    }
    .theme-toggle-btn.active::before  {
      left: 57%;
      transition: 0.5s;
      background:#fff;
      top: -8%;
      box-shadow: 2px 1px 2px 1px rgba(0, 0, 0, 0.1);
    }
    .theme-toggle-btn.active{
      background:linear-gradient(45deg,#ff9933, #fff);
    }
    .theme-toggle-btn-animate {
      animation: animate 0.82s cubic-bezier(.36, .07, .19, .97) both infinite;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }
    @keyframes animate {
      10%,
      90% {
        transform: translate3d(-1px, 0, 0);
      }
      20%,
      80% {
        transform: translate3d(2px, 0, 0);
      }
      30%,
      50%,
      70% {
        transform: translate3d(-4px, 0, 0);
      }
      40%,
      60% {
        transform: translate3d(4px, 0, 0);
      }
    }`;
    document.head.appendChild(style);
  }
  toDark(allLightTheme) {
    let themeChoice = this.get("theme");
    allLightTheme.forEach((l) => {
      let theme = l.dataset.type;
      theme = `dark-${theme}`;
      let updatedThemeClass = theme.replace("dark", themeChoice);
      l.classList.add(updatedThemeClass);
    });
  }
  toLight(allLightTheme) {
    allLightTheme.forEach((l) => {
      let theme = l.dataset.type;
      theme = `dark-${theme}`;
      let selectedtheme = this.get("theme");
      if (selectedtheme == null) {
        l.classList.remove(theme);
      }
    });
  }
  handleMultipleTheme(btn, allLightTheme = null, lightTheme) {
    const themeChoice = btn.dataset.themechoice;
    allLightTheme.forEach((one) => {
      one.classList.remove(`dark-${one.dataset.type}`);
      if (this.check("theme")) {
        one.classList.remove(`${this.get("theme")}-${one.dataset.type}`);
      }
    });
    if (this.check("theme") && this.get("theme") == themeChoice) {
      this.delete("theme");
      this.toLight(allLightTheme);
      this.addDarkClasses(allLightTheme, lightTheme);
    } else {
      this.set("theme", themeChoice, 30);
      this.addDarkClasses(allLightTheme, lightTheme);
      this.toDark(allLightTheme);
    }
  }
  handleMultipleBtn(btns) {
    btns.forEach(function (btn) {
      const themeChoice = btn.dataset.themechoice;
      let darktitle = "";
      if (btn.dataset.darktitle) {
        darktitle = btn.dataset.darktitle;
      } else {
        darktitle = "";
      }
      if (theme.check("theme") && theme.get("theme") == themeChoice) {
        btn.classList.add("active");
        if (darktitle !== "") {
          btn.textContent = darktitle;
        }
      } else {
        btn.classList.remove("active");
      }
      btn.addEventListener("click", function () {
        btns.forEach(function (btn) {
          btn.classList.remove("active");
          if (btn.dataset.title && btn.dataset.title !== "") {
            btn.textContent = btn.dataset.title;
          }
        });
        if (theme.check("theme") && theme.get("theme") == themeChoice) {
          btn.classList.add("active");
          if (darktitle !== "") {
            btn.textContent = darktitle;
          }
        } else {
          btn.classList.remove("active");
        }
      });
    });
  }
  init(btns = null, allLightTheme = null, lightTheme) {
    this.addDarkClasses(allLightTheme, lightTheme);
    this.handleMultipleBtn(btns);
    if (allLightTheme != null) {
      if (this.check("theme")) {
        this.toDark(allLightTheme);
      } else {
        this.toLight(allLightTheme);
      }
    }
  }
  manageOptions(options) {
    options = {
      btnHide: options.btnHide || false,
      lightTheme: options.lightTheme || false,
      top: options.top || "5%",
      left: options.left || "83%",
    };

    return options;
  }
  start(options = {}) {
    let { btnHide, left, top, lightTheme } = theme.manageOptions(options);
    if (btnHide == false) {
      theme.createDefaultToggleBtn(top, left);
    }
    let btns = document.querySelectorAll("[data-themechoice]");
    let allLightTheme = document.querySelectorAll("[data-type]");
    addEventListener("load", function () {
      theme.init(btns, allLightTheme, lightTheme);
    });
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        theme.handleMultipleTheme(this, allLightTheme, lightTheme);
      });
    });
  }
}
// exporting object of Theme class
let theme = new Theme();
let start = theme.start;
export { start as default };

