const teamData = [
    {
        name: "Nidhi Kumari",
        avatar: "assets/i5.png",
        interest: "Full-Stack Development",
        hometown: "Patna"
    },
    {

        name: 'Annamalai Subramanian ',
        avatar: 'assets/i1.jpeg',
        interest: 'mobile development ',
        hometown: 'Chennai'
    },
    {   
        name: 'Naveen Babu Yadlapalli',
        avatar: 'assets/i2.jpeg',
        interest: 'Data Engineering and Accessibility.',
        hometown: 'Madhira'
    },
    {
        name: 'Manaswini Akula',
        avatar: 'assets/i6.png',
        interest: 'Web Development .',
        hometown: 'Hyderabad'
    },
    {
        name: 'Sumana Sree Yalavarthi',
        avatar: 'assets/i7.png',
        interest: 'mobile development' ,
        hometown: 'Guntur'
      },
      {
        name: 'Vijay Akkenapally',
        avatar: 'assets/i3.jpg',
        interest: 'Data Engineering',
        hometown: 'Hyderabad'
    },
    {

        name: 'Shravya Vemula',
        avatar: 'assets/i8.png',
        interest: 'Web Development .',
        hometown: 'Hyderabad'
    },
    {
        name: 'Nageswar chodisetti',
        avatar: 'assets/i9.jpeg',
        interest: 'AI and Ml .',
        hometown: 'Kakinada'
      }
    
];

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.getElementById('body').classList.add('dark-mode');
    }
});

themeToggle.addEventListener("click", () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.getElementById('body').classList.add('dark-mode');
    }
    document.body.classList.toggle("dark-mode");

    // Toggle the icon source based on the theme
    if (document.body.classList.contains("dark-mode")) {
        themeIcon.src = 'assets/moon.png';
        themeIcon.alt = "Switch to dark mode";
        localStorage.setItem('darkMode', 'enabled');
    } else {
        themeIcon.src = 'assets/sun.png';
        themeIcon.alt = "Switch to light mode";
        localStorage.setItem('darkMode', 'disabled');
    }
});

function renderTeamMembers() {
    const membersContainer = document.getElementById("members-container");
    membersContainer.innerHTML = "";

    teamData.forEach(member => {
        const memberDiv = document.createElement("div");
        memberDiv.classList.add("member");
        memberDiv.innerHTML = `
            <img src="${member.avatar}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>Interests: ${member.interest}</p>
            <p>Hometown: ${member.hometown}</p>
        `;
        membersContainer.appendChild(memberDiv);
    });
}

// Call the function to display the team members when the page loads
document.addEventListener("DOMContentLoaded", function () {
    renderTeamMembers();
});


function initMap() {
    // The location you want to center the map on
    const location = { lat: 28.644800, lng: 77.216721 }; // Example: New Delhi, India

     // Create a map object and specify the DOM element for display
     const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10, // Zoom level
        center: location, // Center the map on the specified location
    });

    //location of people
    const people = [
        { name: "Nidhi", lat: 25.5941, lng: 85.1376, desc: "Patna" ,imageUrl: "assets/i5.png"},
        { name: "Annamalai", lat: 13.0843, lng: 80.2705, desc: "Chennai",imageUrl:"assets/i1.jpeg" },
        { name: "Naveen", lat: 16.9182, lng: 80.3633, desc: "Madhira",imageUrl:"assets/i2.jpeg" },
        { name: "Shravya", lat: 17.4065, lng: 78.4771, desc: "Hyderabad",imageUrl:"assets/i6.png" },
        { name: "Sumana", lat: 16.3067, lng: 80.4365, desc: "Guntur",imageUrl:"assets/i7.png" },
        { name: "Vijay", lat: 17.4065, lng: 78.4776, desc: "Hyderabad",imageUrl:"assets/i3.jpg" },
        { name: "Manaswini", lat: 17.4065, lng: 78.4772, desc: "Hyderabad",imageUrl:"assets/i8.png" },
        { name: "Nageswar", lat: 16.9891, lng: 82.2475, desc: "Kakinada",imageUrl: "assets/i9.jpeg"}
    ];

    // Add markers to the map
    people.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name,
            icon: {
                url: location.imageUrl,
                scaledSize: new google.maps.Size(50, 50), // Set the size of the avatar marker
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(25, 25) // Centers the marker
            }
        });

        // Info window for each marker
        const infoWindow = new google.maps.InfoWindow({
            content: `<h4>${location.name}</h4><p>Lat: ${location.lat}, Lng: ${location.lng}</p>`
        });

        // Show info window on marker click
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Load the Google Maps API
// function loadScript() {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=APIKEY&callback=initMap`;
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);
// }

// Call loadScript when the window loads
//window.onclick = loadScript;
window.onload = initMap;