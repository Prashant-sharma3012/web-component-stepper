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
            min-width: 30rem;
            justify-content: center;
            width: 30rem;
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
          }
          .step-icon {
            align-self: center;
            border-radius: 100%;
            border: 1px solid black;
            width: 2rem;
            text-align: center;
            height: 2rem;
            font-weight: 600;
            cursor: pointer;
          }
          .step-label{
            letter-spacing: 1px;
            text-align: center;
          }
          .connector{
            display: flex;
            border-bottom: 2px solid;
            height: 0px;
            width: 30%;
            min-width: 20%;
            align-self: center;
            margin-bottom: 1rem;
          }
          .step__iscomplete{
            background-color: #06BEE1;
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
    return ["steps", "currentStep"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "steps") {
      this._steps = JSON.parse(newValue);
    }

    if (name === "currentStep") {
      this._currentStep = JSON.parse(newValue);
    }

    this._renderSteps();
  }

  handleStepClick = (event) => {
    let parts = event.target.id.split("_");
    this.clickedStep = this._steps[parts[parts.length - 1]];
    this.dispatchEvent(this.onStepClick);
  };

  _attachStep(step, index, fragment) {
    let stepTemplate = `
      <div class='step'>
        <div id="__step_${index}" class='step-icon'>${step.icon}</div>
        <div class='step-label'>${step.label}</div>
      <div>
    `;

    let connector = '<div class="connector"></div>';

    if (index !== 0) {
      fragment.insertAdjacentHTML("beforeend", connector);
    }
    fragment.insertAdjacentHTML("beforeend", stepTemplate);

    if (index === 0) {
      let el = fragment.querySelector(".step-icon");
      el.classList.add("step__iscomplete");
    }

    let el1 = fragment.querySelector(`#__step_${index}`);
    el1.addEventListener("click", this.handleStepClick);
  }

  _renderSteps() {
    let container = this.shadowRoot.getElementById("stepper_container");

    this._steps.map((step, indx) => {
      this._attachStep(step, indx, container);
    });
  }
}

customElements.define("wc-stepper", Stepper);
