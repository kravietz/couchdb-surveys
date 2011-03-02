function(doc) {
  if(doc.type == "survey")
	  emit(null, doc);
}