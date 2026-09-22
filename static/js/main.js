// Terminal typing effect
document.addEventListener('DOMContentLoaded', function() {
    const typingElements = document.querySelectorAll('.typing');
    typingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
});

// Fetch GitHub activity
document.addEventListener('DOMContentLoaded', async function() {
    const activityElement = document.getElementById('github-activity');
    
    try {
        const response = await fetch('https://api.github.com/users/daniel-vdp/events');
        const events = await response.json();
        
        if (!response.ok) {
            throw new Error('GitHub API rate limit or error');
        }
        
        const recentEvents = events.slice(0, 10).map(event => {
            const date = new Date(event.created_at).toISOString().slice(0, 19) + 'Z';
            const type = event.type.replace('Event', '');
            const repo = event.repo.name;
            return `${date} ${type} ${repo}`;
        });
        
        activityElement.innerHTML = `<pre>${recentEvents.join('\n')}</pre>`;
    } catch (error) {
        // Remove the entire curl section if API fails
        const curlSection = activityElement.closest('.output').previousElementSibling;
        if (curlSection && curlSection.classList.contains('terminal-line')) {
            curlSection.remove();
            activityElement.closest('.output').remove();
        }
    }
});