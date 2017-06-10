
function emptyObject(obj){
    if(!obj){
        return true;
    }
    for(var key in obj){
		if(obj[key]){
			return false;
		}
    }
    return true;
}





export { emptyObject };


