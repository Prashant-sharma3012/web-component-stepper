const steps = [
  {
    label: "One",
    icon: "1",
  },
  {
    label: "Two",
    icon: "2",
  },
  {
    label: "Three",
    icon: "3",
  },
];

const currentStep = {
  id: 1,
  label: "One",
  icon: "1",
};

onStepClick = (step) => {
  console.log(step)
}

var stringified = JSON.stringify(steps);
var currentStepStr = JSON.stringify(currentStep);

var el = document.getElementsByTagName("wc-stepper")[0];

el.setAttribute("steps", stringified);
el.setAttribute("currentStep", currentStepStr);

el.addEventListener('onStepClick', (e) => {
  console.log(e.detail.step());
})
