/* eslint-disable */
window.addEventListener("load", () => {
  const logoElement = document.querySelector(".topbar img");
  if (logoElement) logoElement.setAttribute("src", "/assets/img/logo.svg");

  document.head.querySelectorAll("link").forEach((elem) => {
    if (elem.getAttribute("rel") == "icon") {
      elem.setAttribute("href", "/assets/img/favicon-ghibli.png");
    }
  });

  window.scrollTo({ x: 0, y: 0, scrollBehavior: "smooth" });

  document.querySelectorAll(".opblock-tag").forEach((elem) => {
    elem.click();
  });

  while (document.querySelectorAll(".opblock.is-open").length > 0) {
    document.querySelectorAll(".opblock").forEach((elem) => {
      if (elem.classList.contains("is-open")) elem.click();
    });
  }
});
