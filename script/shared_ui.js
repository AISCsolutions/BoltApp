define(['jquery'], function($) {
  return {
    setup: function(state) {
      this.gradeChanged(state.bolt.grade)
      this.typeChanged(state.bolt.type)
    },
    gradeChanged: function(grade) {
      $('.current-grade .ui-btn-text').html(grade)
      $('.ui-btn-text .current-grade').html(grade)
    },
    typeChanged: function(type) {
      $('body').toggleClass('type-3', type == '3')
    }
  }
})
