const steps = [
  {
    label: "Step One",
    icon: "1",
    position: 1
  },
  {
    label: "Step Two",
    icon: "2",
    position: 2
  },
  {
    label: "Step Three",
    icon: "3",
    position: 3
  },
];

const currentStep = {
  id: 1,
  label: "Step One",
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
