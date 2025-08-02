const bgMusic = document.getElementById('bgMusic');
const toggleBtn = document.getElementById('musicToggleBtn');

let musicStarted = false;

// Handle music toggle
function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      toggleBtn.innerText = '🔇 Pause Music';
    }).catch((err) => {
      console.error("Autoplay blocked:", err);
    });
  } else {
    bgMusic.pause();
    toggleBtn.innerText = '🔈 Play Music';
  }
}

// Play music once on first interaction
function playMusicOnce() {
  if (!musicStarted) {
    bgMusic.play().then(() => {
      toggleBtn.innerText = '🔇 Pause Music';
      musicStarted = true;
    }).catch((err) => {
      console.warn("Autoplay blocked until user interacts:", err);
    });
  }
}

// Try auto-playing on load (may fail due to browser policy)
window.addEventListener('load', () => {
  bgMusic.play().then(() => {
    toggleBtn.innerText = '🔇 Pause Music';
    musicStarted = true;
  }).catch(() => {
    toggleBtn.innerText = '🔈 Play Music';
  });
});

// Array of random wishes
const wishes = [
  "Hey [NAME], you're the rainbow after my storms! 🌈",
  "Hey [NAME], you're one of the kindest souls I know! 🤗",
  "Hey [NAME], friends like you make life beautiful! 💫",
  "Hey [NAME], your friendship is a true blessing! 🙏",
  "Hey [NAME], you're my partner in all mischiefs! 😄",
  "Hey [NAME], you're the peanut butter to my jelly! 🥪",
  "Hey [NAME], thanks for making every moment brighter! ☀️",
  "Hey [NAME], cheers to all our inside jokes! 😂",
  "Hey [NAME], you're my constant in this crazy world! 🌍",
  "Hey [NAME], you're a gift I never asked for but always needed! 🎁"
];

// Generate a personalized wish
document.getElementById('generateBtn').addEventListener('click', function () {
  playMusicOnce();

  const name = document.getElementById('nameInput').value.trim();
  const wishCard = document.getElementById('wishCard');

  if (!name) {
    alert('Please enter your name!');
    return;
  }

  const randomIndex = Math.floor(Math.random() * wishes.length);
  const wishText = wishes[randomIndex].replace('[NAME]', name);
  const quoteText = `${name}, you're a true gem in my life. Thank you for your friendship! 💛`;

  document.getElementById('wishText').innerText = wishText;
  document.getElementById('quoteText').innerText = quoteText;
  wishCard.classList.remove('hidden');

  // Setup WhatsApp share
  const msg = `${wishText}\n\nHappy Friendship Day! 💖\nhttps://yourdomain.com`;
  const encoded = encodeURIComponent(msg);
  document.getElementById('whatsappShare').href = `https://wa.me/?text=${encoded}`;
});

// Download poster
function downloadPoster() {
  const poster = document.getElementById('poster');
  html2canvas(poster).then(canvas => {
    const link = document.createElement('a');
    link.download = 'friendship-poster.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}
