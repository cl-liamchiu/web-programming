class Person {
  constructor(hostPictureElement, hostNameElement) {
    this.hostPictureElement = hostPictureElement;
    this.hostNameElement = hostNameElement;
    this.hostPicture =
      getComputedStyle(hostPictureElement).getPropertyValue("background-image");
    this.hostPictureInnerHTML = hostPictureElement.innerHTML;
    this.hostName = hostNameElement.innerHTML;
    this.hostBackgroundColor =
      getComputedStyle(hostPictureElement).getPropertyValue("background-color");

    this.mainBoxElement = document.querySelector(".main_box");
    this.guestBoxElement = document.querySelector(".guest_box");
    this.guestBoxDivElement = document.querySelectorAll(".guest_box>div");
    this.guestBoxDivGuest5Element = document.querySelector(
      ".guest_box>div.guest5"
    );
    this.guestHostElement = document.querySelector(".guest_host");
    this.pinYouBoxElement = document.querySelector(".ping_you_box");
    // console.log(
    //   this.hostPictureElement,
    //   this.hostNameElement,
    //   this.hostPicture,
    //   this.hostName,
    //   this.hostPictureInnerHTML
    // );
  }

  changeHost = (
    guestPicture,
    guestBackgroundColor,
    guestPictureInnerHTML,
    guestName
  ) => {
    this.hostPictureElement.style.setProperty("background-image", guestPicture);
    this.hostPictureElement.style.setProperty(
      "background-color",
      guestBackgroundColor
    );
    this.hostPictureElement.innerHTML = guestPictureInnerHTML;
    this.hostNameElement.innerHTML = guestName;
    this.mainBoxElement.style.setProperty("display", "block");
    this.pinYouBoxElement.style.setProperty("display", "flex");
    this.guestHostElement.style.setProperty("display", "none");
    this.guestBoxElement.style.setProperty("width", "30%");
    this.guestBoxElement.style.setProperty("margin-top", "70px");
    this.guestBoxDivElement.forEach((element) => {
      element.style.setProperty("width", "200px");
      element.style.setProperty("height", "150px");
    });
    this.guestBoxDivGuest5Element.style.setProperty("width", "270px");
  };

  changeGuest = (guestPictureElement, guestNameElement) => {
    guestPictureElement.style.setProperty("background-image", this.hostPicture);
    guestPictureElement.innerHTML = this.hostPictureInnerHTML;
    guestNameElement.innerHTML = this.hostName;
    // console.log(this.hostPicture, this.hostBackgroundColor);
    if (this.hostPicture === "none") {
      guestPictureElement.style.setProperty(
        "background-color",
        this.hostBackgroundColor
      );
    }
    if (guestNameElement.innerHTML === "You") {
      guestPictureElement.parentElement.children[3].style.setProperty(
        "display",
        "none"
      );
    } else {
      guestPictureElement.parentElement.children[3].style.setProperty(
        "display",
        "block"
      );
    }
  };

  unPinHost = () => {
    if (
      document.querySelector(".guest_box").childElementCount === 2
    )
      return;
    this.modifyHost();
    this.mainBoxElement.style.setProperty("display", "none");
    this.pinYouBoxElement.style.setProperty("display", "none");
    this.guestHostElement.style.setProperty("display", "block");
    this.guestBoxElement.style.setProperty("width", "100%");
    this.guestBoxElement.style.setProperty("margin-top", "0px");
    this.guestBoxDivElement.forEach((element) => {
      element.style.setProperty("width", "32%");
      element.style.setProperty("height", "47%");
    });
    this.changeGuest(
      this.guestHostElement.children[0],
      this.guestHostElement.children[4]
    );
  };

  modifyHost = () => {
    this.hostPicture =
      getComputedStyle(hostPictureElement).getPropertyValue("background-image");
    this.hostPictureInnerHTML = hostPictureElement.innerHTML;
    this.hostName = hostNameElement.innerHTML;
    this.hostBackgroundColor =
      getComputedStyle(hostPictureElement).getPropertyValue("background-color");
  };
}

function removePerson(className) {
  const element = document.querySelector(className);
  element.remove();
  if (document.querySelector(".guest_box").childElementCount === 2) {
    mainBoxElement.style.setProperty("dislay", "block");
    mainBoxElement.style.setProperty("width", "100%");
    document.querySelector(".guest_box").style.setProperty("display", "none");
    document.querySelector(".mutiguest").style.setProperty("display", "none");

    person.changeHost(
      youtPicture,
      youBackgroundColor,
      youPictureInnerHTML,
      youName
    );
  }
}

// function chaneHost(id) {
//   const element = document.getElementById(id);
//   element.remove();
// }

const hostPinButton = document.querySelector("[hostPinButton]");
const guestPinButtons = document.querySelectorAll("[guestPinButton]");
const hostPictureElement = document.querySelector("[host-picture]");
const hostNameElement = document.querySelector("[host-name]");
const youtPicture =
  getComputedStyle(hostPictureElement).getPropertyValue("background-image");
const youBackgroundColor =
  getComputedStyle(hostPictureElement).getPropertyValue("background-color");
const youPictureInnerHTML = hostPictureElement.innerHTML;
const youName = hostNameElement.innerHTML;

const guestPictureElements = document.querySelectorAll("[guest-picture]");
const guestNameElements = document.querySelectorAll("[guest-name]");
const mainBoxElement = document.querySelector(".main_box");

const person = new Person(hostPictureElement, hostNameElement);

hostPinButton.addEventListener("click", () => {
  // const mainBoxElement = document.querySelector(".main_box");
  // const guestBoxElement = document.querySelector(".guest_box");
  // const guestBoxDivElement = document.querySelectorAll(".guest_box>div");
  // const guestBoxDivGuest5Element = document.querySelector(
  //   ".guest_box>div.guest5"
  // );
  // const guestHostElement = document.querySelector(".guest_host");
  // const pinYouBoxElement = document.querySelector(".ping_you_box");
  // console.log(
  //   mainBoxElement,
  //   guestBoxElement,
  //   guestBoxDivElement,
  //   guestBoxDivGuest5Element,
  //   guestHostElement,
  //   pinYouBoxElement
  // );
  person.unPinHost();
});

guestPinButtons.forEach((button) => {
  button.addEventListener("click", () => {
    var guestPictureElement = button.parentElement.parentElement.children[0];
    var guestNameElement = button.parentElement.parentElement.children[4];
    var guestPicture =
      getComputedStyle(guestPictureElement).getPropertyValue(
        "background-image"
      );
    var guestBackgroundColor =
      getComputedStyle(guestPictureElement).getPropertyValue(
        "background-color"
      );
    var guestPictureInnerHTML = guestPictureElement.innerHTML;
    var guestName = guestNameElement.innerHTML;

    if (
      getComputedStyle(mainBoxElement).getPropertyValue("display") === "none"
    ) {
      person.changeHost(
        guestPicture,
        guestBackgroundColor,
        guestPictureInnerHTML,
        guestName
      );
    }

    person.changeHost(
      guestPicture,
      guestBackgroundColor,
      guestPictureInnerHTML,
      guestName
    );
    person.changeGuest(guestPictureElement, guestNameElement);
    person.modifyHost();
  });
});

//
// hostNameElement.innerHTML="李彥儒";
// hostPictureElement.style.backgroundImage='url("./images/cat.jpg")';
// hostPictureElement.innerHTML=''
