/**
 * Clean print/PDF: clears page title so browser header shows less text.
 * Pair with @page { margin: 0 } in resume.css and disable "Headers and footers" in print dialog.
 */
(function () {
  let savedTitle = document.title;

  function preparePrint() {
    savedTitle = document.title;
    document.title = " ";
  }

  function restorePrint() {
    if (savedTitle) {
      document.title = savedTitle;
    }
  }

  window.addEventListener("beforeprint", preparePrint);
  window.addEventListener("afterprint", restorePrint);

  window.printResume = function () {
    preparePrint();
    window.print();
    setTimeout(restorePrint, 1500);
  };
})();
