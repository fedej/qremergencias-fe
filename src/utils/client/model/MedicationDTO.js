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
* The MedicationDTO model module.
* @module model/MedicationDTO
* @version 1.0.0
*/
export default class MedicationDTO {
    /**
    * Constructs a new <code>MedicationDTO</code>.
    * @alias module:model/MedicationDTO
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>MedicationDTO</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/MedicationDTO} obj Optional instance to populate.
    * @return {module:model/MedicationDTO} The populated <code>MedicationDTO</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new MedicationDTO();

            
            
            

            if (data.hasOwnProperty('amount')) {
                obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('period')) {
                obj['period'] = ApiClient.convertToType(data['period'], 'String');
            }
        }
        return obj;
    }

    /**
    * @member {Number} amount
    */
    amount = undefined;
    /**
    * @member {String} description
    */
    description = undefined;
    /**
    * @member {String} name
    */
    name = undefined;
    /**
    * @member {module:model/MedicationDTO.PeriodEnum} period
    */
    period = undefined;






    /**
    * Allowed values for the <code>period</code> property.
    * @enum {String}
    * @readonly
    */
    static PeriodEnum = {
    
        /**
         * value: "diariamente"
         * @const
         */
        "diariamente": "diariamente",
    
        /**
         * value: "semanalmente"
         * @const
         */
        "semanalmente": "semanalmente",
    
        /**
         * value: "mensualmente"
         * @const
         */
        "mensualmente": "mensualmente"    
    };



}


