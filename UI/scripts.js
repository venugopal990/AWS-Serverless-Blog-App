$(document).ready(function() {
	
	const AWS_URL = 'https://leyayxlnz9.execute-api.us-east-1.amazonaws.com/development/blogposts';

	
    // Function to fetch all blog posts
	function getAllPosts() {
		$('.overlay').css("display", "block");
		$.get(AWS_URL, function(response) {
			
			

			// Parse the JSON response
			const result = JSON.stringify(response.body)
			var data = JSON.parse(result);


			// Handle the response from the API
			var postsHTML = '';
			data.forEach(function(post) {
				postsHTML += `
					<div class="card mb-3">
						<div class="card-body">
							<h5 class="card-title">${post.title}</h5>
							<p class="card-text">${post.content}</p>
							<a href="${post.url}" class="btn btn-primary">Read More</a>
							<button class="btn btn-danger delete-post" data-id="${post.postId}">Delete</button>
						</div>
					</div>
				`;
			});
			if(postsHTML == ''){
				postsHTML = 'No Blogs Found'
			}
				
			$('#blogPosts').html(postsHTML);
		}).fail(function() {
			// Handle errors if the API call fails
			console.log('Failed to fetch blog posts.');
		});
		
		
	    $('.overlay').css("display", "none");
		$('.container').css("display", "block");
	}


    // Get all posts when the page loads
    getAllPosts();

    // Event listener for the add post form
    $('#addPostForm').submit(function(event) {
        event.preventDefault();
		
		var settings = {
		  "url": AWS_URL,
		  "method": "POST",
		  "timeout": 0,
		  "headers": {
			"Content-Type": "application/json"
		  },
		  "data": JSON.stringify({
			"title": $('#title').val(),
			"content": $('#content').val(),
		  }),
		};
		
		
		$.ajax(settings).done(function (response) {
			// Parse the JSON response
			//const result = JSON.stringify(response.body);
			var data = JSON.parse(response.body);
			console.log("new data:"+data);
			console.log("new datatttt:"+ data.message);

			$('.toast-body').html(data.message);
			$('.toast').toast('show');
		});

        // Mock response
        console.log('New post added:', { title: title, content: content });


		// Close the modal
        $('#addPostModal').modal('hide');
		
		
        // Clear form fields
        $('#title').val('');
        $('#content').val('');

		$('.overlay').css("display", "block");
		$('.container').css("display", "none");
		setTimeout(getAllPosts, 2000);
    });

    // Event listener for deleting a post
    $(document).on('click', '.delete-post', function() {
        var postId = $(this).data('id');
		
		var settings = {
		  "url": AWS_URL,
		  "method": "DELETE",
		  "timeout": 0,
		  "headers": {
			"Content-Type": "application/json"
		  },
		  "data": JSON.stringify({
			"postId": $(this).data('id'),

		  }),
		};

         $.ajax(settings).done(function (response) {
			// Parse the JSON response
			var data = JSON.parse(response.body);
			$('.toast-body').html(data.message);
			$('.toast').toast('show');
		});

        // Mock response
        console.log('Post deleted with ID:', postId);

	    $('.overlay').css("display", "block");
		$('.container').css("display", "none");
		setTimeout(getAllPosts, 2000);
    });
});
