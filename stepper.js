class Stepper extends HTMLElement {
  constructor() {
    super();
    this._steps = [];
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          #stepper_container{
            display: flex;
            flex-direction: row;
            min-width: 30rem;
            justify-content: center;
            width: 30rem;
            background-color: #a7a7a7;
            padding: 1rem;
            border-radius: 4px;
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
    return ["steps"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "steps") {
      this._steps = JSON.parse(newValue);
      this._renderSteps();
    }
  }

  _attachStep(step,index,  fragment) {
    let stepTemplate = `
      <div class='step'>
        <div class='step-icon'>${step.icon}</div>
        <div class='step-label'>${step.label}</div>
      <div>
    `;

    let connector = '<div class="connector"></div>'

    if(index === 0){
      return fragment.insertAdjacentHTML('beforeend', stepTemplate)
    }

    fragment.insertAdjacentHTML('beforeend', connector)
    fragment.insertAdjacentHTML('beforeend', stepTemplate)
  }

  _renderSteps() {
    let container = this.shadowRoot.getElementById("stepper_container");

    this._steps.map((step, indx) => {
      this._attachStep(step, indx, container);
    });
  }
}

customElements.define("wc-stepper", Stepper);
