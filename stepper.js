class Stepper extends HTMLElement {
  constructor() {
    super();
    this._steps = [];
    this._currentStep = null;
    this.clickedStep = null;
    this.onStepClick = new CustomEvent("onStepClick", {
      bubbles: true,
      composed: true,
      detail: { step: () => this.clickedStep || "wololo" },
    });
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          #stepper_container{
            display: flex;
            flex-direction: row;
            justify-content: center;
            background-color: #ffffff;
            padding: 1rem;
            border-radius: 4px;
            border: 1px solid;
            box-shadow: 2px 2px 8px 0px;
          }
          .step{
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0px 8px;
          }
          .step-icon-container {
            border-radius: 100%;
            width: 1.5rem;
            height: 1.5rem;
            cursor: pointer;
            display: flex;
            flex-direction: row;
            justify-content: center;
            background-color: gray;
            color: white;
            font-family: sans-serif;
            font-size: 14px;
            align-items: center;
            align-self: center;
          }
          .step-label{
            letter-spacing: 1px;
            text-align: center;
            font-family: sans-serif;
            font-size: 12px;
            margin-top: 0.6rem;
          }
          .connector{
            display: flex;
            border-bottom: 1px solid #bdbdbd;
            width: 100%;
            min-width: 20%;
            align-self: center;
            margin-bottom: 2.2rem;
          }
          .step__iscomplete{
            background-color: #1976D2;
          }
        </style>
        <div id="stepper_container">
        </div>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("steps")) {
      this._steps = this.getAttribute("steps");
      this._renderSteps();
    }
  }

  static get observedAttributes() {
    return ["steps", "currentstep"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "steps") {
      this._steps = JSON.parse(newValue);
    }

    if (name === "currentstep") {
      this._currentStep = JSON.parse(newValue);
    }

    this._renderSteps();
  }

  handleStepClick = (event) => {
    let parts = event.target.id.split("_");
    let position = parts[parts.length - 1];
    this.clickedStep = this._steps.find(
      (step) => step.position.toString() === position
    );
    this.dispatchEvent(this.onStepClick);
  };

  _attachStep(step, index, fragment) {
    let stepTemplate = `
      <div class='step'>
        <div id="__step_${step.position}" class='step-icon-container'>
            ${step.icon}
        </div>
        <div class='step-label'>${step.label}</div>
      <div>
    `;

    let connector = '<div class="connector"></div>';

    if (this._currentStep && this._currentStep.position >= step.position) {
      stepTemplate = `
      <div class='step'>
        <div id="__step_${step.position}" class='step-icon-container step__iscomplete'>
            ${step.icon}
        </div>
        <div class='step-label'>${step.label}</div>
      <div>
    `;
    }

    if (index !== 0) {
      fragment.insertAdjacentHTML("beforeend", connector);
    }
    fragment.insertAdjacentHTML("beforeend", stepTemplate);

    let el1 = fragment.querySelector(`#__step_${step.position}`);
    el1.addEventListener("click", this.handleStepClick);
  }

  _renderSteps() {
    let container = this.shadowRoot.getElementById("stepper_container");

    container.innerHTML = "";

    this._steps.map((step, indx) => {
      this._attachStep(step, indx, container);
    });
  }
}

customElements.define("wc-stepper", Stepper);
