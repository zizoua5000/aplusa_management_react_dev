export const form_data_to_link= (formData) => {
    console.log(formData)
            // This function for creating link
            // There is 4 option:
            // 1.page 
            // 2.filtering
            // 3.multiple filtering
            // 4.sorting(or ordering)
            let link="";
            if(formData){
                link=link+"?";
                for (let [key, value] of Object.entries(formData)) {
                    if (value!=null){
                        console.log(value)
                        if (Array.isArray(value)){
                            // MULTIPLE FILTERING
                            link=link+`${key}=`;
                            let arrayElementIds="";
                            value.map(item => {
                            if(item[key]!== undefined){
                                return arrayElementIds=arrayElementIds+`${item[key]},`;
                            } else {
                                return arrayElementIds=arrayElementIds+`${item.id},`;
                            }
                            })
                            link=link+arrayElementIds+"&";
                        }else if(typeof value=="object"){
                            // SORTING(OR ORDERING)
                            if(key==="sortData"){
                                link=link+`ordering=`
                                for (let [sortKey, sortValue] of Object.entries(value)) {
                                    if(sortValue){
                                        link=link+`-${sortKey},`
                                    }else{
                                        link=link+`${sortKey},`
                                    }
                                }
                                link=link+"&"
                            }
                        }
                        else{
                            // PAGE AND FILTERING
                            link=link+`${key}=${value}&`;
                        }   
                    }
                }
            }
            console.log(link)
            return link
        }
