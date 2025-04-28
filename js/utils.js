export class Utils {
    static get_element_by_id(id) {
        return document.getElementById(id);
    }

    static get_elements_by_class_name(class_name) {
        return document.getElementsByClassName(class_name);
    }

    static remove_from_array(array, item) {
        for(let i = array.length; i--;) {
            if(array[i] === item) {
                array.splice(i, 1);
            }
        }
    }
}