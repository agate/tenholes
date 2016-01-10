KEYS = [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ]
LEVELS_P = [ 'C', 'C+', 'D', 'D+', 'E', 'F', 'F+', 'G', 'G+', 'A', 'A+', 'B' ]
LEVELS_B = [ 'C', 'D-', 'D', 'E-', 'E', 'F', 'G-', 'G', 'A-', 'A', 'B-', 'B' ]
SYLLABLES = [ 1, 1.5, 2, 2.5, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7 ]

OFFSETS =
  blow: [ 0, 4, 7,  12, 16, 19, 24, 28, 31, 36 ]
  draw: [ 2, 7, 11, 14, 17, 21, 23, 26, 29, 33 ]
  bendBlow: [
    [ 0, 0, 0, 0, 0, 0, 0, -1, -1, -1 ]
    [ 0, 0, 0, 0, 0, 0, 0, 0,   0, -2 ]
  ],
  bendDraw: [
    [ -1, -1, -1, -1, 0, -1, 0, 0, 0, 0 ]
    [  0, -2, -2,  0, 0,  0, 0, 0, 0, 0 ]
    [  0,  0, -3,  0, 0,  0, 0, 0, 0, 0 ]
  ]

tenholes = angular.module('tenholes', ['ui.bootstrap'])
tenholes.controller('MainController', ['$scope', ($scope) ->
  $scope.OFFSETS = OFFSETS
  $scope.SYLLABLES = SYLLABLES
  $scope.LEVELS = { p: LEVELS_P, b: LEVELS_B }
  $scope.KEYS = KEYS
  $scope.key = 'C'
  $scope.displayType = 'alphabet'

  $scope.getKey = (offset, pOrB) ->
    pOrB ||= 'b'
    levels = $scope.LEVELS[pOrB]
    levels[offset % levels.length]

  $scope.getSyllable = (offset, pOrB) ->
    pOrB ||= 'b'
    levels = $scope.LEVELS[pOrB].slice()
    syllables = $scope.SYLLABLES.slice()
    while levels[0] != $scope.key
      x = levels.shift()
      y = syllables.pop()
      levels.push(x)
      syllables.unshift(y)
    syllables[offset % syllables.length]
])
