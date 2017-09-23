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
* The HospitalizationDTO model module.
* @module model/HospitalizationDTO
* @version 1.0.0
*/
export default class HospitalizationDTO {
    /**
    * Constructs a new <code>HospitalizationDTO</code>.
    * @alias module:model/HospitalizationDTO
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>HospitalizationDTO</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/HospitalizationDTO} obj Optional instance to populate.
    * @return {module:model/HospitalizationDTO} The populated <code>HospitalizationDTO</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new HospitalizationDTO();

            
            
            

            if (data.hasOwnProperty('date')) {
                obj['date'] = ApiClient.convertToType(data['date'], 'Date');
            }
            if (data.hasOwnProperty('institution')) {
                obj['institution'] = ApiClient.convertToType(data['institution'], 'String');
            }
            if (data.hasOwnProperty('reason')) {
                obj['reason'] = ApiClient.convertToType(data['reason'], 'String');
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
    * @member {String} institution
    */
    institution = undefined;
    /**
    * @member {String} reason
    */
    reason = undefined;
    /**
    * @member {module:model/HospitalizationDTO.TypeEnum} type
    */
    type = undefined;






    /**
    * Allowed values for the <code>type</code> property.
    * @enum {String}
    * @readonly
    */
    static TypeEnum = {
    
        /**
         * value: "SURGERY"
         * @const
         */
        "SURGERY": "SURGERY",
    
        /**
         * value: "ADMISSION"
         * @const
         */
        "ADMISSION": "ADMISSION"    
    };



}

