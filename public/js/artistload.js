function fillDOM(year){
    var title = document.getElementById("lineupArchive");
    title.innerHTML = "L I N E U P    "+ year;
    var jsonPath="./archive/"+year+"/artists.json";
    jQuery.getJSON(jsonPath, function(acts){
        console.log("Found");
        console.log(acts.length);
        shuffleArray(acts);
        

        var container = document.getElementById("acts");
        for(var i = 0; i < acts.length; i++) {
            console.log(acts[i].actType);
            var actDiv = document.createElement("div");
            actDiv.classList.add("py-2");
            actDiv.classList.add("px-3");
            actDiv.classList.add("artist");
            actDiv.id= "act"+i;
            
            var actModalLink= document.createElement("a");
            
            
            var actName =document.createElement("h2");
            //actName.style.color= "primary";
            if(acts[i].links.length>0){

                var parentAct = document.createElement("a");
                parentAct.innerHTML = acts[i].name;
                parentAct.target="_blank";
                parentAct.classList.add("artistLink");
                var links = "";
                acts[i].links.forEach(element => {
                    links = links+element.url+",";
                });
                parentAct.setAttribute("onclick","$(this).buildArchivedArtistModal('"+acts[i].name+"', '"+links+"','','','','"+year+"');"); 
                parentAct.id=actDiv.id+i;
                parentAct.target="_blank";
                actName.appendChild(parentAct);
            }else{
                actName.append(acts[i].name);
            }
            //child acts
            if(acts[i].acts.length>0){
                actName.append(" (");
                for(var j=0; j<acts[i].acts.length;j++){
                    var act = acts[i].acts[j];
                    var childAct = document.createElement("a");
                    childAct.innerHTML = act.name;
                    childAct.target="_blank";
                    childAct.classList.add("artistLink");
                    var links = "";
                    act.links.forEach(element => {
                        links = links+element.url+",";
                    });
                    childAct.setAttribute("onclick","$(this).buildArchivedArtistModal('"+act.name+"', '"+links+"','','','','"+year+"');");
                    childAct.id=actDiv.id+i+j;
                    childAct.target="_blank";
                    actName.appendChild(childAct);
                    if(j!=acts[i].acts.length-1){
                        actName.append(", ");
                    }
                }
                actName.append(")");
            }
            actDiv.appendChild(actName);
            container.appendChild(actDiv);
        }
    }).fail(function(){
        console.log("Error");
    });
}

function fillArtists(year){
    
    var jsonPath="./archive/"+year+"/artists.json";
    jQuery.getJSON(jsonPath, function(acts){
        console.log("Found");
        console.log(acts.length);
        shuffleArray(acts);
        

        var container = document.getElementById("artistsLineup");
        for(var i = 0; i < acts.length; i++) {
            console.log(acts[i].actType);
            var actDiv = document.createElement("div");
            actDiv.classList.add("py-2");
            actDiv.classList.add("px-3");
            actDiv.classList.add("artist");
            actDiv.id= "act"+i;
            
            var actModalLink= document.createElement("a");
            
            
            var actName =document.createElement("h2");
            //actName.style.color= "primary";
            if(acts[i].links.length>0){

                var parentAct = document.createElement("a");
                parentAct.innerHTML = acts[i].name;
                parentAct.target="_blank";
                parentAct.classList.add("artistLink");
                var links = "";
                acts[i].links.forEach(element => {
                    links = links+element.url+",";
                });
                parentAct.setAttribute("onclick","$(this).buildArchivedArtistModal('"+acts[i].name+"', '"+links+"','','','','"+year+"');"); 
                parentAct.id=actDiv.id+i;
                parentAct.target="_blank";
                actName.appendChild(parentAct);
            }else{
                actName.append(acts[i].name);
            }
            //child acts
            if(acts[i].acts.length>0){
                actName.append(" (");
                for(var j=0; j<acts[i].acts.length;j++){
                    var act = acts[i].acts[j];
                    var childAct = document.createElement("a");
                    childAct.innerHTML = act.name;
                    childAct.target="_blank";
                    childAct.classList.add("artistLink");
                    var links = "";
                    act.links.forEach(element => {
                        links = links+element.url+",";
                    });
                    childAct.setAttribute("onclick","$(this).buildArchivedArtistModal('"+act.name+"', '"+links+"','','','','"+year+"');");
                    childAct.id=actDiv.id+i+j;
                    childAct.target="_blank";
                    actName.appendChild(childAct);
                    if(j!=acts[i].acts.length-1){
                        actName.append(", ");
                    }
                }
                actName.append(")");
            }
            actDiv.appendChild(actName);
            container.appendChild(actDiv);
        }
    }).fail(function(){
        console.log("Error");
    });
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


