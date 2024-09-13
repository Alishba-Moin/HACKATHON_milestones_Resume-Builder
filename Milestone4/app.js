var _a, _b;
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phoneNo = document.getElementById('phone-no').value;
    var education = document.getElementById('education').value;
    var workExperience = document.getElementById('work-experience').value;
    var skills = document.getElementById('skills').value;
    // Update resume output
    var personalInfoOutput = document.getElementById('output-personal-info');
    var educationOutput = document.getElementById('output-education');
    var workExperienceOutput = document.getElementById('output-work-experience');
    var skillsOutput = document.getElementById('output-skills');
    if (personalInfoOutput) {
        personalInfoOutput.innerHTML = "Name: <span class=\"editable-content\">".concat(name, "</span><br>Email: <span class=\"editable-content\">").concat(email, "</span><br>Phone No: <span class=\"editable-content\">").concat(phoneNo, "</span>");
    }
    if (educationOutput)
        educationOutput.innerHTML = "<span class=\"editable-content\">".concat(education, "</span>");
    if (workExperienceOutput)
        workExperienceOutput.innerHTML = "<span class=\"editable-content\">".concat(workExperience, "</span>");
    if (skillsOutput)
        skillsOutput.innerHTML = "<span class=\"editable-content\">".concat(skills, "</span>");
});
(_b = document.getElementById('resume-output')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (event) {
    var target = event.target;
    if (target.classList.contains('edit-btn')) {
        var section = target.dataset.section;
        var contentElement = document.getElementById("output-".concat(section));
        if (contentElement) {
            contentElement.setAttribute('contenteditable', 'true');
            contentElement.focus();
            // Change the button to "Save"
            target.textContent = 'Save';
            target.classList.remove('edit-btn');
            target.classList.add('save-btn');
        }
        else {
            console.error("Content element for section ".concat(section, " not found."));
        }
    }
    else if (target.classList.contains('save-btn')) {
        var section = target.dataset.section;
        var contentElement = document.getElementById("output-".concat(section));
        if (contentElement) {
            contentElement.setAttribute('contenteditable', 'false');
            // Change the button back to "Edit"
            target.textContent = '✏️ Edit';
            target.classList.remove('save-btn');
            target.classList.add('edit-btn');
        }
        else {
            console.error("Content element for section ".concat(section, " not found."));
        }
    }
});
