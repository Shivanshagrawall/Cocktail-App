const inputText = document.querySelector('#input-text');
const search = document.querySelector('#search');
const result = document.querySelector('.result');
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

const cocktail = async () => {
    const input = inputText.value;
    if (input == "") {
        result.innerHTML = `<h2>Please Enter the cocktail name</h2>`

    } else {
        try {
            result.innerHTML="";

            
            const information= await fetch(url+input);
            const data=await information.json();
    
            console.log(data);
            if(data.drinks==null){
                throw error;
            }
            document.body.style.alignItems = "start";

            const img = document.createElement('div');
            img.className = "img-container";
    
            const ingredient = document.createElement('div');
            ingredient.className = "ingredient";
    
            const instruction = document.createElement('div');
            instruction.className = "instruction";
    
            result.appendChild(img);
            result.appendChild(ingredient);
            result.appendChild(instruction);

            const image=document.createElement('img');
            image.setAttribute('src',`${data.drinks[0].strDrinkThumb}`)
            img.appendChild(image);

            const name=document.createElement('div');
            name.className="cocktail-name";
            name.innerHTML=`<h3>${data.drinks[0].strDrink}<h3>`;
            img.appendChild(name);

            const ingredientTitle=document.createElement('div');
            ingredientTitle.className="ingredientTitle";
            ingredientTitle.innerHTML=`<h3>Ingredients: </h3>`;
            ingredient.appendChild(ingredientTitle);

            const ingreList=document.createElement('div');
            ingreList.className="ingreList";

            const arr=[];
            const myDrink=data.drinks[0];
            for(let i in myDrink){
                let ingre="";
                if(i.startsWith("strIngredient") && myDrink[i]){
                    ingre=myDrink[i];
                    console.log(ingre);
                }
                if(ingre!==""){
                   arr.push(ingre); 
                }
            }
            console.log(arr);

            arr.forEach(item=>{
                const li=document.createElement('li');
                li.innerHTML=`<h3>${item}</h3>`;
                ingreList.appendChild(li);
            })
            ingredient.appendChild(ingreList);

            const instructionTitle=document.createElement('div');
            instructionTitle.className="instruction-title";
            instructionTitle.innerHTML=`<h3>Instruction: </h3>`;
            instruction.appendChild(instructionTitle);

            const instructionData=document.createElement('div');
            instructionData.className="instruction-data";
            instructionData.innerHTML=`${myDrink.strInstructions}`;
            instruction.appendChild(instructionData);
        } catch (error) {
            result.innerHTML=`<h2>Not Found</h2>`
            console.log(error);
        }
    }
}

search.addEventListener('click', cocktail);