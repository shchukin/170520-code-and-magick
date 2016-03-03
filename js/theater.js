/**
 * @fileoverview Театр - часть страницы с превью галереи.
 * Идет работа с тумбнейлами скриншотов. На их основе строится массив
 * данных для галереи (массив объектов Photo) и инициализируется
 * сама галерея (Gallery). Добавляются обработчики кликов на тумбнейлы.
 * Соответствующие клики вызывают галерею
 *
 * @author Anton Shchukin (a.a.shchukin@gmail.com)
 */

'use strict';

var Photo = require('photo');
var Video = require('video');
var Gallery = require('gallery');

// Тумбнейлы изображений обернуты в ссылки
var theaterElements = document.querySelectorAll('.photogallery-image');

// Cбор адресов на полные изображения для галереи
var theaterData = [].map.call(theaterElements, function(item) {
  if ( item.dataset.replacementVideo ) {
    return new Video(item.dataset.replacementVideo);
  } else {
    return new Photo(item.querySelector('img').getAttribute('src'));
  }
});

// Создание галереи
var gallery = new Gallery();

// Добавление данных в галерею
gallery.setPictures(theaterData);

[].forEach.call(theaterElements, function(element) {
  element.addEventListener('click', function(event) {
    event.preventDefault();

    //получаем индекс элемента
    var index = [].indexOf.call(theaterElements, this);

    //добавляем адрес изображения соответсвущего кликнутому тумбнейлу в хэш. Этот код вызывает показа галереи из объекта галереи
    location.hash = 'photo/' + theaterData[index].src;
  });
});

// показ галереи при обновлении / открытии страницы с уже указанным хэшом (НЕ по клику на тумбнейл)
gallery.restoreFromHash();







