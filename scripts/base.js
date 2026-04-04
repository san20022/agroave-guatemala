import { apiFetch } from "./api.js";
import { onions } from "./data.js";

window.contactUsTemplate = contactUsTemplate; //Global

window.submitForm = submitForm; //Global

//Hamburger menu
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
  
});

//logo link
const logo = document.querySelector(".logo-container");
logo.addEventListener("click", () => {homeTemplate()});

//home link
const home = document.querySelector(".home");
home.addEventListener("click", () => {homeTemplate()});

//conctact Us link
const contact = document.querySelector(".contact");
contact.addEventListener("click", () => {contactUsTemplate()});

//onions Link

const onionLink = document.querySelector(".onions");
onionLink.addEventListener("click", () => {onionsCardsTemplate(onions)});

// Select all nav links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    // Remove 'active' from all links
    navLinks.forEach(l => l.classList.remove('active'));
    // Add 'active' to the clicked link
    this.classList.add('active');
    // Optionally: prevent default and render your page here
    // event.preventDefault();
    // renderPage(this.getAttribute('href'));
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash || '#home';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    }
  });
});

//create Home page
function homeTemplate() {
  document.querySelector(".main").innerHTML = "";
	const template = document.querySelector(".main"); 

  const homeTemplate = document.createElement("div"); 
  homeTemplate.className = "template";
  
  homeTemplate.innerHTML = `
  <div class="hero-container">
    <figure class="hero"><img src="images/marketonions.webp" alt="Market Onions"  loading="lazy"> </figure>
    <div class="hero-text">
      <h3>AGROAVE Guatemala Onions</h3>
      <p>From Guatemala to the World 🌎</p>
    </div>
  </div>
  <section class="info">
    <div class="info-container">
      <figure class="cards" id="redOnion"><img src="images/redonions.webp" alt="Red Onions"  loading="lazy"> </figure>
      <figure class="cards" id="whiteOnion"><img src="images/whiteonions.webp" alt="White Onions"  loading="lazy"> </figure>
      <figure class="cards" id="yellowOnion"><img src="images/yellowonions.webp" alt="Yellow Onions"  loading="lazy"></figure>
      <div class="info-text">
        <h3>Organic Onions</h3>
        <p>We are an organic certified company that produce only the best quality of onions. Our onions are ready to export to different countries like U.S.A., Argentina, Guatemala and El Salvador. Our crops are organic and with the best quality. <span>If you wanto to know more about our products, please contact us</span>. </p>
        <button type="button" onclick="contactUsTemplate()"> Contact Us</button>
      </div>
    </div>
  </section>
  `;

  template.appendChild(homeTemplate);
}

//create contact Us
function contactUsTemplate() {
  document.querySelector(".main").innerHTML = "";
	const template = document.querySelector(".main"); 

  const contactTemplate = document.createElement("div"); 
	contactTemplate.className = "form-template";
		
  contactTemplate.innerHTML = `
  <form onsubmit="submitForm(event)" method="get" class="form">
    <label for="fname">First Name:</label>
    <input id="fname" type="text" name="firstname" placeholder="John" required>

    <label for="lname">Last Name:</label>
    <input id="lname" type="text" name="lastname" placeholder="Doe" required>

    <label for="email">Email:</label>
    <input id="email" type="email" name="email" placeholder="johndoe@gmail.com" required>

    <label for="phone">Phone Number:</label>
    <input id="phone" type="tel" name="phone" placeholder="6141755234" required>

    <label for="textarea">Message:</label>
    <textarea id="textarea" name="contact" placeholder="Write your message here" required></textarea>

    <input type="submit" value="Click Me!">
  </form>
  `; 
  template.appendChild(contactTemplate);
}

function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('textarea').value;

  console.log("Hello from Form");

  // Construct the mailto URL
  const mailtoUrl = `mailto:aveproducto77@hotmail.com?subject=Mensaje Enviado&body=Nombre: ${encodeURIComponent(fname)} ${encodeURIComponent(lname)}%0ATeléfono: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(email)}%0AMensaje: ${encodeURIComponent(message)}`;

  // Open the mailto URL
  window.location.href = mailtoUrl;

  // Redirect to thank you page after a delay
  setTimeout(() => {
      window.location.href = 'thanks.html';
  }, 1000); // Adjust the delay as needed
} 

function onionsCardsTemplate(array) {
  document.querySelector(".main").innerHTML = "";
  const cardsTemplate = document.querySelector(".main");

  array.forEach((onion, index) => {
    const cardTemplate = document.createElement("div");
    cardTemplate.className = "card-template";

    cardTemplate.innerHTML = `
      <div class="wrapper">
        <div class="banner-image"></div>
        <figure><img src="${onion.imageSCR}" alt="${onion.onionName}" loading="lazy" width="300" height="auto"></figure>
        <h2>${onion.onionName}</h2>
        <h3>${onion.location}</h3>
        <p>Harvest date: ${onion.corte}<br/>
          Planting date: ${onion.siembra}</p>
      </div>
      <div class="button-wrapper">
        <button class="btn outline details-btn">DETAILS</button>
        <button class="btn fill">BUY NOW</button>
      </div>
      <dialog class="onion-modal">
        <div class="modal-header">
          <h2>${onion.onionName}</h2>
          <button class="close-btn">X</button>
        </div>
        <p>${onion.details}</p>
      </dialog>
    `;

    // Add functionality after injecting the HTML
    const detailsBtn = cardTemplate.querySelector(".details-btn");
    const modal = cardTemplate.querySelector(".onion-modal");
    const closeBtn = cardTemplate.querySelector(".close-btn");

    detailsBtn.addEventListener("click", () => {
      modal.showModal();
    });

    closeBtn.addEventListener("click", () => {
      modal.close();
    });

    // Optional: close modal when clicking outside the modal content
    modal.addEventListener("click", (e) => {
      const dialogDimensions = modal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        modal.close();
      }
    });

    cardsTemplate.appendChild(cardTemplate);
  });
}




// use the date object
const today = new Date();

const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // 24-hour format
};

const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);

const year = document.querySelector("#current-year");

const lastModified = document.querySelector("#lastModified");

const footerInfo = document.querySelector(".footer-info");

const socialIcons = document.querySelector(".social-icons");

footerInfo.innerHTML = `<address>
					<strong>AGROAVE Guatemala</strong><br />
					Rancho Guate<br />
					Quetzaltenango, Guatemala<br />
					aveprodcutos@gmail.com<br />
					(624-125-5124)
				</address>`

socialIcons.innerHTML = `<img src="images/instagram_logo.svg" alt="Instagram" id="instagram"/><img src="images/linkedin_logo.svg" alt="LinkedIn Logo" id="linkedin"/><img src="images/github_logo.svg" alt="GitHub Logo" id="github" />`

document.getElementById('instagram').addEventListener('click', function() {
  window.open('https://www.instagram.com/', '_blank');
});

document.getElementById('linkedin').addEventListener('clicin/k', function() {
  window.open('https://www.linkedin.com/');
});

document.getElementById('github').addEventListener('click', function() {
  window.open('https://github.com', '_blank');
});
	

year.innerHTML = `<span class="highlight">&copy${today.getFullYear()} WDD231 Class Project |
				Luis Sanchez <br /> Guatemala <br /></span> <img
				src="images/onion.webp"
				alt="onion image"
				class="flag"
				width="50"
				height="50"
			/>`;
      /* can add loading="Lazy" */

lastModified.innerHTML = `<span class="highlight">Last modification: ${formattedDate}</span>`; 

apiFetch();
homeTemplate();