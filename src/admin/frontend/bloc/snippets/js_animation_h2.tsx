function JSanimationH2(selector: any, disappear_selector: string) {
  const all = document.querySelectorAll(selector);

  window.addEventListener("scroll", function () {
    all !== undefined &&
      all.forEach((data) => {
        if (data.offsetTop - 150 >= window.scrollY) {
          data.classList.remove(disappear_selector);
        } else {
          data.classList.add(disappear_selector);
        }
      });
  });
}

export default JSanimationH2;
