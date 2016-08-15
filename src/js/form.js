'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var nameField = document.querySelector('#review-name');
  var nameFieldCorrect = false;
  var textField = document.querySelector('#review-text');
  var textFieldCorrect = false;
  var stars = document.querySelector('.review-form-group-mark input:checked').value;
  var starLabels = document.querySelectorAll('.review-form-group-mark .review-mark-label')
  var reviewName = document.querySelector('.review-fields-name');
  var reviewText = document.querySelector('.review-fields-text');
  var reviewFields = document.querySelector('.review-fields');
  var submitBtn = document.querySelector('.review-submit');

  /**
  * Проверяем если поле с именем и текстом комментария заполненно правильно
  * Если поля заполненны правильно, делаем кнопку отправки формы активной
  */
  var checkReviewFields = function() {
    if (nameFieldCorrect && textFieldCorrect) {
      reviewFields.style.display = 'none';
      submitBtn.removeAttribute('disabled');
    } else {
      reviewFields.style.display = '';
      submitBtn.setAttribute('disabled', '');
    }
  };

  /**
  *
  * Проверяем если пользователь поставил меньше 3 звезд,
  * то поле для комментария делаем обязательным
  * Так же прячем или показываем ссылку на поле в самом низу формы
  */
  var checkTextFieldRequire = function() {
    if (stars < 3) {
      reviewText.style.display = '';
      textFieldCorrect = false;
    } else {
      reviewText.style.display = 'none';
      textFieldCorrect = true;
    }
  };

  nameField.setAttribute('required', '');
  nameField.addEventListener('keyup', function() {
    if (this.value.length >= 3) {
      reviewName.style.display = 'none';
      nameFieldCorrect = true;
    } else {
      reviewName.style.display = '';
      nameFieldCorrect = false;
    }

    checkReviewFields();
  });

  textField.addEventListener('keyup', function() {
    if (this.value.length >= 3) {
      reviewText.style.display = 'none';
      textFieldCorrect = true
    } else {
      reviewText.style.display = '';
      textFieldCorrect = false;
    }

    checkReviewFields();
  });

  for (var i = 0; i < starLabels.length; i++) {
    starLabels[i].addEventListener('click', function () {
      setTimeout(function () {
        stars = document.querySelector('.review-form-group-mark input:checked').value;

        checkTextFieldRequire();
        checkReviewFields();
      }, 0);
    });
  }


  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
      checkTextFieldRequire();
      checkReviewFields();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
