'use strict';
// удаляет класс, скрывающий окно
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
// coздвет константы с данными масива
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_MANTLE_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

// рандомное число
var random = function (min, max) {
  var rand = Math.floor(min + Math.random() * (max + 1 - min));
  return rand;
};
// функция рандомно выбирающая эл-т из массива
var getRandomArrayElem = function (list) {
  var index = random(0, list.length - 1);

  return list[index];
};
// шаблон, который будем копировать
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// возвращает массив из 4 объектов
var createWizardsList = function (numberWizards) {
  var wizardsList = [];
  // создает массив с элементами
  for (var i = 0; i < numberWizards; i++) {
    var wizard = {
      name: getRandomArrayElem(WIZARD_NAMES) + ' ' + getRandomArrayElem(WIZARD_LAST_NAMES),
      coatColor: getRandomArrayElem(WIZARD_MANTLE_COLOR),
      eyesColor: getRandomArrayElem(WIZARD_EYE_COLOR)
    };
    wizardsList.push(wizard); // добавляет элемент в конец массива
  }
  return wizardsList;
};

// клонирует template и добавляет новые данные из массива
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// рендерит список волшебников
var renderWizards = function () {
  var wizardsNode = document.querySelector('.setup-similar-list');
  var wizardsList = createWizardsList(4);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsList.length; i++) {
    var wizard = renderWizard(wizardsList[i]);
    fragment.appendChild(wizard);
  }
  wizardsNode.appendChild(fragment);
};
renderWizards();

// удаляет класс, скрывающий окно c похожими персонажами
var similarCharacters = document.querySelector('.setup-similar');
similarCharacters.classList.remove('hidden');
