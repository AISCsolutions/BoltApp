define([
  'jquery',
  'appstate',
  'measurements',
  'diagram'
], function(
  $,
  state,
  measurements,
  Diagram
) {
  /* Bolt ID */
  var setupBoltID = function() {
    $('#grade-select .ui-btn-text').html(state.bolt.grade)
    $('#finish-select .ui-btn-text').html(state.bolt.finish)
    $('#manufacturer-select .ui-btn-text').html(state.bolt.manufacturer)
    $('#type-select').val(state.bolt.type).change()
  }

  /* Dimensions - diagram select */
  var wireDiagramSelect = function() {
    $('#bolt-select').on('change', function() {
      state.diagram = 'bolt'
      boltDiagram.show()
      nutDiagram.hide()
      washerDiagram.hide()
    })
    $('#nut-select').on('change', function() {
      state.diagram = 'nut'
      boltDiagram.hide()
      nutDiagram.show()
      washerDiagram.hide()
    })
    $('#washer-select').on('change', function() {
      state.diagram = 'washer'
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

  var placeMeasurements = function(measurements) {
    boltDiagram.update(measurements[4]['Bolt'])
    nutDiagram.update(measurements[4]['Nut'])
    washerDiagram.update(measurements[4]['Circular Washer'])
    washerDiagram.update(measurements[4]['Square Washer'])
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

  var wireDiameter = function() {
    $('#diameter').on('change', function() {
      $('#diameter-inches span').html(diameterInches[$(this).val().toString()])
    })
    $('#diameter').val(state.bolt.diameter).change()
  }

  /* Dimensions */
  var setupDimensions = function() {
    measurements.load(placeMeasurements)
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
    })
  }

  /* Finish Select */
  var wireFinish = function() {
    $('#finish li a').on('click', function() {
      state.bolt.finish = $(this).find('h2').text()
    })
  }

  /* Manufacturer Select */
  var wireManufacturer = function() {
    $('#manufacturer li a[href="#bolt-id"]').on('click', function() {
      state.bolt.manufacturer = $(this).find('h2').html()
    })
  }

  return {
    boltDiagram: boltDiagram,
    nutDiagram: nutDiagram,
    washerDiagram: washerDiagram,
    ready: function() {
      setupBoltID()
      $('#bolt-id').on('pagebeforeshow', setupBoltID)
      $('#dimensions').on('pageshow', setupDimensions)
      $(window).on('navigate', fixNW)
      $('#grade').on('pagebeforeshow', wireGrade)
      $('#finish').on('pagebeforeshow', wireFinish)
      $('#manufacturer').on('pagebeforeshow', wireManufacturer)
    }
  }
})
