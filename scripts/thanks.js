/* Review Counter */
// 1️⃣ Initialize display element variable
const reviewsDisplay = document.querySelector(".counter");    

// 2️⃣ Get the stored VALUE for the numVisits-ls KEY in localStorage if it exists. If the numVisits KEY is missing, then assign 0 to the numVisits variable.

let numReviews = Number(window.localStorage.getItem('numReviews-ls')) || 0;

if (numReviews !==0) {
  reviewsDisplay.textContent = `We already recieve ${numReviews} messages. We apreaciete your feedback.`;
} else {
  reviewsDisplay.textContent = `This is the first message. 🥳 Thank You!`;
}

// 4️⃣ increment the number of visits by one.
numReviews++;

// 5️⃣ store the new visit total into localStorage, key=numVisits-ls
localStorage.setItem("numReviews-ls", numReviews);


//Hamburger menu
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

//logo link
const logo = document.querySelector(".logo-container");
logo.addEventListener("click", () => {
  window.location.href = 'index.html'
});

//home link
const home = document.querySelector(".home");
home.addEventListener("click", () => {
  window.location.href = 'index.html'
});


// use the date object
const today = new Date();

const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
};

const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);

const year = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastModified");
const footerInfo = document.querySelector(".footer-info");
const socialIcons = document.querySelector(".social-icons");

footerInfo.innerHTML = `<address>
					<strong>AGROAVE Guatemala</strong><br />
					Rancho Nicaragua<br />
					Almolonga, Quetzaltenango<br />
					aveproductos@gmail.com<br />
					(+502-634-134-5324)
				</address>`;

socialIcons.innerHTML = `
<img src="images/instagram_logo.svg" alt="Instagram" id="instagram"/>
<img src="images/linkedin_logo.svg" alt="LinkedIn Logo" id="linkedin"/>
<img src="images/github_logo.svg" alt="GitHub Logo" id="github" />
`;

document.getElementById('instagram').addEventListener('click', function() {
  window.open('https://www.instagram.com/', '_blank');
});

document.getElementById('linkedin').addEventListener('click', function() {
  window.open('https://www.linkedin.com/', '_blank');
});

document.getElementById('github').addEventListener('click', function() {
  window.open('https://github.com/san20022', '_blank');
});
	

year.innerHTML = `<span class="highlight">&copy${today.getFullYear()} WDD231 Class Project |
				Luis Sanchez<br /> Almolonga, Quetzaltenango, Guatemala<br /></span> 
				<img
				src="images/onion.webp"
				alt="onion image"
				class="flag"
				width="50"
				height="50"
			/>`;

lastModified.innerHTML = `<span class="highlight">Last modification: ${formattedDate}</span>`;