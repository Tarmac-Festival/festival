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
            console.log(acts[i].Type);
            var actDiv = document.createElement("div");
            actDiv.classList.add("py-2");
            actDiv.classList.add("px-3");
            actDiv.classList.add("artist");
            
            var actModalLink= document.createElement("a");
            
            
            var actName =document.createElement("h2");
            //actName.style.color= "primary";
            actDiv.id= "act"+i;
            
            switch(acts[i].Type){
                case "b2b":
                    for(var j=0; j<acts[i].Artists.length;j++){
                        //console.log(acts[i].Artists[j].Name);
                        if(acts[i].Artists[j].Link !=""){
                            var artist = document.createElement("a");
                            artist.innerHTML = acts[i].Artists[j].Name;
                            artist.target="_blank";
                            artist.classList.add("artistLink");
                            artist.setAttribute("onclick","$(this).buildArchivedArtistModal('"+acts[i].Artists[j].Name+"', '"+acts[i].Artists[j].Link+"','"+acts[i].Artists[j].Image+"','','','"+year+"');"); 
                            artist.id=actDiv.id+i+j;
                            artist.target="_blank";
                            actName.appendChild(artist);
                        }else{
                            actName.append(acts[i].Artists[j].Name);
                        }
                        if(j!=acts[i].Artists.length-1){
                            actName.append(" b2b ");
                        }
                    }
                    break;
                case "&":
                    for(var j=0; j<acts[i].Artists.length;j++){
                        //console.log(acts[i].Artists[j].Name);
                        if(acts[i].Artists[j].Link !=""){
                            var artist = document.createElement("a");
                            artist.innerHTML = acts[i].Artists[j].Name;
                            
                            artist.classList.add("artistLink");
    
                            artist.setAttribute("onclick","$(this).buildArchivedArtistModal('"+acts[i].Artists[j].Name+"', '"+acts[i].Artists[j].Link+"','"+acts[i].Artists[j].Image+"','','','"+year+"');"); 
                            artist.id=actDiv.id+i+j;
                            artist.target="_blank";
                            actName.appendChild(artist);
                        }else{
                            actName.append(acts[i].Artists[j].Name);
                        }
                        if(j!=acts[i].Artists.length-1){
                            actName.append(" & ");
                        }
                    }
                    break;
                case "multiple":
                    var Name = acts[i].Name;
                    actName.innerHTML = Name;
                    for(var j=0; j<acts[i].Artists.length;j++){
                        //console.log(acts[i].Artists[j].Name);
                        if(acts[i].Artists[j].Link !=""){
                            var artist = document.createElement("a");
                            artist.classList.add("artistLink");
                            artist.setAttribute("onclick","$(this).buildArchivedArtistModal('"+acts[i].Artists[j].Name+"', '"+acts[i].Artists[j].Link+"','"+acts[i].Artists[j].Image+"','','','"+year+"');"); 
                            artist.id=actDiv.id+i+j;
                            artist.target="_blank";
                            artist.innerHTML = acts[i].Artists[j].Name;
                            artist.target="_blank";
                            var NamePos = Name.search(acts[i].Artists[j].Name)
                            actName.innerHTML = actName.innerHTML.replace(acts[i].Artists[j].Name, artist.outerHTML);
                        }else{
                            //stays plain
                        }
                    }
                    break;
                default:
                    //creating link for one artist
                    
                    if(acts[i].Link !=""){
                        var a = document.createElement("a");
                        a.innerHTML = acts[i].Name;
                        a.target="_blank";
                        a.classList.add("artistLink");
                        a.setAttribute("onclick","$(this).buildArchivedArtistModal('"+acts[i].Name+"', '"+acts[i].Link+"','"+acts[i].Image+"','','','"+year+"');"); 
                        a.id=actDiv.id+i;
                        actName.appendChild(a);
                    }else{
                        actName.innerHTML = acts[i].Name;
                    }
                    break;
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
            console.log(acts[i].Type);
            var actDiv = document.createElement("div");
            actDiv.classList.add("py-2");
            actDiv.classList.add("px-3");
            actDiv.classList.add("artist");
            
            var actModalLink= document.createElement("a");
            
            
            var actName =document.createElement("h2");
            //actName.style.color= "primary";
            actDiv.id= "act"+i;
            
            switch(acts[i].Type){
                case "b2b":
                    for(var j=0; j<acts[i].Artists.length;j++){
                        console.log(acts[i].Artists[j].Name);
                        var artist = document.createElement("a");
                        artist.innerHTML = acts[i].Artists[j].Name;
                        artist.target="_blank";
                        artist.classList.add("artistLink");
                        artist.setAttribute("onclick","$(this).buildArchivedArtistModal('"+acts[i].Artists[j].Name+"', '"+acts[i].Artists[j].Link+"','"+acts[i].Artists[j].Image+"','','','"+year+"');"); 
                        artist.id=actDiv.id+i+j;
                        artist.target="_blank";
                        actName.appendChild(artist);
                        if(j!=acts[i].Artists.length-1){
                            actName.append(" b2b ");
                        }
                    }
                    break;
                case "&":
                    for(var j=0; j<acts[i].Artists.length;j++){
                        console.log(acts[i].Artists[j].Name);
                        var artist = document.createElement("a");
                        artist.innerHTML = acts[i].Artists[j].Name;
                        
                        artist.classList.add("artistLink");
                        artist.setAttribute("onclick","$(this).buildArchivedArtistModal('"+acts[i].Artists[j].Name+"', '"+acts[i].Artists[j].Link+"','"+acts[i].Artists[j].Image+"','','','"+year+"');"); 
                        artist.id=actDiv.id+i+j;
                        artist.target="_blank";
                        actName.appendChild(artist);
                        if(j!=acts[i].Artists.length-1){
                            actName.append(" & ");
                        }
                    }
                    break;
                case "multiple":
                    var Name = acts[i].Name;
                    actName.innerHTML = Name;
                    for(var j=0; j<acts[i].Artists.length;j++){
                        console.log(acts[i].Artists[j].Name);
                        var artist = document.createElement("a");
                        artist.classList.add("artistLink");
                        artist.setAttribute("onclick","$(this).buildArchivedArtistModal('"+acts[i].Artists[j].Name+"', '"+acts[i].Artists[j].Link+"','"+acts[i].Artists[j].Image+"','','','"+year+"');"); 
                        artist.id=actDiv.id+i+j;
                        artist.target="_blank";
                        artist.innerHTML = acts[i].Artists[j].Name;
                        artist.target="_blank";
                        var NamePos = Name.search(acts[i].Artists[j].Name)
                        actName.innerHTML = actName.innerHTML.replace(acts[i].Artists[j].Name, artist.outerHTML);
                        
                    }
                    break;
                default:
                    //creating link for one artist    
                    var a = document.createElement("a");
                    a.innerHTML = acts[i].Name;
                    a.target="_blank";
                    a.classList.add("artistLink");
                    a.setAttribute("onclick","$(this).buildArchivedArtistModal('"+acts[i].Name+"', '"+acts[i].Link+"','"+acts[i].Image+"','','','"+year+"');"); 
                    a.id=actDiv.id+i;
                    actName.appendChild(a);
                    break;
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


