function(doc) {
	// Output list of surveys keyed by their id and responses keyed by the survey they
	// respond to. Surveys are marked by 0, responses by 1. key= parameter can be used
	// to limit view to only one reponse
	if(doc.type == "survey") {
		emit([doc._id, 0], doc);
	} else
	if(doc.type == "survey_response") {
		emit([doc.response_to, 1], doc);
	}
}
// Sample output:
//{"id":"5baf93a6d0e7fe88ba1540506500031c","key":["5baf93a6d0e7fe88ba1540506500031c",0],"value":{"_id":"5baf93a6d0e7fe88ba1540506500031c","_rev":"4-a6a4b5702fabf72947e78054af06a2b2","type":"survey","title":"Animals survey","order":["question1","question2","question3"],"question1":{"ask":"What animal do you like most?","type":"radio","answers":["Cat","Horse","Donkey","Dog"]},"question2":{"ask":"What colors do you like?","type":"checkbox","answers":["Red","Brown","Black","Green"]},"question3":{"ask":"Please enter your name","type":"text","answers":[""]}}},
//{"id":"55de14aadccf3cfa8dd8af4154002868","key":["5baf93a6d0e7fe88ba1540506500031c",1],"value":{"_id":"55de14aadccf3cfa8dd8af4154002868","_rev":"1-b4e359812f759f6d4cdf116eaff0bd4c","question1":"Cat","question2":"Red","question3":"Pawe\u0142","type":"survey_response","response_to":"5baf93a6d0e7fe88ba1540506500031c","created_at":"2011-02-24T20:49:29.853Z"}}
