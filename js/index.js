document.addEventListener('DOMContentLoaded', function (event) {
  const enterName = document.querySelector('#js-enter-name')
  const previewBtn = document.querySelector('#js-preview-btn')
  const blankNameError = document.querySelector('#js-name-blank-error')
  const invalidNameError = document.querySelector('#js-name-invalid-error')
  const previewSteps = document.querySelectorAll('.js-preview-step')
  const previewLetters = document.querySelectorAll('.js-preview-letter-cont')
  const previewStep_1 = document.querySelector('#js-preview-step-1')
  const previewStep_2 = document.querySelector('#js-preview-step-2')
  const previewStep_3 = document.querySelector('#js-preview-step-3')
  const previewChangeName = document.querySelector('#js-preview-change-name')
  const previewOverlay = document.querySelector('#js-preview-overlay')
  const previewLetterDropdown = document.querySelectorAll('.js-preview-letter-dropdown')
  const previewLetterSwitchIcon = document.querySelectorAll('.js-letter-switch-icon')
  const previewLetterLetterSwitch = document.querySelectorAll('.js-preview-letter-switch')
  const previewLetterDedication = document.querySelector('#js-preview-dedication')
  const loaderContainer = document.querySelector('#js-loader-container')

  function addError (elem) {
    elem.classList.add('c-input--error-orange')
  }

  function resetError () {
    blankNameError.classList.add('u-hide')
    invalidNameError.classList.add('u-hide')
    enterName.classList.remove('c-input--error-orange')
  }

  function resetPreviewSteps () {
    [...previewSteps].forEach(function(elem){
      elem.classList.remove('bk-step--active');
    });
  }

  function resetPreviewLetters () {
    [...previewLetters].forEach(function(elem){
      elem.classList.remove('bk-letter-cont--active');
    });
    [...previewLetterDropdown].forEach(function(elem){
      elem.classList.remove('bk-letter-dropdown--active');
    });
  }

  function restPreviewSwitcher () {
    [...previewLetterLetterSwitch].forEach(function(elem){
      elem.classList.remove('bk-letter-switch--active');
    });
  }

  function closeChangeName () {
    previewChangeName.classList.remove('bk-change-name--active');
    previewOverlay.classList.remove('bk-overlay--active');
  }

  previewBtn.addEventListener('mousedown', function (e) {
    let target = enterName
    let targetVal = target.value
    resetError()

    console.log(e.currentTarget);

    if (targetVal === '') {
      addError(enterName)
      blankNameError.classList.remove('u-hide')
      console.log('no name')
    } else if (!/^[a-zA-Z]*$/g.test(targetVal)) {
      addError(enterName)
      invalidNameError.classList.remove('u-hide')
      console.log('Invalid')
    }
  })

  enterName.addEventListener('blur', function (e) {
    let target = e.currentTarget
    let targetVal = target.value
    resetError()

    if (!/^[a-zA-Z]*$/g.test(targetVal)) {
      addError(enterName)
      invalidNameError.classList.remove('u-hide')
      console.log('Invalid')
    }

    // console.log(targetValue)
  })

  function previewReset() {
    previewChangeName.classList.remove('bk-change-name--active');
    previewOverlay.classList.remove('bk-overlay--active');
    previewLetterDedication.classList.remove('bk-dedication--active');
  }

  previewStep_1.addEventListener('mousedown', function (e){
    previewReset()
    previewChangeName.classList.add('bk-change-name--active');
    previewOverlay.classList.add('bk-overlay--active');
  });

  previewStep_2.addEventListener('mousedown', function (e){
    previewReset()
  });

  previewStep_3.addEventListener('mousedown', function (e){
    previewReset()
    previewOverlay.classList.add('bk-overlay--active');
    previewLetterDedication.classList.add('bk-dedication--active');
  });

  [...previewSteps].forEach(function(elem){
    elem.addEventListener('mousedown', function (e){

      if (e.currentTarget.classList.contains('bk-step--active')) {
        return
      } else {
        resetPreviewSteps()
        e.currentTarget.classList.add('bk-step--active')
      }
    });
  });

  [...previewLetters].forEach(function(elem){
    elem.addEventListener('mousedown', function (e){

      let target_dropdown = e.currentTarget.querySelector('.js-preview-letter-dropdown');

      if (e.currentTarget.classList.contains('bk-letter-cont--active')) {
        return
      } else {
        restPreviewSwitcher()
        resetPreviewLetters()
        e.currentTarget.classList.add('bk-letter-cont--active')
        target_dropdown.classList.add('bk-letter-dropdown--active')
      }
    });
  });

  [...previewLetterDropdown].forEach(function(elem){
    elem.addEventListener('mousedown', function (e){
      let target_dropdown = e.currentTarget.parentNode.querySelector('.js-preview-letter-switch');
      e.currentTarget.classList.remove('bk-letter-dropdown--active')
      target_dropdown.classList.add('bk-letter-switch--active')
    });
  });

  [...previewLetterSwitchIcon].forEach(function(elem){
    elem.addEventListener('mousedown', function (e){
      let target_parent = e.currentTarget.closest('.js-preview-letter-cont');
      target_parent.querySelector('.js-preview-letter-switch ').classList.remove('bk-letter-switch--active')
      target_parent.querySelector('.js-preview-letter-dropdown ').classList.add('bk-letter-dropdown--active')
    });
  });

  $(".flipbook")
    .ready(function(){
      loaderContainer.classList.remove('bk-loader-cont--show');
      console.log("loaded")
    })
    .turn({
      autoCenter: true,
      elevation: 50,
      gradients: true
    })
    .bind("turned", function(event, page, view) {
      console.log("turned");
    });
})

