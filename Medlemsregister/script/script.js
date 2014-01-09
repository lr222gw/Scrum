"use strict"

var MEDLEMSREGISTER = {
	
	members : [], //Medlemmar sparas i en array...
	
	master : function(){
		MEDLEMSREGISTER.registerMember(); // Låter register member köra så att jag kan testa koden...
	},
	
	registerMember : function(){
		var sendButton, name, lastName, cellphone, uniqueId, i, j, errorAlreadyExists;
		errorAlreadyExists = 0;
		
		sendButton = document.getElementById("sendbutton");
		
		sendButton.onclick = function(){
			
			var regArr = [];					
			
			name = document.getElementById("name").value;
			lastName = document.getElementById("lastName").value;
			cellphone = document.getElementById("cellphone").value;
			uniqueId = name + (Math.random() *(1000 + 1)); 
			
			regArr.push(name, lastName, cellphone, uniqueId); //lägger in regDatan i en array..
			
			//kontrollera att medlemmens namn inte redan finns
			for(i = 0; i < MEDLEMSREGISTER.members.length; i +=1){ //kontrollera per medlem
				
				for(j = 0; j <= MEDLEMSREGISTER.members[i].length; j +=1){ // kontrollera en hel medlem.
					
					
					if(MEDLEMSREGISTER.members[i][j] === regArr[j]){
						alert("Whopse, namn/efternamn/telefonnummer är upptaget..");
						errorAlreadyExists +=1;
						break;
						
					}									
					
				}
			
				while(MEDLEMSREGISTER.members[i][3] === uniqueId){ // om medlemens id ej är unikt, så ändra det till något som blir unikt..
					uniqueId = i + name + (Math.random() *(1000 + 1)); 
				}				

			}
			if(errorAlreadyExists === 0){// om inga namn är upptagna, lägg till den nya informationen.. efter givet unikt id..
				MEDLEMSREGISTER.members.push(regArr);
			}
	
		};
		
	}
		
	
};

window.onload = MEDLEMSREGISTER.master();
