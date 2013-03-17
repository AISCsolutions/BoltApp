$(function() {
  /* Dimensions - diagram select */
  $('#bolt-select').on('change', function() {
    boltDiagram.show()
    nutDiagram.hide()
    washerDiagram.hide()
  })
  $('#nut-select').on('change', function() {
    boltDiagram.hide()
    nutDiagram.show()
    washerDiagram.hide()
  })
  $('#washer-select').on('change', function() {
    boltDiagram.hide()
    nutDiagram.hide()
    washerDiagram.show()
  })

  /* Dimensions - diagram */
  var boltDiagram = Diagram.clone('#bolt-diagram', 'Bolt')
  var nutDiagram = Diagram.clone('#nut-diagram', 'Nut')
  var washerDiagram = Diagram.clone('#washer-diagram', 'Circular Washer')

  //washerDiagram.interactivePlace('Min Edge Distance')

  var placeMeasurements = function(measurements) {
    window.measurements = measurements
    boltDiagram.update(measurements[4])
    nutDiagram.update(measurements[4])
    washerDiagram.update(measurements[4])
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
  }

  /* Dimensions */
  var setupDimenions = function() {
    $('#dimensions input[type="radio"]').each(function() {
      if (this.checked) {
        $(this).change()
      }
    })
    loadMeasurements(placeMeasurements)
    wireDiameter()
  }

  $('#dimensions').on('pageshow', setupDimenions)

  /* Nuts and Washers */
  var fixNW = function() {
    console.log('fixing NW')
    var headerHeight = $.mobile.activePage.find('[data-role="header"]').height()
    var footerHeight = $.mobile.activePage.find('[data-role="footer"]').height()
    var windowHeight = $(this).height()
    var contentPadding = parseInt($.mobile.activePage.find('[data-role="content"]').css("padding-top"), 10)
    var pagePadding = parseInt($.mobile.activePage.css("padding-top"), 10)
    $('#nuts-and-washers .split').css('height', windowHeight - headerHeight - footerHeight - pagePadding - contentPadding*2)
  }

  $(window).on('navigate', fixNW)
})
