document.addEventListener('DOMContentLoaded', function (event) {
  const enterName = document.querySelector('#js-enter-name')

  enterName.addEventListener('blur', function (e) {
    const target = e.currentTarget

    if (typeof target.value === 'number') {
      console.log('wrong')
    }
    console.log('right')

  })
})
