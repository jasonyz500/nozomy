//route for GET /posts
function getAllPosts(request, reply) {
	console.log("get posts payload: "+JSON.stringify(request.payload));
	console.log(request.payload.start_date);
	console.log(request.payload.end_date);
	mongodb.getAllPosts(request.payload,  function(response) {
		reply(response);
	});
}

// route for GET /charts/:id
function getSinglePost(request, reply) {
	console.log("get single post id: " + JSON.stringify(request.params.id));
	mongodb.getSinglePost(request.params.id, function(response) {
		reply(response);
	});
}

// route for POST /posts/new
function createPost(request, reply) {
	console.log("create post payload: "+JSON.stringify(request.payload));
	mongodb.createPost(request.payload, function(response) {
		reply(response);
	});
}

//route for GET /write_page/:cutoff_date
function getWritePage(request, reply) {
	console.log("get cutoff_date: " + JSON.stringify(request.payload));
	user_name = 'qingzou'
    params = {}
	params['cutoff_date'] = request.payload.cutoff_date
	params['user_name'] = user_name
	reflection_ids = []
	mongodb.getWritePage(params, function(writepage) {
       if (writepage == null) {
           settingparams = {}
           settingparams['user_name'] = user_name
		   mongodb.getWritePageSettings(settingparams, function(writepagesettings) {
		      console.log('writepagesettings' + writepagesettings)
		      jsonObj = JSON.parse(writepagesettings)
		      prompts = jsonObj['reflection_prompts']
		      count =0;
		      for (prompt of prompts) {
		          console.log('prompt ' + prompt)
		          reflection = {}
		          reflection['user_name'] = user_name
		          reflection['reflection_cutoff_date'] = JSON.stringify(request.payload)
		          reflection['reflection_prompt'] = prompt
		          reflection['reflection_body'] = ''
		          mongodb.createReflection(reflection, function(response) {
		              console.log('reflection id' + response);
		              reflection_ids.push(response)
		              count++
		              if(count == prompts.length) {
                          newWritePage = {}
                          newWritePage['user_name']= user_name
                          newWritePage['reflection_ids']= reflection_ids
                          newWritePage['cutoff_date']= JSON.stringify(request.payload)
                          mongodb.createWritePage(newWritePage, function(response) {
                                  console.log('newWritePage id' + response);
                                  newWritePage['id'] = response
                                  console.log(JSON.stringify(newWritePage))
                                  reply(JSON.stringify(newWritePage))
                          })
                      }
		          })
		      }
		   });
	   }
	   else {
	       reply(JSON.stringify(writepage))
	   }
	});
}

exports.register = function (server, options, next) {

	mongodb = server.plugins.mongodb.mongodbClient;

	server.route({
		path: '/posts',
		method: 'POST',
		handler: getAllPosts
	});

	server.route({
		path: '/posts/{id}',
		method: 'GET',
		handler: getSinglePost
	});

	server.route({
		path: '/posts/new',
		method: 'POST',
		handler: createPost
	});

	server.route({
        path: '/write_page',
        method: 'POST',
        handler: getWritePage
    });

	next();
};

exports.register.attributes = {
  name: 'routes',
  version: '1.0.0'
};
