document.addEventListener('DOMContentLoaded', function (event) {
  const enterName = document.querySelector('#js-enter-name')
  const previewBtn = document.querySelector('#js-preview-btn')
  const blankNameError = document.querySelector('#js-name-blank-error')
  const invalidNameError = document.querySelector('#js-name-invalid-error')

  function addError (elem) {
    elem.classList.add('c-input--error')
  }

  function resetError () {
    blankNameError.classList.add('u-hide')
    invalidNameError.classList.add('u-hide')
    enterName.classList.remove('c-input--error')
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
})
