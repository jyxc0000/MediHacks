document.addEventListener("DOMContentLoaded", function () {
    // Get references to HTML elements
    const postForm = document.getElementById("post-form");
    const postEmotionSelect = document.getElementById("post-emotion");
    const postContentInput = document.getElementById("post-content");
    const postImageInput = document.getElementById("post-image");
    const postList = document.getElementById("post-list");
    const modal = document.querySelector(".modal");

    // Function to remove a forum post
    function removePost(postElement, index) {
        // Remove the post from the HTML
        postElement.remove();

        // Remove the post from localStorage
        const savedPosts = JSON.parse(localStorage.getItem("forumPosts")) || [];
        savedPosts.splice(index, 1);
        localStorage.setItem("forumPosts", JSON.stringify(savedPosts));
    }

    // Function to create a post element with a "Remove" button
    function createPostElement(post, index) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <p><strong>I'm feeling:</strong> ${post.emotion}</p> <!-- Updated here -->
            <p>${post.content}</p>
            <p><small>Posted at: ${post.timestamp}</small></p>
            <img src="${post.image}" alt="Post Image" class="post-image">
            <button class="remove-button">Remove</button>
        `;

        // Add a click event listener to the "Remove" button
        const removeButton = listItem.querySelector(".remove-button");
        removeButton.addEventListener("click", function () {
            removePost(listItem, index);
        });

        // Add a click event listener to the image to open the modal
        const postImage = listItem.querySelector(".post-image");
        postImage.addEventListener("click", function () {
            modal.innerHTML = `<img src="${post.image}" alt="Full-sized Image" class="modal-content">`;
            modal.style.display = "block";
        });

        return listItem;
    }

    // Function to add a new forum post
    function addPost(emotion, content, image, timestamp) {
        const listItem = createPostElement({ emotion, content, image, timestamp }, -1);
        postList.appendChild(listItem);

        // Save the post to localStorage
        const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
        posts.push({ emotion, content, image, timestamp });
        localStorage.setItem("forumPosts", JSON.stringify(posts));

        // Clear the form inputs
        postEmotionSelect.value = "😃";
        postContentInput.value = "";
        postImageInput.value = "";

        // Close the modal when the "X" button is clicked
        modal.addEventListener("click", function (e) {
            if (e.target.classList.contains("modal")) {
                modal.style.display = "none";
            }
        });
    }

    // Function to handle forum post form submission
    postForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const emotion = postEmotionSelect.value;
        const content = postContentInput.value;
        const image = postImageInput.files[0];
        if (content) {
            const timestamp = new Date().toLocaleString();
            addPost(emotion, content, image ? URL.createObjectURL(image) : '', timestamp);
        }
    });

    // Load and display saved posts from localStorage on page load
    const savedPosts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    savedPosts.forEach((post, index) => {
        const postElement = createPostElement(post, index);
        postList.appendChild(postElement);
    });
});

