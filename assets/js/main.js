/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

/* Menu hidden */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById('header')
  if (this.scrollY >= 50) header.classList.add('shadow-header')
  else header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

// Web3Forms: free form-to-email service that works on static sites (GitHub Pages).
// Get your access key at https://web3forms.com (enter your email, the key is emailed to you).
// The key is meant to be public, so it is safe to leave in this file.
const WEB3FORMS_ACCESS_KEY = '3c2736d0-be1f-409a-8894-0e826efadf45'

const sendEmail = async (e) => {
  e.preventDefault()

  if (WEB3FORMS_ACCESS_KEY === 'PASTE_YOUR_ACCESS_KEY_HERE') {
    contactMessage.textContent = 'Email service not configured yet.'
    return
  }

  const form = new FormData(contactForm)
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    name: form.get('user_name'),
    email: form.get('user_email'),
    subject: form.get('user_subject'),
    message: form.get('user_message'),
    botcheck: form.get('botcheck') || ''
  }

  contactMessage.textContent = 'Sending...'

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
    const result = await response.json()

    if (response.ok && result.success) {
      contactMessage.textContent = 'Message sent successfully!'
      contactForm.reset()
      setTimeout(() => { contactMessage.textContent = '' }, 5000)
    } else {
      contactMessage.textContent = 'Message not sent (service error)'
    }
  } catch (error) {
    contactMessage.textContent = 'Message not sent (network error)'
  }
}

if (contactForm) {
  contactForm.addEventListener('submit', sendEmail)
}

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUpEl = document.getElementById('scroll-up')
  if (this.scrollY >= 350) scrollUpEl.classList.add('show-scroll')
  else scrollUpEl.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollY = window.pageYOffset

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute('id')

    const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

    if (sectionsClass) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        sectionsClass.classList.add('active-link')
      } else {
        sectionsClass.classList.remove('active-link')
      }
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button'),
      darkTheme = 'dark-theme',
      iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme'),
      selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a theme
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-sun-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
  themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
  })
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
// Note: ScrollReveal was removed from this project's index.html.
// If you'd like scroll-in animations back, re-add the script tag
// <script src="assets/js/scrollreveal.min.js"></script> before this file,
// then add ScrollReveal().reveal(...) calls here.
