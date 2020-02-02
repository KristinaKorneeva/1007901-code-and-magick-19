'use strict';
// coздвет константы с данными масива
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_MANTLE_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
var similarCharacters = document.querySelector('.setup-similar');
var wizardsNode = document.querySelector('.setup-similar-list');
// шаблон, который будем копировать
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// удаляет класс, скрывающий окно
userDialog.classList.remove('hidden');

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
