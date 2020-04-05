const
    imageData = document.querySelector('#image-data'),
    profileData = document.querySelector('#profile-data'),
    heading = document.querySelector('#heading'),
    nextButton = document.querySelector('#next-button'),
    data = document.querySelector('#data');

const profiles = [
    {
        name: 'Guido Van Hoof',
        age: 49,
        gender: 'male',
        lookingFor: 'female',
        location: 'Herenthout',
        image: 'https://randomuser.me/api/portraits/men/66.jpg'
    },
    {
        name: 'Christel De Ceuster',
        age: 49,
        gender: 'female',
        lookingFor: 'male',
        location: 'Olen',
        image: 'https://randomuser.me/api/portraits/women/66.jpg'
    },
    {
        name: 'Christel Meyvis',
        age: 54,
        gender: 'female',
        lookingFor: 'female',
        location: 'Lille',
        image: 'https://randomuser.me/api/portraits/women/88.jpg'
    },
];

function createProfilesIterator(profiles) {
    console.log(`>>> createProfilesIterator(${JSON.stringify(profiles)})`);
    let nextIndex = 0;
    return {
        next: function () {
            console.log('>>> next()');
            return nextIndex < profiles.length
                    ? {value: profiles[nextIndex++], done: false}
                    : {done: true};
        }
    };
}

const profilesIterator = createProfilesIterator(profiles);

function showImage(imageLink) {
    console.log(`>>> showImage(${imageLink})`);
    imageData.innerHTML = `
        <img src="${imageLink}" alt="profile-image">
    `;
}

function showProfile(profile) {
    console.log(`>>> showProfile(${profile})`);
    profileData.innerHTML = `
        <ul class="list-group">
            <li class="list-group-item">Name: ${profile.name}</li>
            <li class="list-group-item">Age: ${profile.age}</li>
            <li class="list-group-item">Gender: ${profile.gender}</li>
            <li class="list-group-item">Location: ${profile.location}</li>
            <li class="list-group-item">Looking For: ${profile.lookingFor}</li>
        </ul>
    `;
}

function hideMessage() {
    document.querySelector('.alert').remove();
}

function createMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.innerText = 'No More Profiles!';
    messageDiv.className = 'alert alert-info';
    return messageDiv;
}

function disableNextButton() {
    nextButton.classList.add('disabled');
}

function showMessage() {
    const messageDiv = createMessage();
    data.insertBefore(messageDiv, heading);
    setTimeout(hideMessage, 2500);
    disableNextButton();
}

function nextProfile() {
    console.log('>>> nextProfile()');
    const profile = profilesIterator.next();
    console.log(`>>> profile = ${JSON.stringify(profile)}`);
    if (profile.done) {
        showMessage();
    } else {
        showImage(profile.value.image);
        showProfile(profile.value);
    }
}

nextButton.addEventListener('click', nextProfile);
nextProfile();
