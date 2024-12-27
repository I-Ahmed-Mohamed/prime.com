  // Function to get stored last view time or set to 0 if not available
  function getLastViewTime(videoId) {
    return localStorage.getItem(videoId) ? parseInt(localStorage.getItem(videoId)) : 0;
}

// Handle all video cards dynamically
document.querySelectorAll('.video-card').forEach((card, index) => {
    const video = card.querySelector('video');
    const thumbnail = card.querySelector('.video-thumbnail');
    const progressBar = card.querySelector('.progress-fill');
    const viewCountSpan = card.querySelector('.view-count span');
    const videoId = `video${index + 1}`; // Generate dynamic video ID

    // Initialize or get stored view count
    let viewCount = localStorage.getItem(`${videoId}_viewCount`);
    viewCount = viewCount ? parseInt(viewCount) : 0;

    // Update view count text initially
    viewCountSpan.innerText = `Views: ${viewCount} | Progress: 0%`;

    // Show video and hide thumbnail on click
    thumbnail.addEventListener('click', () => {
        thumbnail.style.display = 'none'; // Hide thumbnail
        video.style.display = 'block'; // Show video
        video.play(); // Play video
    });

    // Increment views when video starts
    video.addEventListener('play', () => {
        const lastViewTime = getLastViewTime(videoId);
        const currentTime = Date.now();

        // Increment views only if it's been more than 1 minute
        if (!video.dataset.viewed && currentTime - lastViewTime > 60 * 1000) { // 1 minute in ms
            viewCount++;
            localStorage.setItem(videoId, currentTime); // Store current time as last view
            localStorage.setItem(`${videoId}_viewCount`, viewCount); // Store view count

            viewCountSpan.innerText = `Views: ${viewCount} `;
            video.dataset.viewed = true; // Mark as viewed
        }
    });

    // Update progress bar and percentage
    video.addEventListener('timeupdate', () => {
        const watchedPercentage = (video.currentTime / video.duration) * 100;

        progressBar.style.width = `${watchedPercentage}%`;
        viewCountSpan.innerText = `Views: ${viewCount} `;
    });
});