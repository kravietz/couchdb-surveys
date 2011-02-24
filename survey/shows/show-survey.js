function(doc, req) { 
	if(doc.type == 'survey' && doc.title && doc.order && doc.order.length > 0) {
		var ddoc = this;
		var Mustache = require("vendor/couchapp/lib/mustache");
		var Path = require("vendor/couchapp/lib/path").init(req);
		var abs = Path.asset();
		var db = req.path[0];
		var data = {
	      page_title : this.couchapp.name,
	      site_title : doc.title,
	      abs : abs,
	      db : db,
	      response_to : doc._id,
	      questions : []
		};
		  for(var i=0; i<doc.order.length; i++) {
			 var q_name = doc.order[i]; //question1
			 var q = doc[q_name]; // table doc.question1
			 if(q.ask && q.type && q.answers) {
				 var new_q = { // template
						  ask : q.ask,
						  answers : []	 
				 }; //new_q
				 var answers_from = q['answers'];
				 var answers_to = [];
				 for(var j=0; j<answers_from.length; j++) {
						answers_to.push( { answer : answers_from[j], type : q.type, q : q_name } );
					}; //for answers
				 new_q.answers = answers_to;
				 data.questions.push(new_q);
			 }; // q.ask
		  }; //for questions
//	   return "data=" + JSON.stringify(data);
	   return Mustache.to_html(ddoc.templates.survey, data, ddoc.templates.partials);
  }
}