// Model
class ButtonModel {
  constructor() {
    this.clickHandlers = [];
    this.subscribers = [];
    this.isOn = false;
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  notifySubscribers() {
    this.subscribers.forEach((subscriber) => {
      subscriber.update(this.isOn);
    });
  }

  handleClick() {
    this.isOn = !this.isOn;
    this.notifySubscribers();
  }

  setButtonState(isOn) {
    this.isOn = isOn;
    this.notifySubscribers();
  }

  destroy() {
    this.clickHandlers = [];
    this.subscribers = [];
    this.isOn = false;
  }
}

// View
class ButtonView {
  constructor(model, onImgSrc, offImgSrc) {
    this.model = model;
    this.onImgSrc = onImgSrc;
    this.offImgSrc = offImgSrc;
    this.element = document.createElement("img");
    this.element.addEventListener("click", () => {
      this.model.handleClick();
    });
    this.model.subscribe(this);
    this.updateImage();
  }

  updateImage() {
    this.element.src = this.model.isOn ? this.onImgSrc : this.offImgSrc;
  }

  render(target) {
    target.appendChild(this.element);
  }
}

// Controller
class ButtonController {
  constructor(model, onImgSrc, offImgSrc) {
    this.model = model;
    this.view = new ButtonView(model, onImgSrc, offImgSrc);
  }

  render(target) {
    this.view.render(target);
  }

  setButtonState(isOn) {
    this.model.setButtonState(isOn);
  }

  destroy() {
    this.model = null;
    this.view = null;
  }
}

// Implementation
const buttonModel = new ButtonModel();
const buttonController = new ButtonController(
  buttonModel,
  "./images/button-on-image.png",
  "./images/button-off-image.png"
);
buttonController.render(document.body);
