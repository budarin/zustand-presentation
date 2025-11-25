// Model
function ButtonModel() {
  this.clickHandlers = [];
  this.subscribers = [];
  this.isOn = false;
}

ButtonModel.prototype.subscribe = function (subscriber) {
  this.subscribers.push(subscriber);
};

ButtonModel.prototype.notifySubscribers = function () {
  this.subscribers.forEach(function (subscriber) {
    subscriber.update(this.isOn);
  }, this);
};

ButtonModel.prototype.handleClick = function () {
  this.isOn = !this.isOn;
  this.notifySubscribers();
};

ButtonModel.prototype.setButtonState = function (isOn) {
  this.isOn = isOn;
  this.notifySubscribers();
};

ButtonModel.prototype.destroy = function () {
  this.clickHandlers = [];
  this.subscribers = [];
  this.isOn = false;
};

// View
function ButtonView(model, onImgSrc, offImgSrc) {
  this.model = model;
  this.onImgSrc = onImgSrc;
  this.offImgSrc = offImgSrc;
  this.element = document.createElement("img");
  this.element.addEventListener(
    "click",
    function () {
      this.model.handleClick();
    }.bind(this)
  );
  this.model.subscribe(this);
  this.updateImage();
}

ButtonView.prototype.updateImage = function () {
  this.element.src = this.model.isOn ? this.onImgSrc : this.offImgSrc;
};

ButtonView.prototype.render = function (target) {
  target.appendChild(this.element);
};

// Controller
function ButtonController(model, onImgSrc, offImgSrc) {
  this.model = model;
  this.view = new ButtonView(model, onImgSrc, offImgSrc);
}

ButtonController.prototype.render = function (target) {
  this.view.render(target);
};

ButtonController.prototype.setButtonState = function (isOn) {
  this.model.setButtonState(isOn);
};

ButtonController.prototype.destroy = function () {
  this.model = null;
  this.view = null;
};

// Implementation
const buttonModel = new ButtonModel();
const buttonController = new ButtonController(
  buttonModel,
  "./images/button-on-image.png",
  "./images/button-off-image.png"
);
buttonController.render(document.body);
