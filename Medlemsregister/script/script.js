"use strict"

var MEDLEMSREGISTER = {
	
	members : [], //Medlemmar sparas i en array...
	
	master : function(){
		MEDLEMSREGISTER.registerMember(); // Låter register member köra så att jag kan testa koden...
	},
	
	registerMember : function(){
		var sendButton, name, lastName, cellphone, uniqueId, i, j, errorAlreadyExists, errorMessage, errorEnum;
		errorAlreadyExists = 0;		
		errorEnum ={
			0 : "Namn",
			1 : "Efternamn",
			2 : "Telefonnummer"
			
		};
		
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
				
				errorAlreadyExists = 0; // nollställer denna för varje varv...
				errorMessage ="Det finns redan en person med "; //nollställer denna för varje varv..
				
				for(j = 0; j < MEDLEMSREGISTER.members[i].length; j +=1){ // kontrollera en hel medlem.
					
					
					if(MEDLEMSREGISTER.members[i][j] === regArr[j]){ // Denna sats kontrollerar om det redan finns en arrayplats i members som har samma egenskaper som de inladdade från sidan..
						errorAlreadyExists +=1;
						
						errorMessage += "\n " + errorEnum[j]+ ": " + regArr[j]+ " " ;
					}	
					if(errorAlreadyExists === MEDLEMSREGISTER.members[i].length-1){// om längden på members nuvarande arrayobj är samma som 3
						
						alert(errorMessage);
						break;
					}							
					
				}
			
				while(MEDLEMSREGISTER.members[i][3] === regArr[3]){ // om medlemens id ej är unikt, så ändra det till något som blir unikt..
					regArr[3] = i + name + (Math.random() *(1000 + 1)); 
				}
			}
			
			if(errorAlreadyExists <= 2){
				MEDLEMSREGISTER.members.push(regArr);
			}
			
			
	
		};
		
	}
		
	
};

window.onload = MEDLEMSREGISTER.master();
