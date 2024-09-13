document.getElementById('resume-form')?.addEventListener('submit', function(event: Event) {
    event.preventDefault();

    // Get form values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phoneNo = (document.getElementById('phone-no') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Update resume output
    const personalInfoOutput = document.getElementById('output-personal-info');
    const educationOutput = document.getElementById('output-education');
    const workExperienceOutput = document.getElementById('output-work-experience');
    const skillsOutput = document.getElementById('output-skills');

    if (personalInfoOutput) {
        personalInfoOutput.innerHTML = `Name: <span class="editable-content">${name}</span><br>Email: <span class="editable-content">${email}</span><br>Phone No: <span class="editable-content">${phoneNo}</span>`;
    }
    if (educationOutput) educationOutput.innerHTML = `<span class="editable-content">${education}</span>`;
    if (workExperienceOutput) workExperienceOutput.innerHTML = `<span class="editable-content">${workExperience}</span>`;
    if (skillsOutput) skillsOutput.innerHTML = `<span class="editable-content">${skills}</span>`;
});

document.getElementById('resume-output')?.addEventListener('click', function(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.classList.contains('edit-btn')) {
        const section = target.dataset.section!;
        const contentElement = document.getElementById(`output-${section}`) as HTMLElement;

        if (contentElement) {
            contentElement.setAttribute('contenteditable', 'true');
            contentElement.focus();

            // Change the button to "Save"
            target.textContent = 'Save';
            target.classList.remove('edit-btn');
            target.classList.add('save-btn');
        } else {
            console.error(`Content element for section ${section} not found.`);
        }
    } else if (target.classList.contains('save-btn')) {
        const section = target.dataset.section!;
        const contentElement = document.getElementById(`output-${section}`) as HTMLElement;

        if (contentElement) {
            contentElement.setAttribute('contenteditable', 'false');

            // Change the button back to "Edit"
            target.textContent = '✏️ Edit';
            target.classList.remove('save-btn');
            target.classList.add('edit-btn');
        } else {
            console.error(`Content element for section ${section} not found.`);
        }
    }
});
