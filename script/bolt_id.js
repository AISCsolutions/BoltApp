define(['jquery', 'appstate', 'rules'], function($, appstate, rules) {
  "use strict"

  var setupGrade = function() {
    $('.current-grade .ui-btn-text').html(appstate.data.bolt.grade)
    $('.ui-btn-text .current-grade').html(appstate.data.bolt.grade)
  }

  var setGlobalClasses = function() {
    $('body').toggleClass('type-3', appstate.data.bolt.type == '3')

    $('#grade-select').toggleClass('illegal', !rules.isGradeLegal(appstate.data.bolt.grade))
    $('label[for="type-1"]').toggleClass('illegal', !rules.isTypeLegal('1'))
    $('label[for="type-3"]').toggleClass('illegal', !rules.isTypeLegal('3'))
    $('#finish-select .ui-btn-text').toggleClass('illegal', !rules.isFinishLegal(appstate.data.bolt.finish))
  }

  var setupType = function() {
    $('label[for="type-'+appstate.data.bolt.type+'"]').click()
    $('.type input[type="radio"]').on('change', function() {
      appstate.data.bolt.type = $(this).val()
      appstate.save()
      setGlobalClasses()
    })
    setGlobalClasses()
  }

  var setupFinish = function() {
    $('#finish-select .ui-btn-text').html(appstate.data.bolt.finish)
  }

  var setupManufacturer = function() {
    var mfg = appstate.data.bolt.manufacturer
    var $mfg = $('#manufacturer-select')
    $mfg.find('.name').html(mfg.name)
    $mfg.find('.location').html(mfg.location)
    $mfg.find('.website').attr('href', mfg.website)
    $mfg.find('.bolt').attr('src', mfg.bolt)
  }

  var setupBoltId = function() {
    setupGrade()
    setupType()
    setupFinish()
    setupManufacturer()
  }

  return {
    wire: setupBoltId,
  }
})
