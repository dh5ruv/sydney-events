// Sample event data (in a real application, this would come from a backend API)
const eventsData = [
  {
    id: 1,
    title: "Sydney Opera House Concert Series",
    date: "June 15, 2025",
    time: "7:30 PM",
    location: "Sydney Opera House",
    category: "music",
    description: "Experience world-class performances at Sydney's iconic Opera House.",
    image: "/placeholder.svg?height=200&width=300",
    ticketUrl: "https://example.com/tickets/1",
  },
  {
    id: 2,
    title: "Bondi Beach Festival",
    date: "June 20-22, 2025",
    time: "10:00 AM - 10:00 PM",
    location: "Bondi Beach",
    category: "arts",
    description: "A celebration of art, music, and culture at Sydney's famous Bondi Beach.",
    image: "/placeholder.svg?height=200&width=300",
    ticketUrl: "https://example.com/tickets/2",
  },
  {
    id: 3,
    title: "Sydney Food & Wine Festival",
    date: "July 5-6, 2025",
    time: "11:00 AM - 8:00 PM",
    location: "Darling Harbour",
    category: "food",
    description: "Taste the best of Sydney's culinary scene with top chefs and wineries.",
    image: "/placeholder.svg?height=200&width=300",
    ticketUrl: "https://example.com/tickets/3",
  },
  {
    id: 4,
    title: "Sydney Harbour Bridge Run",
    date: "July 12, 2025",
    time: "7:00 AM",
    location: "Sydney Harbour Bridge",
    category: "sports",
    description: "Join thousands of runners in this iconic race across the Sydney Harbour Bridge.",
    image: "/placeholder.svg?height=200&width=300",
    ticketUrl: "https://example.com/tickets/4",
  },
  {
    id: 5,
    title: "Australian Chamber Orchestra",
    date: "July 18, 2025",
    time: "8:00 PM",
    location: "City Recital Hall",
    category: "music",
    description: "An evening of classical masterpieces performed by Australia's premier chamber orchestra.",
    image: "/placeholder.svg?height=200&width=300",
    ticketUrl: "https://example.com/tickets/5",
  },
  {
    id: 6,
    title: "Sydney Contemporary Art Fair",
    date: "August 2-4, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Carriageworks",
    category: "arts",
    description: "Australia's premier international art fair featuring over 90 galleries.",
    image: "/placeholder.svg?height=200&width=300",
    ticketUrl: "https://example.com/tickets/6",
  },
  {
    id: 7,
    title: "Taste of Sydney",
    date: "August 15-17, 2025",
    time: "12:00 PM - 10:00 PM",
    location: "The Rocks",
    category: "food",
    description: "Sample dishes from Sydney's best restaurants all in one place.",
    image: "/placeholder.svg?height=200&width=300",
    ticketUrl: "https://example.com/tickets/7",
  },
  {
    id: 8,
    title: "Sydney Marathon",
    date: "September 21, 2025",
    time: "6:30 AM",
    location: "Sydney CBD",
    category: "sports",
    description: "Run through Sydney's most scenic locations in this annual marathon event.",
    image: "/placeholder.svg?height=200&width=300",
    ticketUrl: "https://example.com/tickets/8",
  },
]

// DOM elements
const eventsContainer = document.getElementById("events-container")
const filterButtons = document.querySelectorAll(".filter-btn")
const searchInput = document.getElementById("search-input")
const emailModal = document.getElementById("email-modal")
const closeModal = document.querySelector(".close-modal")
const emailForm = document.getElementById("email-form")

// Current ticket URL to redirect to
let currentTicketUrl = ""

// Display events
function displayEvents(events) {
  eventsContainer.innerHTML = ""

  if (events.length === 0) {
    eventsContainer.innerHTML = '<p class="no-events">No events found matching your criteria.</p>'
    return
  }

  events.forEach((event) => {
    const eventCard = document.createElement("div")
    eventCard.className = "event-card"
    eventCard.setAttribute("data-category", event.category)

    eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-details">
                <span class="event-category">${capitalizeFirstLetter(event.category)}</span>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-date">${event.date} at ${event.time}</p>
                <p class="event-location">${event.location}</p>
                <p class="event-description">${event.description}</p>
                <button class="ticket-btn" data-url="${event.ticketUrl}">GET TICKETS</button>
            </div>
        `

    eventsContainer.appendChild(eventCard)
  })

  // Add event listeners to ticket buttons
  document.querySelectorAll(".ticket-btn").forEach((button) => {
    button.addEventListener("click", function () {
      currentTicketUrl = this.getAttribute("data-url")
      emailModal.style.display = "flex"
    })
  })
}

// Filter events by category
function filterEvents() {
  const activeCategory = document.querySelector(".filter-btn.active").getAttribute("data-category")
  const searchTerm = searchInput.value.toLowerCase()

  let filteredEvents = eventsData

  // Filter by category
  if (activeCategory !== "all") {
    filteredEvents = filteredEvents.filter((event) => event.category === activeCategory)
  }

  // Filter by search term
  if (searchTerm) {
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm),
    )
  }

  displayEvents(filteredEvents)
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Event listeners
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    // Add active class to clicked button
    this.classList.add("active")
    // Filter events
    filterEvents()
  })
})

searchInput.addEventListener("input", filterEvents)

closeModal.addEventListener("click", () => {
  emailModal.style.display = "none"
})

emailForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const email = document.getElementById("email-input").value
  const optIn = document.getElementById("opt-in").checked

  // In a real application, you would send this data to your server
  console.log("Email:", email)
  console.log("Opt-in:", optIn)

  // Redirect to the ticket URL
  if (currentTicketUrl) {
    // Store the email in localStorage (in a real app, you'd send this to your server)
    localStorage.setItem("userEmail", email)
    localStorage.setItem("emailOptIn", optIn)

    // Perform the actual redirect
    window.location.href = currentTicketUrl
  }

  // Close the modal
  emailModal.style.display = "none"

  // Reset the form
  emailForm.reset()
})

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
  if (e.target === emailModal) {
    emailModal.style.display = "none"
  }
})

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  displayEvents(eventsData)
})

// Simulating automatic updates (in a real application, this would be a server-side process)
// This is just for demonstration purposes
function simulateNewEvents() {
  // In a real application, you would fetch new events from your server
  console.log("Checking for new events...")

  // For demonstration, we'll add a new event after 30 seconds
  setTimeout(() => {
    const newEvent = {
      id: eventsData.length + 1,
      title: "New Sydney Jazz Festival",
      date: "October 10, 2025",
      time: "6:00 PM",
      location: "Hyde Park",
      category: "music",
      description: "A celebration of jazz music featuring local and international artists.",
      image: "/placeholder.svg?height=200&width=300",
      ticketUrl: "https://example.com/tickets/new",
    }

    eventsData.unshift(newEvent)
    filterEvents()

    // Show a notification
    const notification = document.createElement("div")
    notification.className = "notification"
    notification.textContent = "New event added: " + newEvent.title
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 5000)
  }, 30000) // 30 seconds
}

// Start the simulation
simulateNewEvents()
