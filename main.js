const steps = [
  {
    label: "One",
    icon: "1",
    position: 1
  },
  {
    label: "Two",
    icon: "2",
    position: 2
  },
  {
    label: "Three",
    icon: "3",
    position: 3
  },
];

const currentStep = {
  id: 1,
  label: "One",
  icon: "1",
};

onStepClick = (e) => {
  let step = e.detail.step()
  let currentStepStr = JSON.stringify(step);  
  let el = document.getElementsByTagName("wc-stepper")[0];
  el.setAttribute("currentstep", currentStepStr);
}

var stringified = JSON.stringify(steps);
var currentStepStr = JSON.stringify(currentStep);

var el = document.getElementsByTagName("wc-stepper")[0];

el.setAttribute("steps", stringified);
el.setAttribute("currentstep", currentStepStr);

el.addEventListener('onStepClick', onStepClick)
