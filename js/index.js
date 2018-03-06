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
  const bookOnboarding = document.querySelector('#js-book-onboarding')
  const flipbook = document.querySelector('#js-flipbook')
  const pageWrapper = document.querySelectorAll('.page-wrapper')

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

  [...previewLetterSwitchIcon].forEach(function(elem) {
    elem.addEventListener('mousedown', function (e) {
      let target_parent = e.currentTarget.closest('.js-preview-letter-cont')
      target_parent.querySelector('.js-preview-letter-switch ').classList.remove('bk-letter-switch--active')
      target_parent.querySelector('.js-preview-letter-dropdown ').classList.add('bk-letter-dropdown--active')
    })
  });

  const flipbookElem = $('#js-flipbook')
  flipbookElem.ready(function () {
    loaderContainer.classList.remove('bk-loader-cont--show')

    flipbook.addEventListener('click', function(e){
      console.log(e.target);
      if ( e.target.className === 'page-wrapper') {
        // console.log('currentTarget: ', e.currentTarget)
        // console.log('target: ', e.target)
        // console.log('currentPage: ', e.currentTarget.attributes.page.value)
        e.stopPropagation()
        const currentViewArr = flipbookElem.turn('view')

        if (e.target.attributes.page.value !== 0) {
          const pageSide = currentViewArr.indexOf(parseInt(e.target.attributes.page.value))
          switch (pageSide) {
            case 0:
              flipbookElem.turn('previous')
              break;
            case 1:
              flipbookElem.turn('next')
              break;
            default:
              break;
          }
        }
        console.log('turned: ', flipbookElem.turn('view'))
      }
    })

    $(`.page-wrapper`).click(e => {
      // console.log('currentTarget: ', e.currentTarget)
      // console.log('target: ', e.target)
      // console.log('currentPage: ', e.currentTarget.attributes.page.value)

      // const currentViewArr = flipbookElem.turn('view')

      // if (e.currentTarget.attributes.page.value !== 0) {
      //   const pageSide = currentViewArr.indexOf(parseInt(e.currentTarget.attributes.page.value))
      //   // console.log(pageSide)
      //   switch (pageSide) {
      //     case 0:
      //       flipbookElem.turn('previous')
      //       break;
      //     case 1:
      //       flipbookElem.turn('next')
      //       break;
      //     default:
      //       break;
      //   }
      // }
      // console.log('turned: ', flipbookElem.turn('view'))
    })
  })
  .turn({
    autoCenter: true,
    gradients: true
  })
  .bind('turned', function(event, page, view) {
    bookOnboarding.classList.remove('bk-preview__tap-cont--show')
  })
})

