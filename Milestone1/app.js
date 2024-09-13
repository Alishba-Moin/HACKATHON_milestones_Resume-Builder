// Element Selection:
var toggleSkillsButton = document.getElementById('toggle-skills');
var skillsSection = document.getElementById('skills');
skillsSection.style.display = 'block';
// Toggle Function:
function toggleSkills() {
    if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
        skillsSection.style.display = 'block';
    }
    else {
        skillsSection.style.display = 'none';
    }
}
// Event Listener:
toggleSkillsButton.addEventListener('click', toggleSkills);
