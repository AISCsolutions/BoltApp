define(['jquery', 'can/control', 'lib/ext/jquery.ae.image.resize'],
function($, Control) {
  "use strict";

  return Control({
    ' open': function() {
      this.element.find('img').aeImageResize({width: 150})
    },
    ' click': function() {$('.ui-dialog').dialog('close')}
  })
})
