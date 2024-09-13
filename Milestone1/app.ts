// Element Selection:
const toggleSkillsButton = document.getElementById('toggle-skills') as HTMLButtonElement;
const skillsSection = document.getElementById('skills') as HTMLElement;

skillsSection.style.display = 'block';

// Toggle Function:
function toggleSkills() {
    if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
        skillsSection.style.display = 'block';
    } else {
        skillsSection.style.display = 'none';
    }
}


// Event Listener:
toggleSkillsButton.addEventListener('click', toggleSkills);