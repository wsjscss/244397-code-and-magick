'use strict';
var browserCookies = require('browser-cookies');

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formMain = document.querySelector('.review-form');
  var nameField = document.querySelector('#review-name');
  var nameFieldCorrect = false;
  var textField = document.querySelector('#review-text');
  var textFieldCorrect = false;
  var stars = document.querySelector('.review-form-group-mark input:checked').value;
  var starLabels = document.querySelectorAll('.review-form-group-mark .review-mark-label');
  var reviewName = document.querySelector('.review-fields-name');
  var reviewText = document.querySelector('.review-fields-text');
  var reviewFields = document.querySelector('.review-fields');
  var submitBtn = document.querySelector('.review-submit');

  /**
  * Проверяем если есть куки
  * Данные для поля Имя и клоичества звёзд берём из куки и подставляем в форму
  */
  var setDataFromCookies = function() {
    var cookiesMark = browserCookies.get('review-mark');
    var cookiesName = browserCookies.get('review-name');

    if (cookiesName) {
      nameField.value = cookiesName;
      document.querySelector('#review-mark-' + cookiesMark).checked = true;
    }
  };


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

  /**
  *
  * Проверяем если заполненно поле Имя
  * Минимальное кол-во символов - 3
   */
  var checkNameField = function() {
    setTimeout(function() {
      if (nameField.value.length >= 3) {
        reviewName.style.display = 'none';
        nameFieldCorrect = true;
      } else {
        reviewName.style.display = '';
        nameFieldCorrect = false;
      }

      checkReviewFields();
    }, 0);
  };

  nameField.setAttribute('required', '');
  nameField.addEventListener('keyup', function() {
    checkNameField();
    checkReviewFields();
  });

  /**
  *
  * Проверяем если заполненно поле Отзыв
  * Минимальное кол-во символов - 3
  */
  textField.addEventListener('keyup', function() {
    if (this.value.length >= 3) {
      reviewText.style.display = 'none';
      textFieldCorrect = true;
    } else {
      reviewText.style.display = '';
      textFieldCorrect = false;
    }

    checkReviewFields();
  });

  for (var i = 0; i < starLabels.length; i++) {
    starLabels[i].addEventListener('click', function() {
      setTimeout(function() {
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
      checkNameField();
      checkTextFieldRequire();
      setDataFromCookies();
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

  /**
  * Когда форма отправленна, сохраняем в куки значения из полей Имя + Звезды
  * В качестве срока истечения куки выставляем количество прошедших дней с
  * последнего дня рождения Грейс Хоппер (09 дек)
  */
  formMain.onsubmit = function() {

    var today = new Date();
    var birthday = new Date(today.getFullYear() + ', 12, 09');
    var cookieLife = 0;

    if (today < birthday) {
      birthday = new Date((today.getFullYear() - 1) + ', 12, 09');
      cookieLife = parseInt((today - birthday) / (1000 * 60 * 60 * 24), 10);
    }

    browserCookies.set('review-mark', stars, {expires: cookieLife});
    browserCookies.set('review-name', nameField.value, {expires: cookieLife});
  };

  return form;
})();
