$(function () {
  function screenParameter() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    $('.display-parametr').text(`${width}  ${height}`);
  }

  screenParameter()
  window.addEventListener('resize', (e) => {
    screenParameter()
  });

});

