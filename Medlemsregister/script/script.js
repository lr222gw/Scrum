"use strict"

var MEDLEMSREGISTER = {
	
	members : [], //Medlemmar sparas i en array...
	
	master : function(){
		MEDLEMSREGISTER.registerMember(); // Låter register member köra så att jag kan testa koden...
		MEDLEMSREGISTER.showMembers();
		MEDLEMSREGISTER.loadFromLocalStorage();
		MEDLEMSREGISTER.findMember();
		
		
		//var testPerson = ["Stefan", "Björk", "03666454", "1stefan0020232s"]
		//MEDLEMSREGISTER.members.push(testPerson);
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
			uniqueId = name + Math.floor(Math.random() *(1000 + 1)); 						
			
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
					if(errorAlreadyExists === MEDLEMSREGISTER.members[i].length-1){// om längden på members nuvarande arrayobj är samma som 3 skriv ut error meddelandet...
						
						alert(errorMessage);
						break;
					}							
					
				}
			
				while(MEDLEMSREGISTER.members[i][3] === regArr[3]){ // om medlemens id ej är unikt, så ändra det till något som blir unikt..
					regArr[3] = i + name + Math.floor(Math.random() *(1000 + 1)); 
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
		var toLS, localStorageName, i, lsSpace, newUserName;		
		
		for(i = 0; i < localStorage.length + 1 ; i+= 1){ // Letar igenom localstorage efter lediga namn. +1 innebär att om  det inte finns några lediga namn så kollar den 1 extra siffra (vilket som är tom) och då blir det id't.
			
			try{
				lsSpace = JSON.parse(localStorage["member" + i]); // hämtar ner platser och tolkar om innehållet i LocalStorage
			}catch(error){
				console.log("Detta meddelande visas varje gång du inte skriver över en tom plats..: "+ error);
				lsSpace = JSON.stringify(localStorage["member" + i]); // I första fall testa parse(Den skriver över undefined om den är satt i removeButton funktionen, ej om den är helt tom..), om parse inte fungerar använd stringify!
			}
			
			if(lsSpace === undefined || lsSpace === "undefined"){ // om platsen är ledig, använd den
				
				newUserName = "member" + i;
				break;
			}
			
		}
		
		localStorageName = newUserName;
		
		toLS = JSON.stringify(regArr); // gör om regArr till JSON format...
		
		localStorage[localStorageName] = (toLS); // sparar ner 

	},
	
	loadFromLocalStorage : function(){
		var i , data;
		
		for(i = 0; i < localStorage.length; i +=1){
		
			data = JSON.parse(localStorage["member" +i]); // Läser in första objektet från LocalStorage, parsar om och sparar ner i "data"
			if(data !== "undefined"){ // Om datan ej är angiven (ledig) så skippa den..
				MEDLEMSREGISTER.members.push(data); // Lägger in den nyhämtade datan i members arrayen som sidan använder sig av för uppvisning..
			}
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
		var  showMembers, membersDiv, i;
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
				MEDLEMSREGISTER.listMember(i, membersDiv); // Anropar en metod som listar upp 1 specifik medlem.. anropar den antalet ggr som antalet medlemmar.. = alla medlemmar listas..
			}
			document.getElementById("body").appendChild(membersDiv);
	},
	
	listMember : function(i, membersDiv){
		var memberBox, memberBoxContent, removeButton, editButton;
		memberBox = document.createElement("div");
		memberBox.setAttribute("class", "memberBox");
		memberBox.innerText = MEDLEMSREGISTER.members[i][0]+" "+MEDLEMSREGISTER.members[i][1]; // sätter innerText till personens namn ooch efternamn
		
	//for(j = 0; j < MEDLEMSREGISTER.members[i].length; j +=1){ // denna behöver egentligen inte köras 4 ggr... 
		memberBoxContent = document.createElement("memberBoxContent");
		memberBoxContent.setAttribute("class", "memberBoxContent");
		memberBoxContent.classList.add("hide");
		memberBoxContent.innerHTML = "<p> Namn: "+MEDLEMSREGISTER.members[i][0]+"<br/> Efternamn: "+MEDLEMSREGISTER.members[i][1]+"<br/> Telefonnummer: "+MEDLEMSREGISTER.members[i][2]+"<br/> Unikt Id: " + MEDLEMSREGISTER.members[i][3] + "</p>";
		//↑Skapar en plats för innehållet i arrayen, lägger in innehållet för denna medlem...					
		//↓Skapar knapp för att ta bort medlem... 
		removeButton = document.createElement("input");
		removeButton.setAttribute("id", "removeMemberButton");
		removeButton.setAttribute("type", "button");
		removeButton.setAttribute("Value", "Ta bort denna person");
		memberBoxContent.appendChild(removeButton);
		
		editButton = document.createElement("input");
		editButton.setAttribute("id", "editMemberButton");
		editButton.setAttribute("type", "button");
		editButton.setAttribute("Value", "Ändra information för denna person");
		memberBoxContent.appendChild(editButton);
		
		
		memberBox.appendChild(memberBoxContent);
		membersDiv.appendChild(memberBox);
		
		memberBox.onclick = function(e){
			var whatWasPressed;
			
			whatWasPressed = e.target;
			
			if(e.target.className === "memberBoxContent"|| e.target.id ==="removeMemberButton" ||e.target.nodeName === "P" || e.target.id === "editMemberButton"){ // om "e" inte är memberBox, gör "e" till memberBox <-- för att annars så hamnar hide på fel, om man tex trycker på memberBoxContent...
				whatWasPressed = e.target.parentNode;
				return;
			}
			
			if(whatWasPressed.children[0].className === "memberBoxContent hide"){
				whatWasPressed.children[0].classList.remove("hide");
			}else{
				whatWasPressed.children[0].classList.add("hide");
			}
			
		};
		
		removeButton.onclick = function(e){
			var answer;
			answer = confirm("Är du säker på att du vill ta bort denna person?");
			if(answer === false){
				return;
			}
			MEDLEMSREGISTER.findAMember(e, MEDLEMSREGISTER.deleteChosenMember);
			e.target.parentNode.parentNode.remove();
			
		};
		
		editButton.onclick = function(e){
			MEDLEMSREGISTER.findAMember(e, MEDLEMSREGISTER.editChosenMember);
		};
	//}
		return membersDiv;
	},
	
	findAMember : function(e, whatToDo){ // Denna metod kan bara användas av knappar implementerade i personernas information...
		var getId, regExForId, result, i, memberData, regExForMatch, memberThatMatched;
												
		getId = e.target.parentElement.firstChild.innerHTML; // drar ner innehållet från personernas information..
		
		regExForId =/Unikt Id: .+/i;
		
		result = getId.match(regExForId); // letar efter id't för personen..
		
		result = result[0].split("Unikt Id: "); // Nu så ligger det unika Id´t i result[1]...
		
		regExForMatch = new RegExp(result[1]); // skapar ett nytt regulärt uttryck med det unika id't...
		
		for(i = 0; i < localStorage.length; i +=1){ // letar upp vilken användare som hade id't..
			memberData = JSON.stringify(JSON.parse(localStorage["member"+ i]));
			
			memberThatMatched = memberData.match(regExForMatch);
			if(memberThatMatched !== null && memberThatMatched !== undefined){ // Ifall for-loopen hittat den medlem som man vill göra något med, utför det och sen avsluta loopen..
				
				whatToDo(i);
				
				break;
			}
		}
	},
	
	deleteChosenMember : function(i){
		localStorage.removeItem("member"+ i); // kod för att ta bort den specifika medlemmen från localStorage..
		localStorage["member"+ i] = JSON.stringify("undefined"); // ser till att rutan inte försvinner (blir error på andra ställen då..) utan görs ledig för en ny medlem!
		
		
		MEDLEMSREGISTER.members = []; //tar bort allt i members,
		MEDLEMSREGISTER.loadFromLocalStorage(); // läser in aktuella medlemmar på nytt..
	},
	
	editChosenMember : function(i){
		var member, boxHolder, nameChange, nameChangeInput, lastNameChange, lastNameChangeInput, phoneChange, phoneChangeInput, uniqueIdChange, uniqueIdChangeInput, saveButton, cancelButton, answer, h1, fieldset, legend;
		member = JSON.parse(localStorage["member" + i]);
		
		boxHolder = document.createElement("div");
		boxHolder.setAttribute("id", "boxForChange");
		h1 =  document.createElement("h1");
		h1.setAttribute("id", "h1TaggForEditMember");
		h1.innerHTML = "Ändra personuppgifter";
		boxHolder.appendChild(h1);
		
		fieldset = document.createElement("fieldset");
		boxHolder.appendChild(fieldset);
		legend = document.createElement("legend");
		legend.innerHTML = "Formulär för " + member[0] + " " + member[1];
		fieldset.appendChild(legend);
		
		
		nameChange = document.createElement("div");
		nameChange.setAttribute("id", "nameChange");
		nameChange.innerHTML = "Namn: ";		
		fieldset.appendChild(nameChange);
		nameChangeInput = document.createElement("input");
		nameChangeInput.setAttribute("id", "nameChangeInput");
		nameChangeInput.setAttribute("value", member[0]);
		nameChange.appendChild(nameChangeInput);
		
		lastNameChange = document.createElement("div");
		lastNameChange.setAttribute("id", "lastNameChange");
		lastNameChange.innerHTML = "Efternamn: ";
		fieldset.appendChild(lastNameChange);
		lastNameChangeInput = document.createElement("input");
		lastNameChangeInput.setAttribute("id", "lastNameChangeInput");
		lastNameChangeInput.setAttribute("value", member[1]);
		lastNameChange.appendChild(lastNameChangeInput);
		
		phoneChange = document.createElement("div");
		phoneChange.setAttribute("id", "phoneChange");
		phoneChange.innerHTML = "Telefonnummer: ";
		fieldset.appendChild(phoneChange);
		phoneChangeInput = document.createElement("input");
		phoneChangeInput.setAttribute("id", "phoneChangeInput");
		phoneChangeInput.setAttribute("value", member[2]);
		phoneChange.appendChild(phoneChangeInput);
		
		uniqueIdChange = document.createElement("div");
		uniqueIdChange.setAttribute("id", "uniqueIdChange");
		uniqueIdChange.innerHTML = "Unikt Id: ";
		fieldset.appendChild(uniqueIdChange);
		uniqueIdChangeInput = document.createElement("input");
		uniqueIdChangeInput.setAttribute("id", "uniqueIdChangeInput");
		uniqueIdChangeInput.setAttribute("value", member[3]);
		uniqueIdChange.appendChild(uniqueIdChangeInput);
		
		saveButton = document.createElement("input");
		saveButton.setAttribute("id", "saveButton");
		saveButton.setAttribute("type", "button");
		saveButton.setAttribute("Value", "Godkänn ändringar");
		boxHolder.appendChild(saveButton);	
		
		cancelButton = document.createElement("input");
		cancelButton.setAttribute("id", "cancelButton");
		cancelButton.setAttribute("type", "button");
		cancelButton.setAttribute("Value", "Avbryt");
		boxHolder.appendChild(cancelButton);		
		
		document.getElementById("body").appendChild(boxHolder);
		
		saveButton.onclick = function(){
			var theMember;
			answer = confirm("Är du säker på att du vill ändra?");
			if(answer === false){
				return;
			}
			
			theMember = JSON.parse(localStorage["member"+i]); // hämtar ner från localStorage med hjälp JSON.stringify
			theMember[0] = nameChangeInput.value;//sparar ner det nya namnet, osv..
			theMember[1] = lastNameChangeInput.value;
			theMember[2] = phoneChangeInput.value;
			theMember[3] = uniqueIdChangeInput.value;
			localStorage["member"+i] = JSON.stringify(theMember); //formaterar om theMember så att den kan skickas tillbaka till localStorage
			document.getElementById("boxForChange").remove();
			
			MEDLEMSREGISTER.members = []; //tar bort allt i members,
			MEDLEMSREGISTER.loadFromLocalStorage(); // läser in aktuella medlemmar i LocalStorage..
			MEDLEMSREGISTER.showTheMembers(); //läser in alla medlemmar i listan...
			
		};
		
		cancelButton.onclick = function(){

			document.getElementById("boxForChange").remove();
		};
		
	},
	
	findMember : function(){
		var findMemberButton, searchBox, searchInput, searchInputLabel, searchButton, valueOfSearch, allUserData, controlledUserData;
		
		findMemberButton = document.getElementById("findMember");			
		
		findMemberButton.onclick = function(){
			var i, matched;
			controlledUserData = "";
			matched = [];
			
			searchBox = document.createElement("div");
			searchBox.setAttribute("id", "searchBox");
			document.getElementById("body").appendChild(searchBox);
			
			searchInput = document.createElement("input");
			searchInput.setAttribute("type", "text");
			searchInput.setAttribute("id", "searchInput");
			searchInput.setAttribute("placeholder", "Sök: namn, telenummer, id");
			searchInput.setAttribute("style", "width: 180px;");
			
			searchButton = document.createElement("input");
			searchButton.setAttribute("value", "Sök!");
			searchButton.setAttribute("type", "button");
			
			searchBox.appendChild(searchInput);
			searchBox.appendChild(searchButton);
			
			searchButton.onclick = function(){
				
				matched = []; // Tömmer arrayen så att den är redo för sökning...
				valueOfSearch = searchInput.value; // Sparar ner det man söker efter
				
				valueOfSearch = new RegExp(valueOfSearch, "ig"); 
				
				for(i = 0; i < localStorage.length; i+=1){
					allUserData = JSON.parse(localStorage["member"+ i]); // hämtar ner all data om alla medlemmar...
					if(allUserData !== "undefined" || allUserData !== undefined){
						controlledUserData += allUserData + " "; // lägger till den kontrollerade medlemmen i texten vi ska söka igenom!.
					}
					
				}
				controlledUserData = controlledUserData.replace(/,/g, " "); // byter ut alla "," mot mellanrum.. det blir lättare att söka igenom strängen då! 
				
				matched.push(controlledUserData.match(valueOfSearch));
				
				//MEDLEMSREGISTER.listMember(i, membersDiv); 
				
			};
			
			
		};
		
		
	}
};

window.onload = MEDLEMSREGISTER.master();