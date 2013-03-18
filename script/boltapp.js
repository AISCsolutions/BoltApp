define([
  'jquery',
  'appstate',
  'measurements',
  'diagram'
], function(
  $,
  appstate,
  ments,
  Diagram
) {
  /* Global */

  var state = appstate.load()
  console.log(state)

  var setGlobalClasses = function() {
    $body = $('body')
    if (state.bolt.type == 'Type 3') {
      $body.addClass('type-3')
    } else {
      $body.removeClass('type-3')
    }
  }

  /* Bolt ID */
  var setupBoltId = function() {
    $('.current-grade .ui-btn-text').html(state.bolt.grade)
    $('.ui-btn-text .current-grade').html(state.bolt.grade)
    $('#finish-select .ui-btn-text').html(state.bolt.finish)
    setupBoltIdManufacturer()
    setupBoltIdType()
  }

  var setupBoltIdManufacturer = function() {
    mfg = state.bolt.manufacturer
    $mfg = $('#manufacturer-select')
    $mfg.find('.name').html(mfg.name)
    $mfg.find('.location').html(mfg.location)
    $mfg.find('.website').attr('href', mfg.website)
    $mfg.find('.bolt').attr('src', mfg.bolt)
  }

  var setupBoltIdType = function() {
    if (state.bolt.type == 'Type 3') {
      $('label[for="type-3"]').click()
    } else {
      $('label[for="type-1"]').click()
    }
    $('.type input[type="radio"]').on('change', function() {
      state.bolt.type = $(this).val()
      appstate.save()
      setGlobalClasses()
    })
  }

  /* Dimensions - diagram select */
  var wireDiagramSelect = function() {
    $('#bolt-select').on('change', function() {
      state.diagram = 'bolt'
      appstate.save()
      boltDiagram.show()
      nutDiagram.hide()
      washerDiagram.hide()
    })
    $('#nut-select').on('change', function() {
      state.diagram = 'nut'
      appstate.save()
      boltDiagram.hide()
      nutDiagram.show()
      washerDiagram.hide()
    })
    $('#washer-select').on('change', function() {
      state.diagram = 'washer'
      appstate.save()
      boltDiagram.hide()
      nutDiagram.hide()
      washerDiagram.show()
    })

    $('label[for="'+state.diagram+'-select"]').click()
  }

  /* Dimensions - diagram */
  var boltDiagram = Diagram.clone('#bolt-diagram')
  var nutDiagram = Diagram.clone('#nut-diagram')
  var washerDiagram = Diagram.clone('#washer-diagram')

  var measurements = []

  var receiveMeasurements = function(data) {
    console.log(data)
    measurements = data
    updateMeasurements()
  }

  var currentMeasures = function() {
    var fraction = diameterInches[state.bolt.diameter.toString()]
    for (var i in measurements) {
      if (measurements[i].Bolt.Diameter == fraction) {
        return measurements[i]
      }
    }
    throw "Measurement not found for "+state.bolt.diameter
  }

  var updateMeasurements = function() {
    measures = currentMeasures()
    boltDiagram.update({Grade: state.bolt.grade})
    boltDiagram.update(measures['Bolt'])
    nutDiagram.update(measures['Nut'])
    washerDiagram.update(measures['Circular Washer'])
    washerDiagram.update(measures['Square Washer'])
  }

  /* Dimensions - diameter */
  var diameterInches = {
    '0.5': '1/2',
    '0.625': '5/8',
    '0.75': '3/4',
    '0.875': '7/8',
    '1': '1',
    '1.125': '1 1/8',
    '1.25': '1 2/4',
    '1.375': '1 3/8',
    '1.5': '1 1/2',
  }

  var diameterDisplay = function() {
    $('#diameter-inches span').html(diameterInches[state.bolt.diameter.toString()])
  }

  var wireDiameter = function() {
    $('#diameter').on('change', function() {
      var value = $(this).val()
      if (state.bolt.diameter != value) {
        state.bolt.diameter = value
        appstate.save()
        diameterDisplay()
        updateMeasurements()
      }
    })
    $('#diameter').val(state.bolt.diameter).change()
    diameterDisplay()
  }

  /* Dimensions */
  var setupDimensions = function() {
    ments.load(receiveMeasurements)
    wireDiagramSelect()
    wireDiameter()
  }

  /* Nuts and Washers */
  var fixNW = function() {
    //console.log('fixing NW')
    var headerHeight = $.mobile.activePage.find('[data-role="header"]').height()
    var footerHeight = $.mobile.activePage.find('[data-role="footer"]').height()
    var windowHeight = $(this).height()
    var contentPadding = parseInt($.mobile.activePage.find('[data-role="content"]').css("padding-top"), 10)
    var pagePadding = parseInt($.mobile.activePage.css("padding-top"), 10)
    $('#nuts-and-washers .split').css('height', windowHeight - headerHeight - footerHeight - pagePadding - contentPadding*2)
  }

  /* Grade Select */
  var wireGrade = function() {
    $('#grade li a').on('click', function() {
      state.bolt.grade = $(this).find('h2').text()
      appstate.save()
    })
  }

  /* Finish Select */
  var wireFinish = function() {
    $('#finish li a').on('click', function() {
      state.bolt.finish = $(this).find('h2').text()
      appstate.save()
    })
  }

  /* Manufacturer Select */
  var wireManufacturer = function() {
    $('#manufacturer li a[href="#bolt-id"]').on('click', function() {
      console.log(this)
      state.bolt.manufacturer = {
        name: $(this).find('.name').html(),
        location: $(this).find('.location').html(),
        bolt: $(this).find('.bolt').attr('src'),
        website: $(this).parent().parent().parent().find('.website').attr('href')
      }
      appstate.save()
    })
  }

  return {
    boltDiagram: boltDiagram,
    nutDiagram: nutDiagram,
    washerDiagram: washerDiagram,
    ready: function() {
      setGlobalClasses()
      setupBoltId()
      $('#bolt-id').on('pagebeforeshow', setupBoltId)
      $('#dimensions').on('pageshow', setupDimensions)
      $(window).on('navigate', fixNW)
      $('#grade').on('pagebeforeshow', wireGrade)
      $('#finish').on('pagebeforeshow', wireFinish)
      $('#manufacturer').on('pagebeforeshow', wireManufacturer)
    }
  }
})
