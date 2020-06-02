export const form_data_to_link= (formData) => {
    console.log(formData)
            // This function for creating link
            // There is 3 option:
            // 1.page 
            // 2.filtering
            // 3.multiple filtering
            // 4.sorting(or ordering)
            let link="";
            if(formData){
                link=link+"?";
                for (let [key, value] of Object.entries(formData)) {
                    if (value!=null){
                        if (Array.isArray(value)){
                            // MULTIPLE FILTERING
                            link=link+`${key}=`;
                            let arrayElementIds="";
                            value.map(item => {
                                console.log(item,key)
                                console.log(item[key])

                                if(item[key]!== undefined){
                                arrayElementIds=arrayElementIds+`${item[key]},`;
                            }
                            else if(item[key]== undefined){
                                arrayElementIds=arrayElementIds+`${item.id},`;
                            }
                            })
                            link=link+arrayElementIds+"&";
                        }else if(typeof value=="object"){
                            // SORTING(OR ORDERING)
                            if(key==="sortData"){
                                for (let [sortKey, sortValue] of Object.entries(value)) {
                                    if(sortValue){
                                        link=link+`ordering=-${sortKey}&`
                                    }else{
                                        link=link+`ordering=${sortKey}&`
                                    }
                                }
                            }
                        }
                        else{
                            // PAGE AND FILTERING
                            link=link+`${key}=${value}&`;
                        }   
                    }
                }
            }
            console.log(link);
            return link
        }
