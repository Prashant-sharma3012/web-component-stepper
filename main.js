const steps = [
  {
    label: 'One',
    icon: '1'
  },
  {
    label: 'Two',
    icon: '2'
  },
  {
    label: 'Three',
    icon: '3'
  }
]

var stringified = JSON.stringify(steps);
var el = document.getElementsByTagName('wc-stepper')[0]
el.setAttribute('steps', stringified)