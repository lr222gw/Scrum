"use strict"

var MEDLEMSREGISTER = {
	
	members : [], //Medlemmar sparas i en array...
	
	master : function(){
		MEDLEMSREGISTER.registerMember(); // Låter register member köra så att jag kan testa koden...
		MEDLEMSREGISTER.showMembers();
		MEDLEMSREGISTER.loadFromLocalStorage();
		
		
		var testPerson = ["Stefan", "Björk", "03666454", "1stefan0020232s"]
		MEDLEMSREGISTER.members.push(testPerson);
	},
	
	registerMember : function(){
		var sendButton, name, lastName, cellphone, uniqueId, i, j, errorAlreadyExists, errorMessage, errorEnum, regform, addMemberButton, backButton, toUpperCaser;
		errorAlreadyExists = 0;		
		errorEnum ={
			0 : "Namn",
			1 : "Efternamn",
			2 : "Telefonnummer"
			
		};
				
		regform = document.getElementById("regform"); // Döljer formuläret som standard... 
		regform.classList.add("hide");
		
		addMemberButton = document.getElementById("addMember"); // hämtar ner en knapp som ska användas för att visa formuläret..
		backButton = document.getElementById("backButton");
		sendButton = document.getElementById("sendbutton");
		
		addMemberButton.onclick = function(){
			regform.classList.remove("hide");
			document.getElementById("container").classList.add("hide");
		};
		
		toUpperCaser = function(aString){ // denna metod tagen från http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
				return aString.charAt(0).toUpperCase() + aString.slice(1);
		};

		sendButton.onclick = function(){
			
			var regArr = [];					
			
			name = toUpperCaser(document.getElementById("name").value);
			lastName = toUpperCaser(document.getElementById("lastName").value);
			cellphone = toUpperCaser(document.getElementById("cellphone").value);
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
				MEDLEMSREGISTER.saveToLocalStorage(regArr); // utöver att medlemen läggs in i så sparas den i localStorage..
				
				document.getElementById("name").value = "";
				document.getElementById("lastName").value = "";
				document.getElementById("cellphone").value = "";
				
				if(document.getElementById("membersDiv")){ // om visamedlemmar var öppen när bekräftningen gjordes, stäng den och öppna den. (så den nya datan laddas in...)
					
					document.getElementById("membersDiv").remove();
					
					MEDLEMSREGISTER.showTheMembers(); // laddar in allt på nytt.. så att det uppdateras
					
				}
				
				alert("Medlem tillagd!");
			}
			
			
	
		};
		
		backButton.onclick = function(){
			regform.classList.add("hide");
			document.getElementById("container").classList.remove("hide");
		};
	},
	
	saveToLocalStorage : function(regArr){ 
		var toLS, localStorageName;		
		
		localStorageName = "member" + localStorage.length;
		
		toLS = JSON.stringify(regArr); // gör om regArr till JSON format...
		
		localStorage[localStorageName] = (toLS); // sparar ner 

	},
	
	loadFromLocalStorage : function(){
		var i , data;
		
		for(i = 0; i < localStorage.length; i +=1){
		
			data = JSON.parse(localStorage["member" +i]); // Läser in första objektet från LocalStorage, parsar om och sparar ner i "data"
			MEDLEMSREGISTER.members.push(data); // Lägger in den nyhämtade datan i members arrayen som sidan använder sig av för uppvisning..
			
		}
		
	},
		
	showMembers : function(){
		var  showMembers, membersDiv, i, j, memberBox, memberBoxContent;
		
		showMembers = document.getElementById("showMembers");
		
		showMembers.onclick = function(){
			
			MEDLEMSREGISTER.showTheMembers();
			
		};
		
		
	},
	
	showTheMembers : function(){
		var  showMembers, membersDiv, i, j, memberBox, memberBoxContent;
			membersDiv = document.createElement("div"); // div där allt som har att göra med visandet av medlemmar läggs in..
			membersDiv.setAttribute("id", "membersDiv");
			
			if(document.getElementById("showMembers").value === "Visa registrerade medlemmar"){
				
				document.getElementById("showMembers").value = "Dölj registerade medlemmar";
			}else{
				document.getElementById("showMembers").value = "Visa registrerade medlemmar";
			}
			
			try{
				if(document.getElementById("membersDiv").className !== "hide"){ // om windowfönsret finns, göm det
					
					document.getElementById("membersDiv").remove();					
					return;				
				}else{
					document.getElementById("membersDiv").classList.remove("hide")
				}
			}catch(ey){
				// do nothing
			}
			
			
			for(i = 0; i < MEDLEMSREGISTER.members.length; i +=1){
				memberBox = document.createElement("div");
				memberBox.setAttribute("class", "memberBox");
				memberBox.innerText = MEDLEMSREGISTER.members[i][0]+" "+MEDLEMSREGISTER.members[i][1]; // sätter innerText till personens namn ooch efternamn
				
				for(j = 0; j < MEDLEMSREGISTER.members[i].length; j +=1){ // denna behöver egentligen inte köras 4 ggr... 
					memberBoxContent = document.createElement("memberBoxContent");
					memberBoxContent.setAttribute("class", "memberBoxContent");
					memberBoxContent.classList.add("hide");
					memberBoxContent.innerHTML = "Namn: "+MEDLEMSREGISTER.members[i][0]+"<br/>Efternamn: "+MEDLEMSREGISTER.members[i][1]+"<br/>Telefonnummer: "+MEDLEMSREGISTER.members[i][2]+"<br/>Unikt Id: "+MEDLEMSREGISTER.members[i][3];
					//↑Skapar en plats för innehållet i arrayen, lägger in innehållet för denna medlem...
					memberBox.appendChild(memberBoxContent);
					membersDiv.appendChild(memberBox);
					
					memberBox.onclick = function(e){
						var whatWasPressed;
						
						whatWasPressed = e.target;
						
						if(e.target.className === "memberBoxContent"){ // om "e" inte är memberBox, gör "e" till memberBox <-- för att annars så hamnar hide på fel, om man tex trycker på memberBoxContent...
							whatWasPressed = e.target.parentNode;
							return;
						}
						
						if(whatWasPressed.children[0].className === "memberBoxContent hide"){
							whatWasPressed.children[0].classList.remove("hide");
						}else{
							whatWasPressed.children[0].classList.add("hide");
						}
						
					};
				}
				
			}
			
			document.getElementById("body").appendChild(membersDiv);
	}
};

window.onload = MEDLEMSREGISTER.master();
