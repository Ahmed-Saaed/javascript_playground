const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkerForm = document.getElementById('bookmark-form');
const submitButton = document.getElementById('submit-button');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');
const showColorBtn = document.getElementById('switch-color');
const colorBoxContainer = document.getElementById('box-container');

let bookmarks = [];
// show modal, focus on input

function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Validate Form // regex for urls
function validate(nameValue, urlValue) {
  const expression =
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields.');
    return false;
  }
  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address.');
    return false;
  }
  // Valid
  return true;
}

// Build Bookmarks Dom
function buildBookmarks() {
  //remove all bookmark elements
  bookmarksContainer.textContent = '';
  // Build items
  bookmarks.forEach((bookmark) => {
    const {name, url} = bookmark;

    // ITEM
    const item = document.createElement('div');
    item.classList.add('item');
    // Close Icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
    // Favicon / Link container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    //Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute(
      'src',
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute('alt', 'favicon');
    //Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;

    //append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.append(item);
  });
}

// fetch our bookmarks from localstorage if available
function fetchBookmarks(e) {
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    //create bookmarks array in localstorage
    bookmarks = [
      {
        name: 'ahmed',
        url: 'https://ahmed.com',
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// Delete bookmark

function deleteBookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  // update bookmarks array in localStorage ,re-populate Dom

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;

  if (!urlValue.includes('http://') && !urlValue.includes('https://')) {
    urlValue = `https://${urlValue}`;
  }

  // Validate
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  // Set bookmark object, add to array
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  // Set bookmarks in localStorage, fetch, reset input fields
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkerForm.reset();
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () =>
  modal.classList.remove('show-modal')
);
window.addEventListener('click', (e) =>
  e.target === modal || e.target === submitButton
    ? modal.classList.remove('show-modal')
    : false
);
//Event listener
bookmarkerForm.addEventListener('submit', storeBookmark);
showColorBtn.addEventListener('click', () =>
  colorBoxContainer.classList.toggle('show-color')
);
// onload
fetchBookmarks();
