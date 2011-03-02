function(head, req) {
	/*
	 * Displays a list of responses from a view
	 * Template: templates/responses
	 * View: q-and-resp
	 */
	var row, ddoc = this;
    var Mustache = require("vendor/couchapp/lib/mustache");
    var Path = require("vendor/couchapp/lib/path").init(req);
	var abs = Path.asset();
	var survey_list = Path.list('surveys', 'all-surveys');
	var survey_results = Path.list('results', 'all-results');
    var data = {
      page_title : "Responses to survey X", // XXX
      site_title : this.couchapp.name,
      abs : abs,
      survey_list : survey_list,
      survey_results : survey_results,
      questions : []
    };
    provides("html", function() {
    	var last_q;
    	var question = {q : "", a : []};
	    while (row = getRow()) {
	    	var type = row.key[2]; //0=question,1=answers
	    	var id = row.key[0];
	    	var q_id = row.key[1]; //question1
	    	var text = row.key[3];
	    	var count = row.value;
	    	log([text, type, question]);
	    	if(type == 0 && question.a.length > 0) {
	    		data.questions.push(JSON.parse(JSON.stringify(question))); // push clone
	    		question.a = [];
	    	}
	    	if(type == 0) {
	    		question.q = text;
	    	}
	    	if (type == 1) {
	    		question.a.push({ answer : text, count : count });
	    	}    
	    }; //while row
	    data.questions.push(JSON.parse(JSON.stringify(question))); // push last chunk
	   // return JSON.stringify(data);
	    return Mustache.to_html(ddoc.templates.responses, data, ddoc.templates.partials);
  }); //provides
}