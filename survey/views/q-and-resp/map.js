function(doc) {
	// Output list of surveys keyed by their id and responses keyed by the survey they
	// respond to. Surveys are marked by 0, responses by 1. key= parameter can be used
	// to limit view to only one reponse
	if(doc.type == "survey" && doc.title && doc.order && doc.order.length > 0) {
		for(var i=0; i<doc.order.length; i++) {
			var q_name = doc.order[i]; //question1
			var q = doc[q_name]; // table doc.question1
			var a = q['answers'];
			for(var j=0; j<a.length; j++) {
				emit([doc._id, q_name, 0, q.ask, a[j]], 0);
			}
		}
	} else
	if(doc.type == "survey_response" && doc.response_to) {
		for(var key in doc) {
			// iterate through key to determine answers
			if(key != "_id" && key != "_rev" && key != "created_at"
				&& key != "response_to" && key != "type") {
				// this must be answer
				var q = key;
				var a = doc[q];
				if(typeof(a) == "string")
					emit([doc.response_to, q, 1, a], 1);
				if(typeof(a) == "object") {
					for(var k=0; k<doc[key].length; k++) {
						emit([doc.response_to, q, 1, a[k]], 1);
					}
				}
			}
		}
	}
}