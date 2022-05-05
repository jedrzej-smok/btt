export const calcIngredient = (meal: JSON) => {
    let result = 0;
    for(const key of Object.keys(meal) ){
        console.log(key);
        if(key.match(/^strIngredient[0-9]*$/)){
            if((meal as any)[key]!= null && (meal as any)[key]!= ""){
                result += 1;
            }
        };
    }
    return result;
};