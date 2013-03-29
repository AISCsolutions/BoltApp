define([], function() {
  return {
    clone: function(string) {
      var frac = Object.create(this)

      frac.whole = ''
      frac.numerator = ''
      frac.denominator = ''

      var pieces = string.split('/')
      if (pieces.length < 2) {
        frac.whole = pieces[0]
        return frac
      }

      frac.denominator = pieces[1]

      var parts = pieces[0].split(' ')
      if (parts.length < 2) {
        frac.numerator = parts[0]
        return frac
      }

      frac.whole = parts[0] + ' '
      frac.numerator = parts[1]

      return frac
    },
    toString: function() {
      if (this.numerator && this.numerator != '') {
        return this.whole + '<sup>'+this.numerator+'</sup>&frasl;<sub>'+this.denominator+'</sub>'
      } else {
        return this.whole
      }
    }
  }
})
