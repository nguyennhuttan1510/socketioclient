document.addEventListener(
  "DOMContentLoaded",
  function () {
    const login = document.querySelectorAll(".login button");
    const formlogin = document.getElementsByClassName("login");
    const formhome = document.getElementsByClassName("home");
    console.log(formlogin[0]);
    // login[0].addEventListener("click", () => {
    //   formlogin[0].classList.remove("show");
    //   formlogin[0].classList.add("hiden");
    //   formhome[0].classList.remove("hiden");
    //   formhome[0].classList.add("show");
    // });
    function eff() {
      formlogin[0].classList.remove("show");
      formlogin[0].classList.add("hiden");
      formhome[0].classList.remove("hiden");
      formhome[0].classList.add("show");
    }
  },
  false
);
