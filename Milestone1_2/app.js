// Element Selection
var programmingSkillsButton = document.getElementById('toggle-programming-skills');
var frameworksSkillsButton = document.getElementById('toggle-frameworks-skills');
var skillsSection = document.getElementById('skills');
var otherSkillsSection = document.getElementById('other-skills');
// Initially set both sections to be visible
skillsSection.style.display = 'flex';
otherSkillsSection.style.display = 'flex';
// Function to toggle programming skills
function toggleProgrammingSkills() {
    if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
        skillsSection.style.display = 'flex'; // Show Programming Skills
        programmingSkillsButton.textContent = '-'; // Change button text
    }
    else {
        skillsSection.style.display = 'none'; // Hide Programming Skills
        programmingSkillsButton.textContent = '+'; // Change button text
    }
}
// Function to toggle frameworks skills
function toggleFrameworksSkills() {
    if (otherSkillsSection.style.display === 'none' || otherSkillsSection.style.display === '') {
        otherSkillsSection.style.display = 'flex'; // Show Frameworks & Libraries
        frameworksSkillsButton.textContent = '-'; // Change button text
    }
    else {
        otherSkillsSection.style.display = 'none'; // Hide Frameworks & Libraries
        frameworksSkillsButton.textContent = '+'; // Change button text
    }
}
// Event Listeners
programmingSkillsButton.addEventListener('click', toggleProgrammingSkills);
frameworksSkillsButton.addEventListener('click', toggleFrameworksSkills);
