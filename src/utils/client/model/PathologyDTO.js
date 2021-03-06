/**
 * QR Emergencias WS
 * API Rest QR Emergencias
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */


import ApiClient from '../ApiClient';





/**
* The PathologyDTO model module.
* @module model/PathologyDTO
* @version 1.0.0
*/
export default class PathologyDTO {
    /**
    * Constructs a new <code>PathologyDTO</code>.
    * @alias module:model/PathologyDTO
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>PathologyDTO</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/PathologyDTO} obj Optional instance to populate.
    * @return {module:model/PathologyDTO} The populated <code>PathologyDTO</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PathologyDTO();

            
            
            

            if (data.hasOwnProperty('date')) {
                obj['date'] = ApiClient.convertToType(data['date'], 'Date');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }

    /**
    * @member {Date} date
    */
    date = undefined;
    /**
    * @member {String} description
    */
    description = undefined;
    /**
    * @member {module:model/PathologyDTO.TypeEnum} type
    */
    type = undefined;






    /**
    * Allowed values for the <code>type</code> property.
    * @enum {String}
    * @readonly
    */
    static TypeEnum = {
    
        /**
         * value: "asma"
         * @const
         */
        "asma": "asma",
    
        /**
         * value: "hipertension"
         * @const
         */
        "hipertension": "hipertension",
    
        /**
         * value: "antecedentes_oncologicos"
         * @const
         */
        "antecedentes_oncologicos": "antecedentes_oncologicos",
    
        /**
         * value: "insuficiencia_suprarrenal"
         * @const
         */
        "insuficiencia_suprarrenal": "insuficiencia_suprarrenal",
    
        /**
         * value: "otro"
         * @const
         */
        "otro": "otro"    
    };



}


