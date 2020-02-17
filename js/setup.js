'use strict';
// coздвет константы с данными масива
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_MANTLE_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

// переменные
var setup = document.querySelector('.setup');
var similarCharacters = document.querySelector('.setup-similar');
var wizardsNode = document.querySelector('.setup-similar-list');

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

var setupPlayer = document.querySelector('.setup-player');
var setupWizard = setupPlayer.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var coatInput = setupPlayer.querySelector('input[name="coat-color"]');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var eyesInput = setupPlayer.querySelector('input[name="eyes-color"]');
var wizardFireball = setupPlayer.querySelector('.setup-fireball-wrap');
var fireballInput = setupPlayer.querySelector('input[name="fireball-color"]');


// шаблон, который будем копировать
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// удаляет класс, скрывающий окно
setup.classList.remove('hidden');

// функция рандомное число
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
// функция рандомно выбирающая эл-т из массива
var getRandomArrayElem = function (list) {
  return list[getRandomNumber(0, list.length - 1)];
};
// функция возвращает массив из 4 объектов
var createWizardsList = function (numberWizards) {
  var wizardsList = [];
  // создает массив с элементами
  for (var i = 0; i < numberWizards; i++) {
    wizardsList.push({
      name: getRandomArrayElem(WIZARD_NAMES) + ' ' + getRandomArrayElem(WIZARD_LAST_NAMES),
      coatColor: getRandomArrayElem(WIZARD_MANTLE_COLORS),
      eyesColor: getRandomArrayElem(WIZARD_EYE_COLORS)
    }); // добавляет элемент в конец массива
  }
  return wizardsList;
};
// функция клонирует template и добавляет новые данные из массива
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};
// функция рендерит список волшебников
var renderWizards = function () {
  var wizardsList = createWizardsList(4);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsList.length; i++) {
    fragment.appendChild(renderWizard(wizardsList[i]));
  }
  wizardsNode.appendChild(fragment);
};
renderWizards();

// удаляет класс, скрывающий окно c похожими персонажами
similarCharacters.classList.remove('hidden');


// Открытие/закрытие окна настройки персонажа
var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

// сообщение об ошибке
var inputInvalidHandler = function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-х символов');
  } else if (target.value.length > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Имя не должно превышать ' + MAX_NAME_LENGTH + '-ти символов');
  } else {
    userNameInput.setCustomValidity('');
  }
};
userNameInput.addEventListener('invalid', inputInvalidHandler);

// изменение цвета
wizardCoat.addEventListener('click', function () {
  var color = getRandomArrayElem(WIZARD_MANTLE_COLORS);
  wizardCoat.style.fill = color;
  coatInput.value = color;
});

wizardEyes.addEventListener('click', function () {
  var color = getRandomArrayElem(WIZARD_EYE_COLORS);
  wizardEyes.style.fill = color;
  eyesInput.value = color;
});

wizardFireball.addEventListener('click', function () {
  var color = getRandomArrayElem(WIZARDS_FIREBALL_COLORS);
  wizardFireball.style.background = color;
  fireballInput.value = color;
});


