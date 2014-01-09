"use strict"

var MEDLEMSREGISTER = {
	
	members : [], //Medlemmar sparas i en array...
	
	master : function(){
		MEDLEMSREGISTER.registerMember(); // Låter register member köra så att jag kan testa koden...
	},
	
	registerMember : function(){
		var sendButton, name, lastName, cellphone, uniqueId, i, j, errorAlreadyExists;
		
		sendButton = document.getElementById("sendbutton");
		
		sendButton.onclick = function(){
			
			var regArr = [];					
			
			name = document.getElementById("name");
			lastName = document.getElementById("lastName");
			cellphone = document.getElementById("cellphone");
			uniqueId = 0;
			
			regArr.push(name, lastName, cellphone, uniqueId); //lägger in regDatan i en array..
			
			//kontrollera att medlemmens namn inte redan finns
			for(i = 0; i < MEDLEMSREGISTER.members.length; i +=1){ //kontrollera per medlem
				
				for(j = 0; j <= MEDLEMSREGISTER.members[i].length; j +=1){ // kontrollera en hel medlem
					
					
					if(MEDLEMSREGISTER.members[i][j] === regArr[j]){
						alert("Whopse, namn/efternamn/telefonnummer är upptaget..");
						errorAlreadyExists +=1;
						
					}									
					
				}
				
				if(errorAlreadyExists === 0){// om inga namn är upptagna, lägg till den nya informationen.. efter givet unikt id..
						
				}	

			}
	
		};
		
	}
		
	
};

window.onload = MEDLEMSREGISTER.master();
